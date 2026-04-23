import type { Metadata } from "next";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const siteData = site as SiteConfig;

const termsSeo = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use placeholder. Replace with final legal copy.",
  path: ROUTES.terms,
});

export const metadata: Metadata = {
  ...termsSeo,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: 48 }}>
      <h1 className="services__heading" style={{ marginBottom: 24 }}>
        Terms of <span>Use</span>
      </h1>
      <p style={{ color: "var(--text-600)", maxWidth: 640 }}>
        Placeholder page for {siteData.name}. Final terms will be added when
        legal content is ready.
      </p>
    </main>
  );
}
