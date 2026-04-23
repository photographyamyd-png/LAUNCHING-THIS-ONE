"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { SmartLink } from "@/components/ui/smart-link";
import {
  commercialSnowH1,
  commercialSnowHeroCtas,
  commercialSnowHeroImageAlt,
  commercialSnowOpeningParagraphs,
} from "@/content/commercial-snow-page-data";
import { ROUTES } from "@/lib/routes";

const HERO_IMG =
  "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1920&q=80&auto=format";

export function CommercialSnowHero() {
  const wrapRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 28 });
  const sy = useSpring(my, { stiffness: 120, damping: 28 });

  const glow = useMotionTemplate`radial-gradient(600px circle at ${sx} ${sy}, rgba(242, 183, 5, 0.18), transparent 55%)`;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
      mx.set(0.5);
      my.set(0.42);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  return (
    <section
      ref={wrapRef}
      className="glc-snow-hero"
      aria-labelledby="commercial-snow-h1"
      id="commercial-snow-hero"
    >
      <div className="glc-snow-hero__plane glc-snow-hero__plane--bg" aria-hidden>
        <div
          className="glc-snow-hero__bg-img"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
          role="img"
          aria-label={commercialSnowHeroImageAlt}
        />
      </div>
      <motion.div className="glc-snow-hero__plane glc-snow-hero__plane--glow" style={{ background: glow }} aria-hidden />
      <div className="glc-snow-hero__plane glc-snow-hero__plane--scrim" aria-hidden />
      <div className="glc-snow-hero__grid-noise" aria-hidden />
      <div className="glc-snow-hero__inner">
        <p className="glc-snow-hero__eyebrow">
          <span className="glc-snow-hero__pulse" aria-hidden />
          Commercial-only · 24/7 · Simcoe County
        </p>
        <p className="glc-snow-hero__breadcrumb">
          <SmartLink href={ROUTES.home}>Home</SmartLink>
          {" · "}
          <SmartLink href={ROUTES.services}>Services</SmartLink>
          {" · "}
          <span>Commercial snow</span>
        </p>
        <h1 id="commercial-snow-h1" className="glc-snow-hero__title">
          {commercialSnowH1}
        </h1>
        {commercialSnowOpeningParagraphs.map((p, i) => (
          <p key={i} className="glc-snow-hero__lede">
            {p}
          </p>
        ))}
        <div className="glc-snow-hero__cta-row">
          <SmartLink href={commercialSnowHeroCtas.primary.href} className="glc-snow-btn glc-snow-btn--primary">
            {commercialSnowHeroCtas.primary.label}
          </SmartLink>
          <SmartLink href={commercialSnowHeroCtas.secondary.href} className="glc-snow-btn glc-snow-btn--ghost">
            {commercialSnowHeroCtas.secondary.label}
          </SmartLink>
          <SmartLink href={commercialSnowHeroCtas.tertiary.href} className="glc-snow-btn glc-snow-btn--line">
            {commercialSnowHeroCtas.tertiary.label}
          </SmartLink>
        </div>
        <div className="glc-snow-hero__metrics" aria-label="Commercial highlights">
          <div className="glc-snow-hero__metric">
            <span className="glc-snow-hero__metric-k">SLA</span>
            <span className="glc-snow-hero__metric-v">Written</span>
          </div>
          <div className="glc-snow-hero__metric">
            <span className="glc-snow-hero__metric-k">GPS</span>
            <span className="glc-snow-hero__metric-v">Verified</span>
          </div>
          <div className="glc-snow-hero__metric">
            <span className="glc-snow-hero__metric-k">Ice</span>
            <span className="glc-snow-hero__metric-v">Managed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
