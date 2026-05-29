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

/* Render a single physical page body — used in spreads and on the flipping leaf. */
function PageBody({
  page,
  pageNumber,
  Icon,
  bookTitle,
  side,
}: {
  page?: BookPage;
  pageNumber: number;
  Icon: ComponentType<{ className?: string; size?: number }>;
  bookTitle: string;
  side: "left" | "right";
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden bg-[linear-gradient(180deg,#fbf4e3_0%,#f5ead0_100%)] px-7 pb-10 pt-8 sm:px-9 sm:pt-10 ${
        side === "left"
          ? "rounded-l-md shadow-[inset_-14px_0_22px_-12px_rgba(0,0,0,0.45)]"
          : "rounded-r-md shadow-[inset_14px_0_22px_-12px_rgba(0,0,0,0.45)]"
      }`}
    >
      {/* paper noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,rgba(120,80,20,0.6)_0_0.5px,transparent_0.5px_3px),repeating-linear-gradient(90deg,rgba(120,80,20,0.5)_0_0.5px,transparent_0.5px_5px)]" />

      {page ? (
        <>
          <div className="relative flex items-center gap-2">
            <Icon className="text-amber-700/80" size={16} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-800/70">
              {bookTitle}
            </p>
          </div>
          <h3 className="relative mt-3 font-serif text-2xl font-bold leading-tight text-stone-900 sm:text-[1.6rem]">
            {page.title}
          </h3>
          <div className="relative mt-2 h-px w-12 bg-amber-700/30" />
          {page.lines && (
            <ul className="relative mt-5 space-y-2.5">
              {page.lines.map((l, k) => (
                <li
                  key={k}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-stone-800 sm:text-sm"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700/70" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          )}
          {page.node && <div className="relative mt-4 text-stone-800">{page.node}</div>}
        </>
      ) : (
        <div className="relative flex h-full items-center justify-center">
          <p className="font-serif text-sm italic text-stone-500">— end —</p>
        </div>
      )}

      <div className="absolute inset-x-7 bottom-3 flex items-center justify-between font-serif text-[10px] uppercase tracking-[0.18em] text-stone-500 sm:inset-x-9">
        <span>{side === "left" ? bookTitle : `Page ${pageNumber}`}</span>
        <span>{side === "left" ? `Page ${pageNumber}` : bookTitle}</span>
      </div>
    </div>
  );
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
  // Each "spread" shows two pages: pages[2k] (left) and pages[2k+1] (right).
  const totalSpreads = Math.max(1, Math.ceil(pages.length / 2));
  const [spread, setSpread] = useState(0);
  const [flipDir, setFlipDir] = useState<0 | 1 | -1>(0);

  function turn(dir: 1 | -1) {
    if (flipDir !== 0) return;
    const target = spread + dir;
    if (target < 0 || target >= totalSpreads) return;
    setFlipDir(dir);
  }

  function onFlipComplete() {
    if (flipDir === 0) return;
    setSpread((s) => s + flipDir);
    setFlipDir(0);
  }

  function handleOpen() {
    setSpread(0);
    setFlipDir(0);
    setOpen(true);
  }

  // displayed spread (after flip completes, this is the new state)
  const displayedSpread = spread;
  const leftIdx = displayedSpread * 2;
  const rightIdx = displayedSpread * 2 + 1;

  // during a flip, also pre-render the destination spread underneath
  const targetSpread = spread + (flipDir === 0 ? 0 : flipDir);
  const targetLeftIdx = targetSpread * 2;
  const targetRightIdx = targetSpread * 2 + 1;

  return (
    <>
      {/* closed book trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className="group perspective-1200 mx-auto block w-full max-w-xs text-start"
        aria-label={openLabel}
      >
        <div className="preserve-3d relative transition-transform duration-700 ease-out group-hover:[transform:rotateY(-28deg)_translateY(-6px)]">
          <div
            className={`relative h-72 overflow-hidden rounded-r-2xl rounded-l-sm bg-gradient-to-br ${accent} p-6 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)] ring-1 ring-black/20`}
          >
            <div className="absolute inset-y-0 left-0 w-4 rounded-l-sm bg-gradient-to-r from-black/55 to-transparent" />
            <div className="pointer-events-none absolute inset-2 rounded-r-xl rounded-l-sm border border-white/20" />
            <div className="pointer-events-none absolute inset-3 rounded-r-xl rounded-l-sm border border-black/15" />
            <div className="pointer-events-none absolute inset-0 rounded-r-2xl rounded-l-sm bg-[radial-gradient(120%_60%_at_25%_-10%,rgba(255,255,255,0.35),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-r-2xl rounded-l-sm opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.7)_0_2px,transparent_2px_5px)]" />
            <div className="pointer-events-none absolute -top-1 right-5 h-12 w-4 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.4)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)]" />
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
          <div className="absolute -right-1.5 top-1.5 h-[17.5rem] w-3 -skew-y-[7deg] rounded-r-md bg-gradient-to-r from-white/85 via-white/65 to-white/30 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]" />
          <div className="absolute -right-[3px] top-1 h-[17.5rem] w-[3px] -skew-y-[7deg] bg-white/25" />
          <div className="absolute -right-[6px] top-[3px] h-[17rem] w-[3px] -skew-y-[7deg] bg-white/10" />
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
              className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-md"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, rotateY: -18, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="perspective-2000 relative w-full max-w-4xl"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-3 -right-3 z-30 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900 shadow-lg"
                  aria-label={closeLabel}
                >
                  <X className="h-4 w-4" />
                </button>

                {/* book stage */}
                <div className="relative">
                  {/* book backdrop / leather cover edge */}
                  <div className={`pointer-events-none absolute -inset-3 rounded-2xl bg-gradient-to-br ${accent} opacity-90 blur-[2px]`} />
                  <div className="pointer-events-none absolute -inset-1.5 rounded-xl bg-black/40" />

                  <div className="preserve-3d relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
                    {/* base layer = current spread; during flip we render the TARGET spread instead, since the flipping leaf covers the side that's about to change */}
                    <div className="absolute inset-0 grid grid-cols-2">
                      <PageBody
                        page={pages[flipDir === -1 ? targetLeftIdx : leftIdx]}
                        pageNumber={(flipDir === -1 ? targetLeftIdx : leftIdx) + 1}
                        Icon={Icon}
                        bookTitle={coverTitle}
                        side="left"
                      />
                      <PageBody
                        page={pages[flipDir === 1 ? targetRightIdx : rightIdx]}
                        pageNumber={(flipDir === 1 ? targetRightIdx : rightIdx) + 1}
                        Icon={Icon}
                        bookTitle={coverTitle}
                        side="right"
                      />
                    </div>

                    {/* flipping page overlay */}
                    {flipDir === 1 && (
                      <motion.div
                        key={`fwd-${spread}`}
                        className="preserve-3d absolute inset-y-0 left-1/2 right-0"
                        style={{ transformOrigin: "left center" }}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -180 }}
                        transition={{ duration: 0.95, ease: [0.45, 0.05, 0.55, 0.95] }}
                        onAnimationComplete={onFlipComplete}
                      >
                        {/* front face = old right page */}
                        <div className="absolute inset-0 [backface-visibility:hidden]">
                          <PageBody
                            page={pages[rightIdx]}
                            pageNumber={rightIdx + 1}
                            Icon={Icon}
                            bookTitle={coverTitle}
                            side="right"
                          />
                        </div>
                        {/* back face = new left page (revealed after rotation past 90°) */}
                        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <PageBody
                            page={pages[targetLeftIdx]}
                            pageNumber={targetLeftIdx + 1}
                            Icon={Icon}
                            bookTitle={coverTitle}
                            side="left"
                          />
                        </div>
                      </motion.div>
                    )}

                    {flipDir === -1 && (
                      <motion.div
                        key={`back-${spread}`}
                        className="preserve-3d absolute inset-y-0 left-0 right-1/2"
                        style={{ transformOrigin: "right center" }}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 180 }}
                        transition={{ duration: 0.95, ease: [0.45, 0.05, 0.55, 0.95] }}
                        onAnimationComplete={onFlipComplete}
                      >
                        {/* front face = old left page */}
                        <div className="absolute inset-0 [backface-visibility:hidden]">
                          <PageBody
                            page={pages[leftIdx]}
                            pageNumber={leftIdx + 1}
                            Icon={Icon}
                            bookTitle={coverTitle}
                            side="left"
                          />
                        </div>
                        {/* back face = new right page */}
                        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <PageBody
                            page={pages[targetRightIdx]}
                            pageNumber={targetRightIdx + 1}
                            Icon={Icon}
                            bookTitle={coverTitle}
                            side="right"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* central spine seam + gutter shadow */}
                    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2 bg-black/40" />
                    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 -ml-3 h-full w-6 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45),transparent_70%)]" />
                  </div>
                </div>

                {/* controls */}
                <div className="relative mt-6 flex items-center justify-between gap-4">
                  <button
                    onClick={() => turn(-1)}
                    disabled={flipDir !== 0 || spread === 0}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-25"
                    aria-label="Previous spread"
                  >
                    <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                    Prev
                  </button>
                  <div className="flex items-center gap-1.5" aria-label="Page indicator">
                    {Array.from({ length: totalSpreads }, (_, k) => (
                      <button
                        key={k}
                        onClick={() => {
                          if (flipDir !== 0 || k === spread) return;
                          setFlipDir(k > spread ? 1 : -1);
                          /* one-step animation only — for multi-jump we just snap */
                          if (Math.abs(k - spread) > 1) {
                            setSpread(k);
                            setFlipDir(0);
                          }
                        }}
                        className={`h-1.5 rounded-full transition-all ${k === spread ? "w-6 bg-quantum-cyan" : "w-1.5 bg-white/25 hover:bg-white/40"}`}
                        aria-label={`Spread ${k + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => turn(1)}
                    disabled={flipDir !== 0 || spread >= totalSpreads - 1}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-25"
                    aria-label="Next spread"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
