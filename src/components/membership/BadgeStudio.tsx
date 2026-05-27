"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImagePlus, Instagram, Linkedin, Loader2, Check } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

const SIZE = 1080;
const SITE = "https://www.iqcdl.org";

// Standalone seal SVG (atom + circular legend) rendered onto the canvas.
function sealSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <defs>
      <path id="t" d="M 30 100 A 70 70 0 0 1 170 100" fill="none"/>
      <path id="b" d="M 168 100 A 68 68 0 0 1 32 100" fill="none"/>
    </defs>
    <circle cx="100" cy="100" r="96" fill="rgba(8,12,28,0.55)"/>
    <circle cx="100" cy="100" r="92" fill="none" stroke="#7dd3fc" stroke-width="1" opacity="0.6"/>
    <circle cx="100" cy="100" r="84" fill="none" stroke="#7dd3fc" stroke-width="2"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#7dd3fc" stroke-width="1" stroke-dasharray="2 3" opacity="0.7"/>
    <text fill="#bae6fd" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2">
      <textPath href="#t" startOffset="50%" text-anchor="middle">INTERNATIONAL · QUANTUM · COMPUTING</textPath>
    </text>
    <text fill="#bae6fd" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="3">
      <textPath href="#b" startOffset="50%" text-anchor="middle">DRIVING · LICENSE</textPath>
    </text>
    <g transform="translate(100 88)" stroke="#a5f3fc" stroke-width="2.5" fill="none">
      <ellipse rx="22" ry="9"/>
      <ellipse rx="22" ry="9" transform="rotate(60)"/>
      <ellipse rx="22" ry="9" transform="rotate(120)"/>
      <circle r="4" fill="#a5f3fc" stroke="none"/>
    </g>
    <text x="100" y="128" text-anchor="middle" fill="#e0f2fe" font-family="Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2">IQCDL</text>
  </svg>`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function BadgeStudio({ name }: { name: string }) {
  const { dict } = useLocale();
  const b = dict.membership.badge;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // background: photo cover-fit, else brand gradient
    if (photoUrl) {
      try {
        const img = await loadImage(photoUrl);
        const scale = Math.max(SIZE / img.width, SIZE / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
      } catch {
        /* fall through to gradient */
      }
    }
    if (!photoUrl) {
      const g = ctx.createLinearGradient(0, 0, SIZE, SIZE);
      g.addColorStop(0, "#0b1030");
      g.addColorStop(1, "#0e2a4f");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SIZE, SIZE);
    }

    // bottom darkening for legible text
    const shade = ctx.createLinearGradient(0, SIZE * 0.45, 0, SIZE);
    shade.addColorStop(0, "rgba(5,6,15,0)");
    shade.addColorStop(1, "rgba(5,6,15,0.92)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, SIZE, SIZE);

    // top brand bar
    ctx.fillStyle = "rgba(5,6,15,0.35)";
    ctx.fillRect(0, 0, SIZE, 120);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 52px Arial, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText("IQCDL", 56, 62);
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "600 24px Arial, sans-serif";
    ctx.fillText(b.memberLabel, 56, 96);

    // seal top-right
    try {
      const seal = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(sealSvg())}`);
      ctx.drawImage(seal, SIZE - 280, 150, 230, 230);
    } catch {
      /* ignore seal */
    }

    // member name
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 76px Arial, sans-serif";
    ctx.fillText(name || "IQCDL Member", 56, SIZE - 230);

    // accent rule
    ctx.fillStyle = "#22d3ee";
    ctx.fillRect(58, SIZE - 200, 220, 6);

    // statement
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 44px Arial, sans-serif";
    ctx.fillText(b.statement, 56, SIZE - 130);

    // url
    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 30px Arial, sans-serif";
    ctx.fillText("iqcdl.org", 56, SIZE - 70);
  }, [photoUrl, name, b.memberLabel, b.statement]);

  useEffect(() => {
    draw();
  }, [draw]);

  async function getBlob(): Promise<Blob | null> {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return new Promise((resolve) => canvas.toBlob((bl) => resolve(bl), "image/png"));
  }

  async function download() {
    const blob = await getBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iqcdl-member-badge.png";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function shareNative() {
    setBusy(true);
    try {
      const blob = await getBlob();
      if (!blob) return;
      const file = new File([blob], "iqcdl-member-badge.png", { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({ files: [file], text: `${b.statement} ${SITE}` });
      } else {
        await download();
      }
    } catch {
      /* user cancelled or unsupported */
    } finally {
      setBusy(false);
    }
  }

  async function shareLinkedIn() {
    // LinkedIn web share takes a URL; copy the caption and download the image to attach.
    try {
      await navigator.clipboard?.writeText(`${b.statement} ${SITE}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
    await download();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
      <div className="overflow-hidden rounded-2xl border border-line/10 bg-black/20">
        <canvas ref={canvasRef} width={SIZE} height={SIZE} className="aspect-square w-full" />
      </div>

      <div className="space-y-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setPhotoUrl(URL.createObjectURL(f));
            e.target.value = "";
          }}
        />
        <button onClick={() => fileRef.current?.click()} className="btn-ghost w-full">
          <ImagePlus className="h-4 w-4" />
          {photoUrl ? b.change : b.upload}
        </button>

        <button onClick={shareNative} disabled={busy} className="btn-primary w-full text-white">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Instagram className="h-4 w-4" />}
          {b.shareInstagram}
        </button>

        <button onClick={shareLinkedIn} className="btn-ghost w-full">
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Linkedin className="h-4 w-4" />}
          {copied ? b.copied : b.shareLinkedin}
        </button>

        <button onClick={download} className="btn-ghost w-full">
          <Download className="h-4 w-4" />
          {b.download}
        </button>

        <p className="text-xs leading-relaxed text-faint">{b.hint}</p>
      </div>
    </div>
  );
}
