import type { HomeSectionBlock, MegaMenuCard } from "@/content/types";
import { HeroSection } from "@/components/sections/hero-section";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { FeaturedAccordion } from "@/components/sections/featured-accordion";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesGridSection } from "@/components/sections/services-grid-section";
import { StatsSection } from "@/components/sections/stats-section";
import { WhySection } from "@/components/sections/why-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaBandSection } from "@/components/sections/cta-band-section";

type Props = {
  sections: HomeSectionBlock[];
  megaCards: MegaMenuCard[];
};

export function SectionRenderer({ sections, megaCards }: Props) {
  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.type}-${index}`;
        switch (section.type) {
          case "hero":
            return <HeroSection key={key} {...section.props} />;
          case "marquee":
            return <MarqueeBand key={key} {...section.props} />;
          case "accordion":
            return (
              <section
                key={key}
                id="interactive-accordion"
                className="gl-react-embed-section"
                aria-label="Featured highlights"
              >
                <FeaturedAccordion {...section.props} />
              </section>
            );
          case "about":
            return <AboutSection key={key} {...section.props} />;
          case "services":
            return (
              <ServicesGridSection
                key={key}
                {...section.props}
                cards={megaCards}
              />
            );
          case "stats":
            return <StatsSection key={key} {...section.props} />;
          case "why":
            return <WhySection key={key} {...section.props} />;
          case "process":
            return <ProcessSection key={key} {...section.props} />;
          case "coverage":
            return <CoverageSection key={key} {...section.props} />;
          case "testimonials":
            return <TestimonialsSection key={key} {...section.props} />;
          case "ctaBand":
            return <CtaBandSection key={key} {...section.props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
