"use client";

import { useState, type ReactNode, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AtomIcon } from "@/components/visuals/AtomIcon";

export interface BookPage {
  title: string;
  lines?: string[];
  node?: ReactNode;
}

export function Book3D({
  coverTitle,
  coverSubtitle,
  hint,
  openLabel,
  closeLabel = "Close",
  pages,
  accent = "from-quantum-indigo to-quantum-cyan",
  Icon = AtomIcon,
}: {
  coverTitle: string;
  coverSubtitle?: string;
  hint?: string;
  openLabel: string;
  closeLabel?: string;
  pages: BookPage[];
  accent?: string;
  Icon?: ComponentType<{ className?: string; size?: number }>;
}) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    if (next < 0 || next >= pages.length) return;
    setDir(next > i ? 1 : -1);
    setI(next);
  };

  return (
    <>
      {/* closed book trigger */}
      <button
        type="button"
        onClick={() => {
          setI(0);
          setOpen(true);
        }}
        className="group perspective-1200 mx-auto block w-full max-w-xs text-start"
        aria-label={openLabel}
      >
        <div className="preserve-3d relative transition-transform duration-700 ease-out group-hover:[transform:rotateY(-28deg)_translateY(-6px)]">
          {/* spine + cover */}
          <div
            className={`relative h-72 overflow-hidden rounded-r-2xl rounded-l-sm bg-gradient-to-br ${accent} p-6 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)] ring-1 ring-black/20`}
          >
            {/* spine shadow strip */}
            <div className="absolute inset-y-0 left-0 w-4 rounded-l-sm bg-gradient-to-r from-black/55 to-transparent" />
            {/* embossed inner border */}
            <div className="pointer-events-none absolute inset-2 rounded-r-xl rounded-l-sm border border-white/20" />
            <div className="pointer-events-none absolute inset-3 rounded-r-xl rounded-l-sm border border-black/15" />
            {/* glossy top highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-r-2xl rounded-l-sm bg-[radial-gradient(120%_60%_at_25%_-10%,rgba(255,255,255,0.35),transparent_60%)]" />
            {/* subtle linen grain via repeating stripes */}
            <div className="pointer-events-none absolute inset-0 rounded-r-2xl rounded-l-sm opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.7)_0_2px,transparent_2px_5px)]" />
            {/* gold ribbon / bookmark */}
            <div className="pointer-events-none absolute -top-1 right-5 h-12 w-4 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.4)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)]" />
            {/* mark + content */}
            <div className="relative">
              <Icon className="text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" size={36} />
            </div>
            <h3 className="relative mt-6 text-2xl font-black leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
              {coverTitle}
            </h3>
            {coverSubtitle && (
              <p className="relative mt-2 text-sm font-medium text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                {coverSubtitle}
              </p>
            )}
            <div className="absolute inset-x-6 bottom-5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span>IQCDL</span>
              <span>{hint ?? openLabel}</span>
            </div>
          </div>
          {/* page edges — three stacked thin slabs for depth */}
          <div className="absolute -right-1.5 top-1.5 h-[17.5rem] w-3 -skew-y-[7deg] rounded-r-md bg-gradient-to-r from-white/85 via-white/65 to-white/30 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]" />
          <div className="absolute -right-[3px] top-1 h-[17.5rem] w-[3px] -skew-y-[7deg] bg-white/25" />
          <div className="absolute -right-[6px] top-[3px] h-[17rem] w-[3px] -skew-y-[7deg] bg-white/10" />
          {/* bottom contact shadow */}
          <div className="pointer-events-none absolute -bottom-3 left-3 right-1 h-3 rounded-full bg-black/55 blur-md" />
        </div>
      </button>

      {open && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="book-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.85, rotateY: -25, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="perspective-1200 relative w-full max-w-2xl"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-3 -right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900 shadow-lg"
                  aria-label={closeLabel}
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative min-h-[26rem] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-7 shadow-2xl ring-1 ring-white/10 sm:p-9">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={i}
                      custom={dir}
                      initial={{ rotateY: dir * 50, opacity: 0, x: dir * 40 }}
                      animate={{ rotateY: 0, opacity: 1, x: 0 }}
                      exit={{ rotateY: dir * -50, opacity: 0, x: dir * -40 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="preserve-3d"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-quantum-cyan" size={22} />
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-quantum-cyan">
                          {coverTitle}
                        </p>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-white">{pages[i]?.title}</h3>
                      {pages[i]?.lines && (
                        <ul className="mt-4 space-y-2.5">
                          {pages[i].lines!.map((l, k) => (
                            <li key={k} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-quantum-cyan" />
                              {l}
                            </li>
                          ))}
                        </ul>
                      )}
                      {pages[i]?.node && <div className="mt-4">{pages[i].node}</div>}
                    </motion.div>
                  </AnimatePresence>

                  {/* controls */}
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => go(i - 1)}
                      disabled={i === 0}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      {pages.map((_, k) => (
                        <button
                          key={k}
                          onClick={() => go(k)}
                          className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-quantum-cyan" : "w-1.5 bg-white/25"}`}
                          aria-label={`Page ${k + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => go(i + 1)}
                      disabled={i === pages.length - 1}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
