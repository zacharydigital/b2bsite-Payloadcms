import { addQuoteItem } from "./quoteCartStore";
import { trackPdpEvent } from "./pdpTracking";

type Props = {
  product: {
    slug: string;
    model: string;
    title: string;
    powerKw: number;
  };
  whatsappUrl: string;
};

export default function BottomStickyCtaBar({ product, whatsappUrl }: Props) {
  return (
    <div className="pdp-bottom-cta" aria-label="Mobile product actions">
      <a href="#pdp-inquiry" className="button-lite primary">
        Inquire Now
      </a>
      <a
        className="button-lite"
        href={whatsappUrl}
        onClick={() => trackPdpEvent("whatsapp_click", { productModel: product.model, variant: "bottom_bar" })}
      >
        WhatsApp
      </a>
      <button type="button" className="button-lite" onClick={() => addQuoteItem(product)}>
        RFQ Cart
      </button>
    </div>
  );
}
