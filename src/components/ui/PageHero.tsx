"use client";

import { motion } from "framer-motion";
import { ScrollCue } from "@/components/visuals/ScrollCue";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  videoSrc,
  videoPoster,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional background video (e.g. "/awards-bg.mp4"). Falls back to the default gradient. */
  videoSrc?: string;
  videoPoster?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#05060f]">
      {videoSrc ? (
        <>
          <video
            key={videoSrc}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-[filter] duration-700"
            style={{ filter: "brightness(0.42) saturate(1.05)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoPoster}
            aria-hidden
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Cinematic ambient overlay — ~55% black wash with a soft top
             vignette, a 2px backdrop-blur for premium-SaaS depth, and a
             bottom fade into page background. */}
          <div
            className="pointer-events-none absolute inset-0 bg-[#05060f]/55"
            style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05060f]/30 via-transparent to-[#05060f]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#05060f]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-quantum-radial" />
          <div className="absolute left-1/2 top-[-30%] h-72 w-[700px] -translate-x-1/2 rounded-full bg-quantum-indigo/20 blur-[110px]" />
        </div>
      )}
      <div className="container-x relative z-10 py-16 text-center sm:py-20">
        {eyebrow && (
          <div className="flex justify-start">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              {eyebrow}
            </motion.span>
          </div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text-animated mx-auto mt-5 max-w-3xl text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {videoSrc && <ScrollCue />}
    </section>
  );
}
