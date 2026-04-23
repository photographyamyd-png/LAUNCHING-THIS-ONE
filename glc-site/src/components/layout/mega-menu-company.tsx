import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";
import type { CompanyMegaConfig } from "@/content/types";

type Props = {
  companyMega: CompanyMegaConfig;
};

export function MegaMenuCompany({ companyMega }: Props) {
  const dispatch = companyMega.dispatchBand;
  return (
    <div className="gl-mega-panel__inner gl-mega-panel__inner--company">
      <div className="gl-mega-panel__intro">
        <span className="gl-mega-panel__kicker">{companyMega.kicker}</span>
        <p>{companyMega.intro}</p>
      </div>
      {companyMega.columns.map((col) => (
        <div key={col.title} className="gl-mega-company-col">
          <div className="gl-mega-company-col__title">{col.title}</div>
          <ul className="gl-mega-company-col__list">
            {col.links.map((l) => (
              <li key={`${col.title}-${l.href}`}>
                <SmartLink href={l.href}>{l.label}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="gl-mega-dispatch">
        <div>
          <span className="gl-mega-panel__kicker">{dispatch.kicker}</span>
          <p className="gl-mega-dispatch__title">{dispatch.title}</p>
          <p className="gl-mega-dispatch__sub">{dispatch.sub}</p>
        </div>
        <a href={dispatch.phoneHref} className="btn-primary">
          {dispatch.phoneDisplay}
          <IconArrow />
        </a>
      </div>
    </div>
  );
}
