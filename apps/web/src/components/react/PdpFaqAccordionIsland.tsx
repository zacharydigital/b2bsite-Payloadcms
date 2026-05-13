import { useState } from "react";
import { trackPdpEvent } from "./pdpTracking";

type Faq = {
  question: string;
  answer: string;
  slug?: string;
};

type Props = {
  productModel: string;
  faqs: Faq[];
};

export default function PdpFaqAccordionIsland({ productModel, faqs }: Props) {
  const [open, setOpen] = useState<string>(faqs[0]?.question || "");

  return (
    <section className="pdp-faq" aria-label={`${productModel} buying questions`}>
      {faqs.map((faq) => (
        <article className="pdp-faq-item" key={faq.question}>
          <button
            type="button"
            onClick={() => {
              const next = open === faq.question ? "" : faq.question;
              setOpen(next);
              if (next) trackPdpEvent("faq_click", { productModel, question: faq.question });
            }}
            aria-expanded={open === faq.question}
          >
            {faq.question}
          </button>
          {open === faq.question && (
            <div>
              <p>{faq.answer}</p>
              <a href="/faq">Learn more →</a>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
