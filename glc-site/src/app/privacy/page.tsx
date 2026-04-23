import type { Metadata } from "next";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

const siteData = site as SiteConfig;

const privacySeo = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy placeholder. Replace with final legal copy.",
  path: ROUTES.privacy,
});

export const metadata: Metadata = {
  ...privacySeo,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: 48 }}>
      <h1 className="services__heading" style={{ marginBottom: 24 }}>
        Privacy <span>Policy</span>
      </h1>
      <p style={{ color: "var(--text-600)", maxWidth: 640 }}>
        Placeholder page for {siteData.name}. Final privacy policy will be added
        when legal content is ready.
      </p>
    </main>
  );
}
