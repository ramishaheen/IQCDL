"use client";

import { useEffect, useState } from "react";
import { Bot, CheckCircle2, CreditCard, Key, Loader2, Save, ShieldCheck, XCircle } from "lucide-react";
import { Panel, Btn } from "@/components/dashboard/ui";

type Provider = "anthropic-primary" | "anthropic-fallback" | "stripe";

interface MaskStatus {
  anthropicPrimary: { set: boolean; hint: string };
  anthropicFallback: { set: boolean; hint: string };
  stripeSecret: { set: boolean; hint: string };
  sources: Record<string, string>;
}

interface TestState {
  loading: boolean;
  ok?: boolean;
  message?: string;
}

export function SettingsConsole() {
  const [status, setStatus] = useState<MaskStatus | null>(null);
  const [vals, setVals] = useState({ anthropicPrimary: "", anthropicFallback: "", stripeSecret: "" });
  const [tests, setTests] = useState<Record<Provider, TestState>>({
    "anthropic-primary": { loading: false },
    "anthropic-fallback": { loading: false },
    stripe: { loading: false },
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function loadStatus() {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) setStatus(await res.json());
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function runTest(provider: Provider, key: string) {
    setTests((t) => ({ ...t, [provider]: { loading: true } }));
    try {
      const res = await fetch("/api/admin/settings/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, key: key || undefined }),
      });
      const data = await res.json();
      setTests((t) => ({ ...t, [provider]: { loading: false, ok: data.ok, message: data.message } }));
    } catch {
      setTests((t) => ({ ...t, [provider]: { loading: false, ok: false, message: "Test request failed" } }));
    }
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vals),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setVals({ anthropicPrimary: "", anthropicFallback: "", stripeSecret: "" });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <Panel
        title="AI provider keys"
        desc="Used by the Quantum Guide, the AI jury and the editorial agent. The primary key is tried first; the fallback is used automatically if the primary fails. Keys are stored server-side and never displayed."
      >
        <div className="space-y-4">
          <KeyRow
            icon={<Bot className="h-4 w-4" />}
            label="Anthropic API key — primary (default)"
            placeholder={status?.anthropicPrimary.set ? `Saved ${status.anthropicPrimary.hint} · replace to change` : "sk-ant-…"}
            source={status?.sources.anthropicPrimary}
            value={vals.anthropicPrimary}
            onChange={(v) => setVals({ ...vals, anthropicPrimary: v })}
            onTest={() => runTest("anthropic-primary", vals.anthropicPrimary)}
            test={tests["anthropic-primary"]}
          />
          <KeyRow
            icon={<Bot className="h-4 w-4" />}
            label="Anthropic API key — fallback"
            placeholder={status?.anthropicFallback.set ? `Saved ${status.anthropicFallback.hint} · replace to change` : "sk-ant-… (backup)"}
            source={status?.sources.anthropicFallback}
            value={vals.anthropicFallback}
            onChange={(v) => setVals({ ...vals, anthropicFallback: v })}
            onTest={() => runTest("anthropic-fallback", vals.anthropicFallback)}
            test={tests["anthropic-fallback"]}
          />
        </div>
      </Panel>

      <Panel
        title="Stripe"
        desc="Secret key for live payments — membership ($19/yr), award category ($1,000) and entity assessment ($5,000). Without it, checkout runs in demo mode."
      >
        <KeyRow
          icon={<CreditCard className="h-4 w-4" />}
          label="Stripe secret key"
          placeholder={status?.stripeSecret.set ? `Saved ${status.stripeSecret.hint} · replace to change` : "sk_live_… or sk_test_…"}
          source={status?.sources.stripeSecret}
          value={vals.stripeSecret}
          onChange={(v) => setVals({ ...vals, stripeSecret: v })}
          onTest={() => runTest("stripe", vals.stripeSecret)}
          test={tests.stripe}
        />
      </Panel>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
        <Btn variant="primary" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save settings
        </Btn>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        Visible to administrators only. Stored encrypted-in-transit in your Upstash/KV store; values are never sent back to the browser.
      </p>
    </div>
  );
}

function KeyRow({
  icon, label, placeholder, source, value, onChange, onTest, test,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  source?: string;
  value: string;
  onChange: (v: string) => void;
  onTest: () => void;
  test: TestState;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <span className="text-brand-600">{icon}</span>
          {label}
        </span>
        {source && (
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
            source === "admin" ? "bg-brand-50 text-brand-700" : source === "env" ? "bg-slate-200 text-slate-600" : "bg-amber-50 text-amber-700"
          }`}>
            {source === "admin" ? "saved in admin" : source === "env" ? "from env" : "not set"}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Key className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            autoComplete="off"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none"
          />
        </div>
        <Btn variant="soft" onClick={onTest} disabled={test.loading}>
          {test.loading ? (
            <span className="inline-flex items-center gap-1.5"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Testing…</span>
          ) : (
            "Test"
          )}
        </Btn>
      </div>
      {test.message && (
        <p className={`mt-2 inline-flex items-center gap-1.5 text-xs ${test.ok ? "text-emerald-600" : "text-rose-600"}`}>
          {test.ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
          {test.message}
        </p>
      )}
    </div>
  );
}
