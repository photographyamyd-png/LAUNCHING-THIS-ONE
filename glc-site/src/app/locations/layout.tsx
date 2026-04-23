import { BodyClass } from "@/components/layout/body-class";

/** Mirrors services layout so location landings get the same body class / chrome rhythm. */
export default function LocationsLayout({
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
