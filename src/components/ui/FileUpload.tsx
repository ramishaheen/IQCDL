"use client";

import { useRef, useState } from "react";
import { Check, Loader2, Paperclip, X } from "lucide-react";

export interface UploadedFile {
  name: string;
  url: string | null;
}

export function FileUpload({
  label,
  kind,
  accept = "image/*,application/pdf",
  value,
  onChange,
}: {
  label: string;
  kind: string;
  accept?: string;
  value?: UploadedFile | null;
  onChange: (f: UploadedFile | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", kind);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        onChange(null);
      } else {
        onChange({ name: data.name ?? file.name, url: data.url ?? null });
      }
    } catch {
      setError("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>
      {value ? (
        <div className="flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2.5 text-sm">
          <span className="flex items-center gap-2 truncate text-fg">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            <span className="truncate">{value.name}</span>
          </span>
          <button type="button" onClick={() => onChange(null)} className="shrink-0 text-faint hover:text-fg" aria-label="Remove">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex w-full items-center gap-2 rounded-xl border border-dashed border-line/20 bg-surface/5 px-3.5 py-2.5 text-sm text-muted transition hover:border-brand-400 hover:text-fg disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
          {busy ? "Uploading…" : label}
        </button>
      )}
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
