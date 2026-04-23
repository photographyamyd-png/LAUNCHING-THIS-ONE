import home from "@/content/pages/home.json";
import type { AboutProps, HomePageContent } from "@/content/types";
import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";
import { ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";

const homeContent = home as HomePageContent;
const about = homeContent.sections.find((s) => s.type === "about")
  ?.props as AboutProps;
const siteData = site as SiteConfig;

const aboutDescription = about.body;

export const metadata = pageMetadata({
  title: `About | ${siteData.name}`,
  description: aboutDescription,
  path: ROUTES.about,
});

export default function AboutPage() {
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
          {about.eyebrow}
        </p>
        <h1 className="about__heading" style={{ marginBottom: 24 }}>
          {about.headingBefore}
          <span>{about.headingAccent}</span>
          {about.headingAfter}
        </h1>
        <div className="about__divider" style={{ marginBottom: 28 }} />
        <p className="about__body" style={{ maxWidth: 720, marginBottom: 32 }}>
          {about.body}
        </p>
        <div className="about__credentials" style={{ marginBottom: 36 }}>
          {about.credentials.map((c) => (
            <div key={c.title} className="about__credential">
              <div className="about__credential-title">{c.title}</div>
              <div className="about__credential-sub">{c.sub}</div>
            </div>
          ))}
        </div>
        <a href={about.cta.href} className="btn-primary">
          {about.cta.label}
          <IconArrow />
        </a>
        <p style={{ marginTop: 48, color: "var(--text-600)", maxWidth: 640 }}>
          <SmartLink href={`${ROUTES.home}#coverage`}>Coverage area</SmartLink>
          {" · "}
          <SmartLink href={`${ROUTES.home}#process`}>Our process</SmartLink>
          {" · "}
          <SmartLink href={ROUTES.contact}>Contact</SmartLink>
        </p>
      </article>
    </main>
  );
}
