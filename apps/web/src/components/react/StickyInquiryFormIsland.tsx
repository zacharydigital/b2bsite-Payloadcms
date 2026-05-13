import { useState } from "react";
import { addQuoteItem } from "./quoteCartStore";
import { trackPdpEvent } from "./pdpTracking";

type Props = {
  product: {
    slug: string;
    model: string;
    title: string;
    powerKw: number;
  };
  defaults: {
    replySla: string;
    privacyPromise: string;
    ndaAvailable: boolean;
    whatsappUrl: string;
    socialProofText: string;
  };
  variant?: "sidebar" | "final";
};

type Draft = {
  email: string;
  name: string;
  country: string;
  quantity: string;
  whatsapp: string;
  message: string;
  nda: boolean;
  fileName: string;
};

const initialDraft: Draft = {
  email: "",
  name: "",
  country: "",
  quantity: "1 set",
  whatsapp: "",
  message: "",
  nda: false,
  fileName: ""
};

export default function StickyInquiryFormIsland({ product, defaults, variant = "sidebar" }: Props) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [crmId, setCrmId] = useState("");

  function update(next: Partial<Draft>) {
    if (!draft.email && (next.email || next.name || next.country)) {
      trackPdpEvent("form_start", { productModel: product.model, variant });
    }
    setDraft({ ...draft, ...next });
  }

  function submit() {
    const id = `PDP-RFQ-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
    const payload = {
      id,
      product,
      productUrl: typeof window === "undefined" ? `/products/${product.slug}` : window.location.href,
      locale: typeof document === "undefined" ? "en" : document.documentElement.lang,
      draft,
      source: "pdp_sticky_inquiry",
      createdAt: new Date().toISOString()
    };
    const history = JSON.parse(window.localStorage.getItem("titanlaserCrmSubmissions") || "[]");
    window.localStorage.setItem("titanlaserCrmSubmissions", JSON.stringify([payload, ...history].slice(0, 50)));
    addQuoteItem(product);
    trackPdpEvent("form_submit", { productModel: product.model, crmId: id, variant });
    setCrmId(id);
  }

  return (
    <section className={`pdp-inquiry ${variant}`} aria-label={`Get a quote for ${product.model}`}>
      <p className="eyebrow">Get latest price</p>
      <h2>Get a Quote for This Product</h2>
      <p>{defaults.replySla} · No spam · {defaults.ndaAvailable ? "NDA available" : "NDA on request"}</p>
      {step === 1 ? (
        <div className="control-stack">
          <label>
            Work email*
            <input type="email" value={draft.email} onChange={(event) => update({ email: event.target.value })} placeholder="buyer@company.com" />
          </label>
          <label>
            Name*
            <input value={draft.name} onChange={(event) => update({ name: event.target.value })} placeholder="Maria Schneider" />
          </label>
          <label>
            Country*
            <input value={draft.country} onChange={(event) => update({ country: event.target.value })} placeholder="Germany" />
          </label>
          <button className="button-lite primary" type="button" disabled={!draft.email || !draft.name || !draft.country} onClick={() => setStep(2)}>
            Continue to project details
          </button>
        </div>
      ) : (
        <div className="control-stack">
          <label>
            Quantity
            <input value={draft.quantity} onChange={(event) => update({ quantity: event.target.value })} />
          </label>
          <label>
            WhatsApp
            <input value={draft.whatsapp} onChange={(event) => update({ whatsapp: event.target.value })} placeholder="+49..." />
          </label>
          <label>
            Message
            <textarea rows={4} value={draft.message} onChange={(event) => update({ message: event.target.value })} placeholder="Material, thickness, monthly hours, gas supply, delivery port" />
          </label>
          <label>
            Upload drawing / specs
            <input type="file" onChange={(event) => update({ fileName: event.target.files?.[0]?.name || "" })} />
          </label>
          {draft.fileName && <p className="notice">Attached demo file: {draft.fileName}</p>}
          <label className="checkbox-row">
            <input type="checkbox" checked={draft.nda} onChange={(event) => update({ nda: event.target.checked })} />
            Send NDA template before technical file review
          </label>
          <button className="button-lite primary" type="button" onClick={submit}>
            Get My Quote →
          </button>
          <button className="button-lite" type="button" onClick={() => setStep(1)}>
            Back
          </button>
        </div>
      )}
      <p className="pdp-microcopy">Your info is safe. {defaults.privacyPromise}</p>
      <p className="pdp-social-proof">{defaults.socialProofText}</p>
      <div className="interactive-actions">
        <a
          className="button-lite"
          href={defaults.whatsappUrl}
          onClick={() => trackPdpEvent("whatsapp_click", { productModel: product.model, variant })}
        >
          WhatsApp us
        </a>
        <button className="button-lite" type="button" onClick={() => addQuoteItem(product)}>
          Add to RFQ cart
        </button>
      </div>
      {crmId && <div className="crm-id">Created demo CRM record: {crmId}</div>}
    </section>
  );
}
