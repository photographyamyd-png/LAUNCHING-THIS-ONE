import { CommercialSnowLinkedPage } from "@/components/services/commercial-snow-linked-page";
import { getAllSnowLocationDefs, getSnowLocationDef } from "@/lib/commercial-snow-routes";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllSnowLocationDefs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const def = getSnowLocationDef(slug);
  if (!def) {
    return {};
  }
  return pageMetadata({
    title: def.metaTitle,
    description: def.metaDescription,
    path: ROUTES.snowLocation(slug),
  });
}

export default async function CommercialSnowLocationPage({ params }: Props) {
  const { slug } = await params;
  const def = getSnowLocationDef(slug);
  if (!def) {
    notFound();
  }
  return (
    <main id="main-content" className="glc-snow-linked-shell">
      <CommercialSnowLinkedPage variant="location" def={def} />
    </main>
  );
}
