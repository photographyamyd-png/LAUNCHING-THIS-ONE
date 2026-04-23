import { CommercialSnowLinkedPage } from "@/components/services/commercial-snow-linked-page";
import { getAllSnowSubServiceDefs, getSnowSubServiceDef } from "@/lib/commercial-snow-routes";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Only pre-rendered snow line slugs; unknown paths → 404 (no partial dynamic). */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllSnowSubServiceDefs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const def = getSnowSubServiceDef(slug);
  if (!def) {
    return {};
  }
  return pageMetadata({
    title: def.metaTitle,
    description: def.metaDescription,
    path: ROUTES.service(slug),
  });
}

export default async function CommercialSnowSubServicePage({ params }: Props) {
  const { slug } = await params;
  const def = getSnowSubServiceDef(slug);
  if (!def) {
    notFound();
  }
  return (
    <main id="main-content" className="glc-snow-linked-shell">
      <CommercialSnowLinkedPage variant="sub-service" def={def} />
    </main>
  );
}
