import type { Metadata } from "next";
import {
  Oswald,
  Plus_Jakarta_Sans,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import "@/styles/glc-base.css";
import site from "@/content/site.json";
import navigation from "@/content/navigation.json";
import type { NavigationConfig, SiteConfig } from "@/content/types";
import { JsonLdLocalBusiness } from "@/components/seo/json-ld-local-business";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { defaultMetadata } from "@/lib/metadata-site";
import { getSiteUrl } from "@/lib/site-url";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const siteData = site as SiteConfig;
const navData = navigation as NavigationConfig;

export const metadata: Metadata = defaultMetadata(siteData);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publicUrl = getSiteUrl();
  const schemaSite: SiteConfig = { ...siteData, url: publicUrl };

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${plusJakarta.variable} ${sourceSerif.variable}`}
    >
      <body>
        <JsonLdLocalBusiness site={schemaSite} />
        <HashScrollHandler />
        <Header navigation={navData} />
        {children}
        <Footer site={siteData} navigation={navData} />
      </body>
    </html>
  );
}
