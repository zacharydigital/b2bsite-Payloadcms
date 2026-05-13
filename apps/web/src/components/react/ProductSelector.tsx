import { useMemo, useState } from "react";
import AddToQuoteButton from "./AddToQuoteButton";

type Product = {
  slug: string;
  model: string;
  title: string;
  powerKw: number;
  shortDescription: string;
  recommendedFor: string[];
  materialCapabilities: Array<{
    material: string;
    maxThicknessMm: number;
    assistGas: string;
    cuttingSpeedMMin: number;
  }>;
};

type Props = {
  products: Product[];
};

export default function ProductSelector({ products }: Props) {
  const [material, setMaterial] = useState("Carbon steel");
  const [thickness, setThickness] = useState(20);
  const [monthlyHours, setMonthlyHours] = useState(160);
  const [application, setApplication] = useState("Shipbuilding");
  const [automation, setAutomation] = useState("Manual loading");

  const recommendation = useMemo(() => {
    const capable = products
      .map((product) => {
        const capability = product.materialCapabilities.find((item) => item.material === material && item.maxThicknessMm >= thickness);
        if (!capability) return null;
        const utilizationScore = monthlyHours > 220 ? product.powerKw : product.powerKw * 0.85;
        const applicationScore = product.recommendedFor.some((item) => item.toLowerCase().includes(application.toLowerCase().split(" ")[0])) ? 0 : 8;
        return { product, capability, score: utilizationScore + applicationScore };
      })
      .filter(Boolean) as Array<{ product: Product; capability: Product["materialCapabilities"][number]; score: number }>;

    return capable.sort((a, b) => a.score - b.score)[0] || null;
  }, [products, material, thickness, monthlyHours, application]);

  return (
    <section className="interactive-grid" aria-label="Product selector">
      <aside className="interactive-panel sticky">
        <h2>Selection inputs</h2>
        <div className="control-stack">
          <label>
            Material
            <select value={material} onChange={(event) => setMaterial(event.target.value)}>
              <option>Carbon steel</option>
              <option>Stainless steel</option>
              <option>Aluminum</option>
            </select>
          </label>
          <label>
            Maximum thickness (mm)
            <input type="number" min={1} max={80} value={thickness} onChange={(event) => setThickness(Number(event.target.value))} />
          </label>
          <label>
            Monthly cutting hours
            <input type="number" min={20} max={600} value={monthlyHours} onChange={(event) => setMonthlyHours(Number(event.target.value))} />
          </label>
          <label>
            Application
            <select value={application} onChange={(event) => setApplication(event.target.value)}>
              <option>Shipbuilding</option>
              <option>Steel service center</option>
              <option>Machinery fabrication</option>
              <option>Metal furniture</option>
            </select>
          </label>
          <label>
            Automation level
            <select value={automation} onChange={(event) => setAutomation(event.target.value)}>
              <option>Manual loading</option>
              <option>Exchange table</option>
              <option>Loading/unloading automation</option>
              <option>MES connected cell</option>
            </select>
          </label>
        </div>
      </aside>

      <div className="interactive-shell">
        {recommendation ? (
          <div className="selector-result">
            <p className="eyebrow">Recommended model</p>
            <h2>{recommendation.product.model}</h2>
            <p>{recommendation.product.shortDescription}</p>
            <ul className="pill-row">
              <li>{recommendation.product.powerKw} kW</li>
              <li>{recommendation.capability.maxThicknessMm} mm max {material}</li>
              <li>{recommendation.capability.assistGas}</li>
              <li>{automation}</li>
            </ul>
            <div className="interactive-actions">
              <a className="button-lite primary" href={`/products/${recommendation.product.slug}`}>
                Open matched PDP
              </a>
              <AddToQuoteButton product={recommendation.product} label="Add recommendation to cart" />
            </div>
          </div>
        ) : (
          <div className="selector-result">
            <p className="eyebrow">Engineering review required</p>
            <h2>No standard machine match</h2>
            <p>Request validation for this material and thickness. TitanLaser may recommend a special process plan or custom configuration.</p>
            <a className="button-lite primary" href="/request-quote">
              Request engineering review
            </a>
          </div>
        )}

        <div className="interactive-panel">
          <h2>Selection logic</h2>
          <div className="grid">
            <article className="interactive-card">
              <h3>Capability fit</h3>
              <p>The selector checks material and maximum thickness against structured product capability fields.</p>
            </article>
            <article className="interactive-card">
              <h3>Utilization fit</h3>
              <p>Monthly cutting hours influence whether a lower-power machine or high-power production configuration makes more sense.</p>
            </article>
            <article className="interactive-card">
              <h3>RFQ handoff</h3>
              <p>The recommended model can be pushed into the quote cart so sales and engineering receive structured context.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
