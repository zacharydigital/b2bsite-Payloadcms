import { useState } from "react";
import { trackPdpEvent } from "./pdpTracking";

type MaterialCapability = {
  material: string;
  maxThicknessMm: number;
  recommendedThicknessMm: string;
  assistGas: string;
  cuttingSpeedMMin: number;
};

type TechnicalSpec = {
  name: string;
  value: string;
  unit?: string;
  condition?: string;
  sourceNote: string;
};

type Props = {
  productModel: string;
  materialCapabilities: MaterialCapability[];
  technicalSpecs: TechnicalSpec[];
};

export default function ExpandableSpecTable({ productModel, materialCapabilities, technicalSpecs }: Props) {
  const [expanded, setExpanded] = useState(false);
  const rows = [
    ...materialCapabilities.map((item) => ({
      parameter: `${item.material} maximum cutting thickness`,
      value: `${item.maxThicknessMm} mm`,
      note: `${item.assistGas} assist gas, recommended ${item.recommendedThicknessMm}, sample speed ${item.cuttingSpeedMMin} m/min`,
      highlight: item.material === "Carbon steel"
    })),
    ...technicalSpecs.map((spec) => ({
      parameter: spec.name,
      value: `${spec.value}${spec.unit ? ` ${spec.unit}` : ""}`,
      note: spec.condition || spec.sourceNote,
      highlight: spec.name.toLowerCase().includes("accuracy") || spec.name.toLowerCase().includes("thickness")
    }))
  ];
  const visibleRows = expanded ? rows : rows.slice(0, 8);

  return (
    <section className="pdp-specs" aria-label={`${productModel} specifications`}>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={`${row.parameter}-${row.value}`} className={row.highlight ? "highlight-row" : ""}>
                <td>{row.parameter}</td>
                <td>{row.value}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 8 && (
        <button
          type="button"
          className="button-lite"
          onClick={() => {
            const next = !expanded;
            setExpanded(next);
            if (next) trackPdpEvent("specs_expand", { productModel, rows: rows.length });
          }}
        >
          {expanded ? "Show fewer specs" : `Show all specs (${rows.length})`}
        </button>
      )}
    </section>
  );
}
