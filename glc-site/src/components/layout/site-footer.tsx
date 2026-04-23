import Image from "next/image";
import { SmartLink } from "@/components/ui/smart-link";
import type { NavigationConfig, SiteConfig } from "@/content/types";

const LOGO = "/images/glc-logo.png";

type Props = {
  site: SiteConfig;
  navigation: NavigationConfig;
  /** Minimal bar-only footer (legacy services HTML). */
  minimal?: boolean;
};

export function SiteFooter({ site, navigation, minimal }: Props) {
  if (minimal) {
    return (
      <footer id="footer" aria-label="Site footer" style={{ marginTop: 48 }}>
        <div className="footer__bar">
          <div className="footer__bar-inner">
            <p className="footer__copy">
              © {site.copyrightYear} {site.name}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  const { footer } = navigation;

  return (
    <footer id="footer" aria-label="Site footer">
      <div className="footer__main">
        <div className="footer__brand">
          <div className="footer__logo-row">
            <div className="footer__logo-mark-wrap">
              <Image src={LOGO} alt="" width={40} height={40} />
            </div>
            <div>
              <div className="footer__wordmark-name">{site.name}</div>
              <div className="footer__wordmark-sub">{site.slogan}</div>
            </div>
          </div>
          <p className="footer__tagline">{footer.tagline}</p>
          <div className="footer__contact-item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 12.85 19.79 19.79 0 0 1 1.21 4.25 2 2 0 0 1 3.18 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a
              href={`tel:${site.telephone}`}
              className="footer__phone-link"
            >
              {site.telephoneDisplay}
            </a>
          </div>
          <div className="footer__contact-item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {site.address.streetAddress}, {site.address.addressLocality},{" "}
            {site.address.addressRegion} {site.address.postalCode}
          </div>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <div className="footer__col-title">{col.title}</div>
            <ul className="footer__links">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <SmartLink href={l.href}>{l.label}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bar">
        <div className="footer__bar-inner">
          <p className="footer__copy">
            © {site.copyrightYear} <span>{site.legalName}</span> —{" "}
            {site.address.addressLocality}, {site.address.addressCountry === "CA" ? "Ontario" : site.address.addressRegion}. All rights reserved.
          </p>
          <div className="footer__legal">
            {footer.legal.map((l) => (
              <SmartLink key={l.href} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
