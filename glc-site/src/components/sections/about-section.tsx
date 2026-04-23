"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { IconArrow } from "@/components/ui/icon-arrow";
import type { AboutProps } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutSection(props: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading">
      {/* Full-bleed contrast rule: separates “Six Core” accordion from About */}
      <div className="ab3__section-break" aria-hidden="true" />

      {/* Ghost GLC watermark — right-side decorative */}
      <span className="ab3__wm" aria-hidden>GLC</span>

      <div className="ab3__layout">

        {/* ══ LEFT — editorial copy column ══ */}
        <div className="ab3__copy">

          {/* Eyebrow + since marker */}
          <Reveal className="ab3__top-row">
            <span className="eyebrow">{props.eyebrow}</span>
            <span className="ab3__since" aria-label={`${props.mediaStat.value} ${props.mediaStat.label}`}>
              {props.mediaStat.value}&thinsp;
              <span>{props.mediaStat.label}</span>
            </span>
          </Reveal>

          {/* Heading — large stacked display */}
          <Reveal delayClass="reveal--delay-1" className="ab3__heading-wrap">
            <h2 id="about-heading" className="ab3__heading">
              {props.headingBefore}
              <em className="ab3__heading-em">{props.headingAccent}</em>
              {props.headingAfter}
            </h2>
            <span className="ab3__heading-rule" aria-hidden />
          </Reveal>

          {/* Body */}
          <Reveal delayClass="reveal--delay-2">
            <p className="ab3__body">{props.body}</p>
          </Reveal>

          {/* Credentials — 4-cell compact grid */}
          <Reveal delayClass="reveal--delay-3" className="ab3__creds">
            {props.credentials.map((c, i) => (
              <div key={c.title} className="ab3__cred">
                <div className="ab3__cred-idx" aria-hidden>0{i + 1}</div>
                <div className="ab3__cred-body">
                  <div className="ab3__cred-title">{c.title}</div>
                  <div className="ab3__cred-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delayClass="reveal--delay-4">
            <a href={props.cta.href} className="btn-primary">
              {props.cta.label}
              <IconArrow />
            </a>
          </Reveal>
        </div>

        {/* ══ RIGHT — dark photo panel ══ */}
        <div className="ab3__media">
          {/* Yellow badge — punches off the left edge */}
          <div className="ab3__badge" aria-hidden>
            <span>{props.badgeText}</span>
          </div>

          {/* Photo fill */}
          <div className="ab3__photo" role="img" aria-label="Ground Level Contracting crew on an excavation site" />

          {/* Floating stat chip */}
          <motion.div
            className="ab3__chip"
            initial={{ opacity: 0, x: 28, y: 8 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            aria-hidden
          >
            <div className="ab3__chip-num">{props.mediaStat.value}</div>
            <div className="ab3__chip-lbl">{props.mediaStat.label}</div>
          </motion.div>

          {/* Bottom corner accent */}
          <div className="ab3__corner-mark" aria-hidden />
        </div>

      </div>
    </section>
  );
}
