import { buildFaqSchema } from "@/lib/schema";

type Props = {
  items: Array<{ question: string; answer: string }>;
};

export function JsonLdFaq({ items }: Props) {
  if (!items.length) {
    return null;
  }

  const data = buildFaqSchema(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
