import home from "@/content/pages/home.json";
import type { CtaBandProps, HomePageContent } from "@/content/types";
import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";
import { ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";

const homeContent = home as HomePageContent;
const cta = homeContent.sections.find((s) => s.type === "ctaBand")
  ?.props as CtaBandProps;
const siteData = site as SiteConfig;

export const metadata = pageMetadata({
  title: `Contact | ${siteData.name}`,
  description: cta.sub,
  path: ROUTES.contact,
});

export default function ContactPage() {
  return (
    <main id="main-content" style={{ paddingTop: "calc(var(--gl-header-height) + 48px)" }}>
      <article
        className="container"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 40px 80px",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: 16 }}>
          {cta.eyebrow}
        </p>
        <h1 className="about__heading" style={{ marginBottom: 16 }}>
          {cta.headingLine1}
          <br />
          {cta.headingLine2}
          <em>{cta.headingEmphasis}</em>
        </h1>
        <p className="about__body" style={{ maxWidth: 640, marginBottom: 40 }}>
          {cta.sub}
        </p>

        <h2 className="services__heading" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", marginBottom: 20 }}>
          Call <span>direct</span>
        </h2>
        <p style={{ marginBottom: 12 }}>
          <a href={cta.phoneHref} className="cta-band__phone" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            {cta.phone}
          </a>
        </p>
        <a href={cta.emailCta.href} className="btn-primary" style={{ marginBottom: 48 }}>
          {cta.emailCta.label}
          <IconArrow />
        </a>

        <h2 className="services__heading" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", marginBottom: 16 }}>
          Mailing <span>address</span>
        </h2>
        <p style={{ color: "var(--text-600)", maxWidth: 480, lineHeight: 1.6 }}>
          {siteData.address.streetAddress}, {siteData.address.addressLocality},{" "}
          {siteData.address.addressRegion} {siteData.address.postalCode}
        </p>

        <p style={{ marginTop: 48, color: "var(--text-600)" }}>
          <SmartLink href={`${ROUTES.home}#process`}>How we work</SmartLink>
          {" · "}
          <SmartLink href={ROUTES.services}>All services</SmartLink>
        </p>
      </article>
    </main>
  );
}
