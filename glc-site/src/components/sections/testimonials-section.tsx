"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import type { TestimonialsProps } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TestimonialsSection(props: TestimonialsProps) {
  const [featured, ...rest] = props.items;

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">

      {/* ══ Header ══ */}
      <div className="tst3__header">
        <Reveal className="tst3__header-left">
          <span className="eyebrow eyebrow--dark">{props.eyebrow}</span>
          <h2 id="testimonials-heading" className="tst3__heading">
            {props.headingBefore}
            <em>{props.headingAccent}</em>
            {props.headingAfter}
          </h2>
        </Reveal>
        <Reveal delayClass="reveal--delay-2" className="tst3__header-right">
          <p className="tst3__sub">{props.sub}</p>
        </Reveal>
      </div>

      {/* ══ Featured quote — full editorial spread ══ */}
      {featured && (
        <motion.div
          className="tst3__featured"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          role="article"
        >
          {/* Large decorative open quote */}
          <span className="tst3__open-mark" aria-hidden>&ldquo;</span>

          <div className="tst3__featured-body">
            <p className="tst3__featured-quote">&ldquo;{featured.quote}&rdquo;</p>
            <div className="tst3__featured-attribution">
              <span className="tst3__featured-name">{featured.name}</span>
              <span className="tst3__featured-sep" aria-hidden />
              <span className="tst3__featured-role">{featured.role}</span>
            </div>
          </div>

          {/* Yellow structural accent */}
          <div className="tst3__featured-accent" aria-hidden />
        </motion.div>
      )}

      {/* ══ Supporting quotes — 2-col grid ══ */}
      {rest.length > 0 && (
        <div className="tst3__grid">
          {rest.map((t, i) => (
            <motion.article
              key={t.name}
              className="tst3__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <span className="tst3__card-mark" aria-hidden>&ldquo;</span>
              <p className="tst3__card-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="tst3__card-rule" aria-hidden />
              <div className="tst3__card-name">{t.name}</div>
              <div className="tst3__card-role">{t.role}</div>
            </motion.article>
          ))}
        </div>
      )}

    </section>
  );
}
