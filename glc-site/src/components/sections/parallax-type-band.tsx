"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type ParallaxTypeBandProps = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  /** Excavation: dark typographic slab on image. Foundations: light editorial rail. */
  tone: "dark" | "light";
};

/**
 * Full-bleed parallax image + oversized “type” treatment to break repetitive
 * service-page section stacks. Uses design tokens only (glc-base.css).
 */
export function ParallaxTypeBand({
  id = "parallax-type-band",
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  tone,
}: ParallaxTypeBandProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawImgY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const imgY = useSpring(rawImgY, { stiffness: 70, damping: 28 });

  const rawTextY = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  const textY = useSpring(rawTextY, { stiffness: 80, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`gl-parallax-type-band gl-parallax-type-band--${tone}`}
      aria-labelledby={`${id}-heading`}
    >
      <motion.div
        className="gl-parallax-type-band__media"
        style={mounted ? { y: imgY } : undefined}
        aria-hidden
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="gl-parallax-type-band__img"
          sizes="100vw"
          priority={false}
        />
        <div className="gl-parallax-type-band__media-scrim" />
      </motion.div>

      <motion.div
        className="gl-parallax-type-band__content"
        style={mounted ? { y: textY } : undefined}
      >
        <p className="gl-parallax-type-band__eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="gl-parallax-type-band__title">
          {title}
        </h2>
        {subtitle ? (
          <p className="gl-parallax-type-band__subtitle">{subtitle}</p>
        ) : null}
      </motion.div>
    </section>
  );
}
