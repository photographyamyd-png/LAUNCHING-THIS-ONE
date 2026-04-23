import { SmartLink } from "@/components/ui/smart-link";
import { ROUTES } from "@/lib/routes";
import type { SnowLocationPageDef, SnowSubServicePageDef } from "@/lib/commercial-snow-routes";
import { hubUrlWithFragment, snowHubUrl } from "@/lib/commercial-snow-routes";

type Props =
  | {
      variant: "sub-service";
      def: SnowSubServicePageDef;
    }
  | {
      variant: "location";
      def: SnowLocationPageDef;
    };

export function CommercialSnowLinkedPage(props: Props) {
  const hub = snowHubUrl();
  const contact = ROUTES.contact;

  if (props.variant === "sub-service") {
    const { def } = props;
    const back = hubUrlWithFragment(def.hubFragment);
    return (
      <div className="glc-snow-linked">
        <p className="glc-snow-linked__crumb">
          <SmartLink href={ROUTES.home}>Home</SmartLink>
          {" · "}
          <SmartLink href={ROUTES.services}>Services</SmartLink>
          {" · "}
          <SmartLink href={hub}>Commercial snow removal</SmartLink>
        </p>
        <h1 className="glc-snow-linked__h1">{def.heading}</h1>
        <p className="glc-snow-linked__lede">
          This commercial snow line is part of Ground Level Contracting&apos;s Simcoe County winter program—built for
          businesses, property portfolios, and industrial sites (not residential driveways).
        </p>
        <p className="glc-snow-linked__p">
          Read the full scope, SLA options, and equipment fit on the main hub—section opens to this service line.
        </p>
        <div className="glc-snow-linked__cta-row">
          <SmartLink href={back} className="glc-snow-btn glc-snow-btn--primary">
            View on commercial snow hub
          </SmartLink>
          <SmartLink href="tel:+17056194902" className="glc-snow-btn glc-snow-btn--line glc-snow-btn--on-light">
            Call 705-619-4902
          </SmartLink>
        </div>
      </div>
    );
  }

  const { def } = props;
  const area = hubUrlWithFragment("service-area");
  return (
    <div className="glc-snow-linked">
      <p className="glc-snow-linked__crumb">
        <SmartLink href={ROUTES.home}>Home</SmartLink>
        {" · "}
        <SmartLink href={ROUTES.services}>Services</SmartLink>
        {" · "}
        <SmartLink href={hub}>Commercial snow removal</SmartLink>
        {" · "}
        <span>{def.placeName}</span>
      </p>
      <h1 className="glc-snow-linked__h1">Commercial snow removal — {def.placeName}</h1>
      <p className="glc-snow-linked__lede">
        Ground Level Contracting provides commercial snow removal and ice management for businesses and institutional
        sites across {def.placeName === "Simcoe County" ? "the county" : def.placeName}, with SLAs and GPS-tracked
        service options.
      </p>
      <p className="glc-snow-linked__p">
        Coverage details, highways, and industrial corridors are summarized on the main commercial snow hub.
      </p>
      <div className="glc-snow-linked__cta-row">
        <SmartLink href={area} className="glc-snow-btn glc-snow-btn--primary">
          Service area on hub
        </SmartLink>
        <SmartLink href={contact} className="glc-snow-btn glc-snow-btn--line glc-snow-btn--on-light">
          Contact
        </SmartLink>
      </div>
    </div>
  );
}
