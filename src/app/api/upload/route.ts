import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

// Accepts a single multipart file under the field name "file".
// Stores it in Vercel Blob when BLOB_READ_WRITE_TOKEN is configured;
// otherwise returns a demo descriptor (filename only) so the UI still works.
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413 });
  }
  if (file.type && !ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  const kind = (form.get("kind") as string | null)?.replace(/[^a-z0-9-]/gi, "") || "doc";
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, "_").slice(-80);
  const pathname = `iqcdl/${kind}/${Date.now()}-${safeName}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(pathname, file, {
        access: "public",
        token,
        contentType: file.type || undefined,
      });
      return NextResponse.json({
        mode: "live",
        url: blob.url,
        name: file.name,
        size: file.size,
      });
    } catch (err) {
      console.error("Blob upload failed:", err);
      return NextResponse.json({ error: "Upload failed" }, { status: 502 });
    }
  }

  // Demo mode: no bucket configured — capture metadata only.
  return NextResponse.json({
    mode: "demo",
    url: null,
    name: file.name,
    size: file.size,
  });
}
