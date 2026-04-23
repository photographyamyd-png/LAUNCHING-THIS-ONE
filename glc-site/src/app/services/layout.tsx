import { BodyClass } from "@/components/layout/body-class";

export default function ServicesSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BodyClass className="page-service" />
      {children}
    </>
  );
}
