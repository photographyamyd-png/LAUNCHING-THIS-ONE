"use client";

import { useState, type SyntheticEvent } from "react";
import { IconArrow } from "@/components/ui/icon-arrow";
import type { AccordionContentItem, FeaturedAccordionLayoutVariant } from "@/content/types";

type ItemProps = {
  item: AccordionContentItem;
  isActive: boolean;
  onMouseEnter: () => void;
};

function AccordionItem({ item, isActive, onMouseEnter }: ItemProps) {
  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    el.onerror = null;
    el.src =
      "https://placehold.co/400x450/2E2B28/F8BE12?text=Ground+Level";
  };

  return (
    <div
      className={`
        relative h-[450px] overflow-hidden cursor-pointer rounded-none
        border border-[var(--gray-200)] shadow-[var(--shadow-card)]
        transition-[width] duration-700 [transition-timing-function:var(--ease-expo)]
        ${isActive ? "w-[400px]" : "w-[60px]"}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- dynamic external URLs + onError fallback */}
      <img
        src={item.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={handleImgError}
      />
      <div className="absolute inset-0 bg-[var(--charcoal-deep)]/45" />

      <span
        className={`
          absolute whitespace-nowrap text-center
          font-[family-name:var(--font-body)] text-[13px] font-extrabold uppercase
          tracking-[0.08em] text-[var(--white)]
          transition-all duration-300 [transition-timing-function:var(--ease-expo)]
          ${
            isActive
              ? "bottom-6 left-1/2 max-w-[90%] -translate-x-1/2 rotate-0 text-[var(--yellow-core)]"
              : "bottom-24 left-1/2 w-auto -translate-x-1/2 rotate-90 text-left text-[var(--white)]"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
}

export type FeaturedAccordionProps = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  cta: { label: string; href: string };
  items: AccordionContentItem[];
  layoutVariant?: FeaturedAccordionLayoutVariant;
};

export function FeaturedAccordion({
  eyebrow,
  headingLine1,
  headingLine2,
  intro,
  cta,
  items,
  layoutVariant = "split-copy-left-strip-right",
}: FeaturedAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motifOffset, setMotifOffset] = useState({ x: 0, y: 0 });

  // Other `layoutVariant` values: implement as separate layouts (see featured-accordion-pattern-registry.json
  // + featured-accordion-variants-preview.html), then switch/render here.
  void layoutVariant;

  return (
    <div
      className="bg-[var(--white)] text-[var(--text-900)] [font-family:var(--font-body)]"
      style={{ borderTop: "1px solid var(--gray-200)" }}
    >
      <section
        className="container"
        style={{ paddingBlock: "var(--section-v)", position: "relative", overflow: "hidden" }}
        aria-labelledby="accordion-services-heading"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
          setMotifOffset({ x, y });
        }}
        onMouseLeave={() => setMotifOffset({ x: 0, y: 0 })}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-34px",
            left: "-120px",
            width: "560px",
            height: "220px",
            backgroundImage:
              "url('/images/motifs/watermarks/glc-wm-03-horizontal-stack.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            opacity: 0.18,
            transform: `rotate(-18deg) translate3d(${motifOffset.x}px, ${motifOffset.y}px, 0)`,
            transformOrigin: "top left",
            transition: "transform 220ms var(--ease-expo)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-center">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <div
              className="eyebrow eyebrow--dark mx-auto justify-center md:mx-0 md:justify-start"
              style={{ marginBottom: "16px" }}
            >
              {eyebrow}
            </div>
            <h2
              id="accordion-services-heading"
              className="services__heading [text-wrap:balance]"
            >
              {headingLine1}
              <br />
              <span>{headingLine2}</span>
            </h2>
            <p className="services__intro mx-auto mt-6 max-w-xl md:mx-0">{intro}</p>
            <div className="mt-8 flex justify-center md:justify-start">
              <a href={cta.href} className="btn-primary">
                {cta.label}
                <IconArrow />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-3 overflow-x-auto p-2 md:gap-4 md:p-4 [scrollbar-width:thin]">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
