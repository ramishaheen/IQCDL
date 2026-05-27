"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldX, Search } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { usePortal } from "@/lib/portal";

interface VerifiedCert {
  studentName: string;
  studentNumber: string;
  level: string;
  token: string;
  issuedAt: string;
  expiresAt: string;
  status: string;
}

function VerifyInner() {
  const portal = usePortal();
  const params = useSearchParams();
  const [token, setToken] = useState("");
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<VerifiedCert | undefined>();

  async function verify(value: string) {
    setChecked(false);
    try {
      const res = await fetch(
        `/api/portal/verify?token=${encodeURIComponent(value)}`,
        { cache: "no-store" },
      );
      const json = await res.json();
      if (json?.found) {
        setResult(json.certificate as VerifiedCert);
        setChecked(true);
        return;
      }
    } catch {
      // fall back to the local store (offline / demo)
      const local = portal.certByToken(value);
      if (local) {
        setResult(local);
        setChecked(true);
        return;
      }
    }
    setResult(undefined);
    setChecked(true);
  }

  useEffect(() => {
    const q = params.get("token");
    if (q) {
      setToken(q);
      void verify(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valid = result && result.status === "valid";

  return (
    <section className="section pt-0">
      <div className="container-x">
        <div className="mx-auto max-w-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verify(token);
            }}
            className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
          >
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="IQCDL-FND-2025-XXXXXX"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-400 focus:border-brand-400 focus:outline-none"
            />
            <button type="submit" className="btn-primary">
              <Search className="h-4 w-4" />
              Verify
            </button>
          </form>

          {checked && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              {valid ? (
                <div className="card border-emerald-200 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-emerald-700">
                        Valid certificate
                      </p>
                      <p className="text-sm text-slate-400">
                        This credential is genuine and active.
                      </p>
                    </div>
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <Row label="Holder" value={result!.studentName} />
                    <Row label="Student number" value={result!.studentNumber} mono />
                    <Row
                      label="Level"
                      value={result!.level === "practitioner" ? "Practitioner" : "Foundation"}
                    />
                    <Row label="Token" value={result!.token} mono />
                    <Row label="Issued" value={result!.issuedAt} />
                    <Row label="Valid until" value={result!.expiresAt} />
                  </dl>
                </div>
              ) : (
                <div className="card border-rose-200 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600">
                      <ShieldX className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-rose-700">
                        {result ? "Certificate revoked" : "Not found"}
                      </p>
                      <p className="text-sm text-slate-400">
                        {result
                          ? "This credential has been revoked and is no longer valid."
                          : "No certificate matches that token. Check the code and try again."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className={`mt-0.5 font-semibold text-white ${mono ? "font-mono text-[13px]" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <>
      <PageHero
        eyebrow="Credential verification"
        title="Verify an IQCDL certificate"
        subtitle="Every IQCDL certificate carries a unique tokenization number. Enter it below to confirm authenticity, holder and validity."
      />
      <Suspense fallback={<div className="h-40" />}>
        <VerifyInner />
      </Suspense>
    </>
  );
}
