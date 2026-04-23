"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import type { ProcessProps } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProcessSection(props: ProcessProps) {
  return (
    <section id="process" aria-labelledby="process-heading">
      <div className="proc3__layout">

        {/* ══ LEFT — dark editorial panel ══ */}
        <div className="proc3__left-panel">
          {/* Top yellow accent */}
          <div className="proc3__left-accent" aria-hidden />

          <Reveal className="eyebrow proc3__eyebrow">{props.eyebrow}</Reveal>
          <Reveal delayClass="reveal--delay-1">
            <h2 id="process-heading" className="proc3__heading">
              {props.heading}
              <span className="proc3__heading-accent">{props.headingAccent}</span>
            </h2>
          </Reveal>
          <Reveal delayClass="reveal--delay-2">
            <p className="proc3__intro">
              We move fast. Every project begins with a site call, gets a clean quote, and ends with signed-off documentation. No surprises.
            </p>
          </Reveal>

          {/* Decorative large step count */}
          <div className="proc3__count-mark" aria-hidden>
            0{props.steps.length}
          </div>
        </div>

        {/* ══ RIGHT — timeline steps ══ */}
        <div className="proc3__steps-panel">
          {/* Connecting vertical thread */}
          <div className="proc3__thread" aria-hidden />

          {props.steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="proc3__step"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
            >
              {/* Step node on the thread */}
              <div className="proc3__node" aria-hidden>
                <span>{step.num}</span>
              </div>

              {/* Step content */}
              <div className="proc3__step-content">
                <div className="proc3__step-label">Step {step.num}</div>
                <div className="proc3__step-title">{step.title}</div>
                <p className="proc3__step-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
