import { useMemo, useState } from "react";
import AddToQuoteButton from "./AddToQuoteButton";

type Product = {
  slug: string;
  model: string;
  title: string;
  series: string;
  shortDescription: string;
  heroImage: string;
  powerKw: number;
  repeatPositioningAccuracy: string;
  complianceStandards: string[];
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

function maxCarbon(product: Product) {
  return Math.max(
    ...product.materialCapabilities
      .filter((item) => item.material.toLowerCase() === "carbon steel")
      .map((item) => item.maxThicknessMm),
    0
  );
}

export default function ProductListing({ products }: Props) {
  const [minPower, setMinPower] = useState(0);
  const [material, setMaterial] = useState("Any");
  const [minThickness, setMinThickness] = useState(0);
  const [application, setApplication] = useState("Any");
  const [needsCe, setNeedsCe] = useState(false);

  const applications = useMemo(() => ["Any", ...Array.from(new Set(products.flatMap((product) => product.recommendedFor)))], [products]);

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const materialMatch =
          material === "Any" ||
          product.materialCapabilities.some((item) => item.material === material && item.maxThicknessMm >= minThickness);
        const applicationMatch = application === "Any" || product.recommendedFor.includes(application);
        const ceMatch = !needsCe || product.complianceStandards.some((standard) => standard.toLowerCase().includes("ce"));
        return product.powerKw >= minPower && materialMatch && applicationMatch && ceMatch;
      }),
    [products, minPower, material, minThickness, application, needsCe]
  );

  return (
    <section className="interactive-grid" aria-label="Interactive product listing">
      <aside className="interactive-panel sticky">
        <h2>Filter machines</h2>
        <div className="control-stack">
          <label>
            Minimum power
            <select value={minPower} onChange={(event) => setMinPower(Number(event.target.value))}>
              <option value={0}>Any power</option>
              <option value={10}>10 kW+</option>
              <option value={20}>20 kW+</option>
              <option value={30}>30 kW+</option>
            </select>
          </label>
          <label>
            Material
            <select value={material} onChange={(event) => setMaterial(event.target.value)}>
              <option>Any</option>
              <option>Carbon steel</option>
              <option>Stainless steel</option>
              <option>Aluminum</option>
            </select>
          </label>
          <label>
            Required thickness (mm)
            <input type="number" min={0} max={80} value={minThickness} onChange={(event) => setMinThickness(Number(event.target.value))} />
          </label>
          <label>
            Application
            <select value={application} onChange={(event) => setApplication(event.target.value)}>
              {applications.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="checkbox-row">
            <input type="checkbox" checked={needsCe} onChange={(event) => setNeedsCe(event.target.checked)} />
            CE export documentation required
          </label>
          <button
            className="button-lite"
            type="button"
            onClick={() => {
              setMinPower(0);
              setMaterial("Any");
              setMinThickness(0);
              setApplication("Any");
              setNeedsCe(false);
            }}
          >
            Reset filters
          </button>
        </div>
      </aside>

      <div className="product-results">
        <div className="notice">{filtered.length} matched machine configuration{filtered.length === 1 ? "" : "s"}</div>
        {filtered.map((product) => (
          <article className="interactive-card" key={product.slug}>
            <img src={product.heroImage} alt={`${product.model} fiber laser cutting machine`} loading="lazy" />
            <p className="eyebrow">{product.series}</p>
            <h3>{product.model}</h3>
            <p>{product.shortDescription}</p>
            <ul className="pill-row">
              <li>{product.powerKw} kW</li>
              <li>{maxCarbon(product)} mm carbon steel</li>
              <li>{product.repeatPositioningAccuracy}</li>
              {product.complianceStandards.slice(0, 2).map((standard) => (
                <li key={standard}>{standard}</li>
              ))}
            </ul>
            <div className="interactive-actions">
              <a className="button-lite primary" href={`/products/${product.slug}`}>
                Open PDP
              </a>
              <AddToQuoteButton product={product} />
              <a className="button-lite" href="/compare/12kw-vs-30kw-fiber-laser">
                Compare
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
