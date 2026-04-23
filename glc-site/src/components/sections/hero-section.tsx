"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";
import { HeroServiceIcon } from "@/components/sections/service-card-icon";
import type { HeroProps } from "@/content/types";
import { ROUTES } from "@/lib/routes";

// ─── Variants ────────────────────────────────────────────────────────────────

/** Each headline line: clips up from underneath, like ink on wet concrete */
const LINE_VARIANT: Variants = {
  hidden: {
    clipPath: "inset(110% 0% -10% 0%)",
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    transition: {
      clipPath: { duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE },
      opacity:  { duration: 0.01, delay: 0.15 + i * 0.12 },
      y:        { duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE },
    },
  }),
};

/** Fade-up with blur clear */
const FADE_UP: Variants = {
  hidden:  { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.55 + i * 0.1, ease: EASE },
  }),
};

/** Photo panel: slides + unclips from right */
const PHOTO_VARIANT: Variants = {
  hidden: {
    opacity: 0,
    x: 56,
    clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 6% 100%)",
  },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      opacity:  { duration: 0.1 },
      x:        { duration: 1.1, delay: 0.2, ease: EASE },
      clipPath: { duration: 1.1, delay: 0.2, ease: EASE },
    },
  },
};

/** Glass chips: spring up from under the photo */
const CHIP_VARIANT: Variants = {
  hidden:  { opacity: 0, y: 24, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
      delay: 0.9 + i * 0.14,
    },
  }),
};

/** Service tile stagger */
const TILE_VARIANT: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: 1.1 + i * 0.07, ease: EASE },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection(props: HeroProps) {
  const {
    title,
    eyebrow,
    subheadline,
    lede,
    primaryCta,
    secondaryCta,
    stats,
    coverage,
    serviceBarSlugTitles,
    parallaxBackgroundImage,
  } = props;

  const sectionRef  = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── Parallax ──────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end start"],
  });

  const rawBgY   = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const rawPhotoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const rawTextY  = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  const bgY    = useSpring(rawBgY,    { stiffness: 80, damping: 30 });
  const photoY = useSpring(rawPhotoY, { stiffness: 80, damping: 30 });
  const textY  = useSpring(rawTextY,  { stiffness: 80, damping: 30 });

  // ── Scroll-mask for lede ──────────────────────────────────────────────────
  // Reveals the lede copy like ink bleeding through on first scroll
  const ledeMask = useTransform(
    scrollYProgress,
    [0, 0.18],
    [
      "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
      "linear-gradient(to bottom, black 0%, black 100%, transparent 100%)",
    ]
  );

  const lines: { text: string; lineNum: 1 | 2 | 3 }[] = [
    { text: title.line1, lineNum: 1 },
    { text: title.line2, lineNum: 2 },
    { text: title.line3, lineNum: 3 },
  ];

  return (
    <>
    <section id="hero" ref={sectionRef} aria-label="Hero" className="hero-v2">
      {/* ════ LAYER 0 — Deep background photo ════════════════════════════════ */}
      <motion.div className="hero-v2__bg-plane" style={{ y: bgY }} aria-hidden>
        {parallaxBackgroundImage ? (
          <div className="hero-v2__bg-roll" aria-hidden>
            <div
              className="hero-v2__bg-photo hero-v2__bg-photo--image"
              style={{
                backgroundImage: `url('${parallaxBackgroundImage}')`,
              }}
            />
          </div>
        ) : (
          <div className="hero-v2__bg-photo" />
        )}
        <div className="hero-v2__scrim-radial" />
        <div className="hero-v2__scrim-left" />
      </motion.div>

      {/* ════ LAYER 1 — Blueprint geometry ══════════════════════════════════ */}
      <div className="hero-v2__structure-plane" aria-hidden>
        <svg className="hero-v2__blueprint" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="598" height="598" stroke="white" strokeWidth="1.5" />
          <rect x="40" y="40" width="520" height="520" stroke="white" strokeWidth="0.5" strokeDasharray="3 9" />
          <line x1="300" y1="1" x2="300" y2="599" stroke="white" strokeWidth="0.5" />
          <line x1="1" y1="300" x2="599" y2="300" stroke="white" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="140" stroke="white" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="220" stroke="white" strokeWidth="0.5" strokeDasharray="2 10" />
          <line x1="80" y1="80" x2="520" y2="520" stroke="white" strokeWidth="0.3" strokeDasharray="4 12" />
          <line x1="520" y1="80" x2="80" y2="520" stroke="white" strokeWidth="0.3" strokeDasharray="4 12" />
        </svg>
        {/* Engineering micro-grid */}
        <div className="hero-v2__eng-grid" />
      </div>

      {/* ════ LAYER 2 — Yellow diagonal accent ══════════════════════════════ */}
      <div className="hero-v2__diag-stripe" aria-hidden />

      {/* ════ LAYER 3 — Content + Photo ════════════════════════════════════ */}
      <div className="hero-v2__canvas">

        {/* ── Photo panel (right column, absolute, parallelogram clip) ── */}
        <motion.div
          className="hero-v2__photo-panel"
          style={mounted ? { y: photoY } : {}}
          variants={PHOTO_VARIANT}
          initial="hidden"
          animate="visible"
          aria-hidden
        >
          <Image
            src="/images/hero-armour-stone-retaining-walls.png"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          {/* Photo scrim for readability of overlapping text */}
          <div className="hero-v2__photo-scrim" />

          {/* ── Glass stat chips floating over photo ── */}
          <div className="hero-v2__chips">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="hero-v2__chip"
                variants={CHIP_VARIANT}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                <span className="hero-v2__chip-num">{s.value}</span>
                <span className="hero-v2__chip-label">{s.label}</span>
              </motion.div>
            ))}

            <motion.div
              className="hero-v2__chip hero-v2__chip--coverage"
              variants={CHIP_VARIANT}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <span className="hero-v2__chip-eyebrow">{coverage.label}</span>
              <div className="hero-v2__chip-tags">
                {coverage.tags.map((t) => (
                  <span key={t} className="hero-v2__chip-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Main content ── */}
        <motion.div
          className="hero-v2__content"
          style={mounted ? { y: textY } : {}}
        >
          {/* Vertical rotated eyebrow — left rail */}
          <motion.div
            className="hero-v2__vert-label"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            {eyebrow}
          </motion.div>

          {/* Ghost logo watermark — native <img> avoids next/image SSR/CSR drift + stale chunk mismatches */}
          <div className="hero-v2__ghost-mark" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark; must match SSR exactly */}
            <img
              src="/images/glc-logo.png"
              alt=""
              width={360}
              height={360}
              className="hero-v2__ghost-mark-img"
              draggable={false}
              decoding="async"
            />
          </div>

          {/* ── H1 Headline: each line clips up individually ── */}
          <h1 className="hero-v2__headline" aria-label={`${title.line1} ${title.line2} ${title.line3}`}>
            {lines.map(({ text, lineNum }) => (
              <span key={lineNum} className="hero-v2__line-overflow" aria-hidden>
                <motion.span
                  className={`hero-v2__line${lineNum === title.emphasizeLine ? " hero-v2__line--accent" : ""}`}
                  variants={LINE_VARIANT}
                  custom={lineNum}
                  initial="hidden"
                  animate="visible"
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* ── Rule ── */}
          <motion.div
            className="hero-v2__rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />

          {subheadline ? (
            <motion.h2
              className="hero-v2__subheadline"
              variants={FADE_UP}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              {subheadline}
            </motion.h2>
          ) : null}

          {/* ── Lede — two-tier editorial structure ── */}
          {(() => {
            // Split at em-dash: lead = core proposition, body = service detail
            const [ledeLead = lede, ledeBody] = lede.split(' — ');
            const brand = 'Ground Level Contracting';
            const hasBrand = ledeLead.startsWith(brand);
            const leadRemainder = hasBrand ? ledeLead.slice(brand.length) : ledeLead;

            return (
              <motion.div
                className="hero-v2__lede-block"
                style={mounted ? { WebkitMaskImage: ledeMask, maskImage: ledeMask } : {}}
                variants={FADE_UP}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <p className="hero-v2__lede-lead">
                  {hasBrand ? (
                    <><strong className="hero-v2__lede-brand">{brand}</strong>{leadRemainder}</>
                  ) : ledeLead}
                </p>
                {ledeBody && (
                  <p className="hero-v2__lede-body">{ledeBody}</p>
                )}
              </motion.div>
            );
          })()}

          {/* ── CTA row ── */}
          <motion.div
            className="hero-v2__cta-row"
            variants={FADE_UP}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href={primaryCta.href}
              className="btn-primary"
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              {primaryCta.label}
              <IconArrow />
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              <SmartLink href={secondaryCta.href} className="btn-hero-glass">
                {secondaryCta.label}
              </SmartLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* ════ SERVICE RAIL — between hero and marquee (full-bleed, not inside #hero) ═══ */}
      <div
        className="hero-v2__service-rail"
        aria-label="Core service lines"
      >
        <div className="hero-v2__service-bar">
          <div className="hero-v2__service-inner">
            {serviceBarSlugTitles.map((s, i) => (
              <motion.div
                key={s.slug}
                variants={TILE_VARIANT}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                <SmartLink className="hero-v2__service-tile" href={ROUTES.service(s.slug)}>
                  <HeroServiceIcon slug={s.slug} />
                  <span className="hero-v2__service-label">{s.title}</span>
                </SmartLink>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
