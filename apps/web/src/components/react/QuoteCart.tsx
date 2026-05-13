import { useEffect, useMemo, useState } from "react";
import { addQuoteItem, readQuoteCart, type QuoteCartItem, writeQuoteCart } from "./quoteCartStore";

type Product = Omit<QuoteCartItem, "quantity" | "notes">;

type Props = {
  products: Product[];
};

type RfqDraft = {
  company: string;
  email: string;
  country: string;
  timeline: string;
  requirement: string;
};

const emptyDraft: RfqDraft = {
  company: "",
  email: "",
  country: "",
  timeline: "30-60 days",
  requirement: ""
};

export default function QuoteCart({ products }: Props) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [submittedId, setSubmittedId] = useState("");

  useEffect(() => {
    setItems(readQuoteCart());
    const handler = () => setItems(readQuoteCart());
    window.addEventListener("titanlaser:quote-cart-updated", handler);
    return () => window.removeEventListener("titanlaser:quote-cart-updated", handler);
  }, []);

  const totalPower = useMemo(() => items.reduce((sum, item) => sum + item.powerKw * item.quantity, 0), [items]);

  function updateItems(next: QuoteCartItem[]) {
    setItems(next);
    writeQuoteCart(next);
  }

  function submit() {
    const id = `RFQ-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
    const payload = { id, createdAt: new Date().toISOString(), draft, items };
    const history = JSON.parse(window.localStorage.getItem("titanlaserCrmSubmissions") || "[]");
    window.localStorage.setItem("titanlaserCrmSubmissions", JSON.stringify([payload, ...history].slice(0, 20)));
    setSubmittedId(id);
  }

  return (
    <section className="interactive-grid" aria-label="Quote cart">
      <aside className="interactive-panel sticky">
        <h2>Add machines</h2>
        <div className="control-stack">
          {products.map((product) => (
            <button className="button-lite" type="button" key={product.slug} onClick={() => updateItems(addQuoteItem(product))}>
              Add {product.model}
            </button>
          ))}
          <a className="button-lite" href="/products">
            Browse product list
          </a>
        </div>
      </aside>

      <div className="interactive-shell">
        <div className="interactive-panel">
          <h2>Selected RFQ items</h2>
          {items.length === 0 ? (
            <p>No products in the quote cart yet. Add a machine from the left panel or from a product page.</p>
          ) : (
            <div className="cart-lines">
              {items.map((item) => (
                <article className="interactive-card" key={item.slug}>
                  <h3>{item.model}</h3>
                  <p>{item.title}</p>
                  <ul className="pill-row">
                    <li>{item.powerKw} kW</li>
                    <li>Qty {item.quantity}</li>
                  </ul>
                  <div className="interactive-actions">
                    <button className="button-lite" type="button" onClick={() => updateItems(items.map((entry) => (entry.slug === item.slug ? { ...entry, quantity: entry.quantity + 1 } : entry)))}>
                      Increase
                    </button>
                    <button className="button-lite" type="button" onClick={() => updateItems(items.map((entry) => (entry.slug === item.slug ? { ...entry, quantity: Math.max(1, entry.quantity - 1) } : entry)))}>
                      Decrease
                    </button>
                    <button className="button-lite danger" type="button" onClick={() => updateItems(items.filter((entry) => entry.slug !== item.slug))}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="notice">Total selected laser power: {totalPower} kW</p>
        </div>

        <div className="interactive-panel">
          <h2>Submit RFQ draft to CRM</h2>
          <div className="control-stack">
            <label>
              Company
              <input value={draft.company} onChange={(event) => setDraft({ ...draft, company: event.target.value })} placeholder="Vietnam Ship Repair Co." />
            </label>
            <label>
              Work email
              <input type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} placeholder="buyer@company.com" />
            </label>
            <label>
              Country / market
              <input value={draft.country} onChange={(event) => setDraft({ ...draft, country: event.target.value })} placeholder="Vietnam" />
            </label>
            <label>
              Buying timeline
              <select value={draft.timeline} onChange={(event) => setDraft({ ...draft, timeline: event.target.value })}>
                <option>0-30 days</option>
                <option>30-60 days</option>
                <option>60-120 days</option>
                <option>Budget planning</option>
              </select>
            </label>
            <label>
              Requirement notes
              <textarea rows={5} value={draft.requirement} onChange={(event) => setDraft({ ...draft, requirement: event.target.value })} placeholder="Material, thickness, monthly tons, gas access, voltage, delivery port" />
            </label>
            <button className="button-lite primary" type="button" disabled={!items.length || !draft.email} onClick={submit}>
              Create CRM RFQ record
            </button>
            {submittedId && (
              <div className="crm-id">
                Created demo CRM record: <strong>{submittedId}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
