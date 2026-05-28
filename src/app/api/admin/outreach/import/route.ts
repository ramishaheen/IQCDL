import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  addTarget,
  listTargets,
  type OutreachSegment,
} from "@/lib/outreach-server";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  return !!user && user.role === "admin";
}

const SEGMENTS = new Set<OutreachSegment>([
  "minister",
  "policymaker",
  "partner",
  "sponsor",
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Minimal RFC 4180-ish CSV parser: handles quoted fields, doubled quotes, CR/LF. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\r") {
      // ignore — handled with \n
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

interface ImportSummary {
  total: number;
  imported: number;
  skipped: number;
  errors: { row: number; reason: string }[];
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { csv?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const text = (body.csv ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "Empty CSV" }, { status: 400 });
  }

  const rows = parseCsv(text);
  if (rows.length === 0) {
    return NextResponse.json({ error: "No rows" }, { status: 400 });
  }
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (k: string) => header.indexOf(k);
  const iName = idx("name");
  const iEmail = idx("email");
  const iOrg = idx("org");
  const iSegment = idx("segment");
  if (iName === -1 || iEmail === -1 || iOrg === -1 || iSegment === -1) {
    return NextResponse.json(
      {
        error:
          "CSV must contain at least these headers: name, email, org, segment (also accepts title, country, language, notes)",
      },
      { status: 400 },
    );
  }
  const iTitle = idx("title");
  const iCountry = idx("country");
  const iLanguage = idx("language");
  const iNotes = idx("notes");

  const existing = await listTargets();
  const existingEmails = new Set(existing.map((t) => t.email));

  const summary: ImportSummary = {
    total: rows.length - 1,
    imported: 0,
    skipped: 0,
    errors: [],
  };

  for (let r = 1; r < rows.length; r++) {
    const cols = rows[r];
    const name = (cols[iName] ?? "").trim();
    const email = (cols[iEmail] ?? "").trim().toLowerCase();
    const org = (cols[iOrg] ?? "").trim();
    const segment = (cols[iSegment] ?? "").trim().toLowerCase() as OutreachSegment;

    if (!name || !org) {
      summary.errors.push({ row: r + 1, reason: "name and org are required" });
      continue;
    }
    if (!EMAIL_RE.test(email)) {
      summary.errors.push({ row: r + 1, reason: `invalid email "${email}"` });
      continue;
    }
    if (!SEGMENTS.has(segment)) {
      summary.errors.push({
        row: r + 1,
        reason: `segment must be one of minister|policymaker|partner|sponsor (got "${segment}")`,
      });
      continue;
    }
    if (existingEmails.has(email)) {
      summary.skipped += 1;
      continue;
    }

    await addTarget({
      name,
      title: iTitle >= 0 ? (cols[iTitle] ?? "").trim() : undefined,
      org,
      country: iCountry >= 0 ? (cols[iCountry] ?? "").trim() : undefined,
      email,
      segment,
      language: iLanguage >= 0 ? (cols[iLanguage] ?? "").trim() : undefined,
      notes: iNotes >= 0 ? (cols[iNotes] ?? "").trim() : undefined,
    });
    existingEmails.add(email);
    summary.imported += 1;
  }

  return NextResponse.json({ ok: true, ...summary });
}
