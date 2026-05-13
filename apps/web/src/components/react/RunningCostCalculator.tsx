import { useMemo, useState } from "react";

type ProductOption = {
  slug: string;
  model: string;
  title: string;
  powerKw: number;
  materialCapabilities: Array<{
    material: string;
    maxThicknessMm: number;
    assistGas: string;
    cuttingSpeedMMin: number;
  }>;
};

type Props = {
  products: ProductOption[];
};

const gasCostByType: Record<string, number> = {
  Nitrogen: 18,
  Oxygen: 5,
  "Compressed air": 2
};

export default function RunningCostCalculator({ products }: Props) {
  const [material, setMaterial] = useState("Carbon steel");
  const [thickness, setThickness] = useState(20);
  const [electricity, setElectricity] = useState(0.12);
  const [labor, setLabor] = useState(9);
  const [utilization, setUtilization] = useState(70);

  const recommendation = useMemo(() => {
    const capable = products
      .map((product) => {
        const capability = product.materialCapabilities.find(
          (item) => item.material === material && item.maxThicknessMm >= thickness
        );
        return capability ? { product, capability } : null;
      })
      .filter(Boolean) as Array<{ product: ProductOption; capability: ProductOption["materialCapabilities"][number] }>;

    return capable.sort((a, b) => a.product.powerKw - b.product.powerKw)[0] || null;
  }, [material, thickness, products]);

  const result = useMemo(() => {
    if (!recommendation) return null;
    const speed = Math.max(recommendation.capability.cuttingSpeedMMin, 0.2);
    const utilizationRate = Math.max(utilization, 10) / 100;
    const electricalPerHour = recommendation.product.powerKw * electricity * 1.25;
    const gasPerHour = gasCostByType[recommendation.capability.assistGas] || 8;
    const laborPerHour = labor / utilizationRate;
    const hourlyCost = electricalPerHour + gasPerHour + laborPerHour;
    return {
      speed,
      hourlyCost,
      costPerMeter: hourlyCost / (speed * 60),
      gas: recommendation.capability.assistGas
    };
  }, [recommendation, electricity, labor, utilization]);

  return (
    <section className="calculator-shell" aria-label="Running cost calculator">
      <div className="calculator-controls">
        <label>
          Material
          <select value={material} onChange={(event) => setMaterial(event.target.value)}>
            <option>Carbon steel</option>
            <option>Stainless steel</option>
            <option>Aluminum</option>
          </select>
        </label>
        <label>
          Thickness (mm)
          <input type="number" min="1" max="60" value={thickness} onChange={(event) => setThickness(Number(event.target.value))} />
        </label>
        <label>
          Electricity ($/kWh)
          <input step="0.01" type="number" min="0" value={electricity} onChange={(event) => setElectricity(Number(event.target.value))} />
        </label>
        <label>
          Labor ($/hour)
          <input step="1" type="number" min="0" value={labor} onChange={(event) => setLabor(Number(event.target.value))} />
        </label>
        <label>
          Utilization (%)
          <input type="range" min="20" max="95" value={utilization} onChange={(event) => setUtilization(Number(event.target.value))} />
          <span>{utilization}%</span>
        </label>
      </div>

      <div className="calculator-result">
        {recommendation && result ? (
          <>
            <p className="eyebrow">Recommended configuration</p>
            <h2>{recommendation.product.model}</h2>
            <dl>
              <div>
                <dt>Assist gas</dt>
                <dd>{result.gas}</dd>
              </div>
              <div>
                <dt>Reference speed</dt>
                <dd>{result.speed.toFixed(1)} m/min</dd>
              </div>
              <div>
                <dt>Estimated hourly cost</dt>
                <dd>${result.hourlyCost.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Estimated cost per meter</dt>
                <dd>${result.costPerMeter.toFixed(2)}</dd>
              </div>
            </dl>
            <a href={`/products/${recommendation.product.slug}`} className="button">
              View matched machine
            </a>
          </>
        ) : (
          <>
            <p className="eyebrow">No direct match</p>
            <h2>Application review required</h2>
            <p>Increase power range or request an engineering validation for this material and thickness.</p>
          </>
        )}
      </div>
    </section>
  );
}
