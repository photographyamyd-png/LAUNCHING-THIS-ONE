"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { IconArrow } from "@/components/ui/icon-arrow";
import type { WhyProps } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhySection(props: WhyProps) {
  return (
    <section id="why" aria-labelledby="why-heading">

      {/* ══ Header block — 2-col editorial split ══ */}
      <div className="why3__header">
        <div className="why3__header-left">
          <Reveal className="eyebrow">{props.eyebrow}</Reveal>
          <Reveal delayClass="reveal--delay-1">
            <h2 id="why-heading" className="why3__heading">
              {props.headingBefore}
              <em>{props.headingEmphasis}</em>
              {props.headingAfter}
            </h2>
          </Reveal>
        </div>
        <Reveal delayClass="reveal--delay-2" className="why3__header-right">
          <p className="why3__intro">{props.body}</p>
          <a href={props.cta.href} className="btn-primary why3__cta">
            {props.cta.label}
            <IconArrow />
          </a>
        </Reveal>
      </div>

      {/* ══ Reason rows — large editorial format ══ */}
      <div className="why3__reasons">
        {props.reasons.map((r, i) => (
          <motion.div
            key={r.num}
            className="why3__reason"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
          >
            {/* Ghost number — large background watermark */}
            <span className="why3__ghost-num" aria-hidden>{r.num}</span>

            {/* Content row */}
            <div className="why3__reason-inner">
              <div className="why3__num" aria-hidden>{r.num}</div>
              <div className="why3__divider" aria-hidden />
              <div className="why3__text-block">
                <div className="why3__title">{r.title}</div>
                <p className="why3__desc">{r.text}</p>
              </div>
              {/* Arrow tick on hover */}
              <div className="why3__arrow-mark" aria-hidden>→</div>
            </div>

            {/* Hover yellow fill layer */}
            <div className="why3__hover-fill" aria-hidden />
          </motion.div>
        ))}
      </div>

    </section>
  );
}
