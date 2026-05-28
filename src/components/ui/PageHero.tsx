"use client";

import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {videoSrc ? (
          <>
            <video
              className="absolute inset-0 h-full w-full object-cover"
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
            {/* Lighter overlay so the video is clearly visible; bottom fades into the page bg. */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/35 via-[#05060f]/20 to-[#05060f]/85" />
            <div className="absolute inset-0 grid-bg opacity-15 mix-blend-screen" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 bg-quantum-radial" />
            <div className="absolute left-1/2 top-[-30%] h-72 w-[700px] -translate-x-1/2 rounded-full bg-quantum-indigo/20 blur-[110px]" />
          </>
        )}
      </div>
      <div className="container-x py-16 text-center sm:py-20">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.span>
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
    </section>
  );
}
