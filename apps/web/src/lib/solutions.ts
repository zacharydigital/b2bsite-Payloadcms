export type Solution = {
  slug: string;
  title: string;
  industry: string;
  heroAnswer: string;
  pains: string[];
  recommendedProductSlugs: string[];
  relatedTopicSlugs: string[];
  proofPoints: string[];
};

export const solutions: Solution[] = [
  {
    slug: "shipbuilding-heavy-plate-laser-cutting",
    title: "Fiber Laser Cutting for Shipbuilding and Heavy Plate Fabrication",
    industry: "Shipbuilding",
    heroAnswer:
      "Shipyards use high-power fiber laser cutting to reduce secondary grinding, improve edge consistency, and replace slower plasma workflows on reinforcement plates and structural components.",
    pains: [
      "Thick carbon steel plates need predictable edge quality before welding.",
      "Plasma cutting creates cleanup work that delays downstream fitting.",
      "Production teams need proof that 30mm carbon steel cutting is field validated."
    ],
    recommendedProductSlugs: ["tl-gigacut-30kw"],
    relatedTopicSlugs: ["factory-readiness-checklist-30kw", "cutting-speed-chart-metal-materials", "laser-cutting-quality-troubleshooting"],
    proofPoints: ["Vietnam shipyard 30mm carbon steel case", "30 kW process validation", "Oxygen assist gas strategy"]
  },
  {
    slug: "steel-service-center-laser-cutting",
    title: "Fiber Laser Cutting for Steel Service Centers",
    industry: "Steel service centers",
    heroAnswer:
      "Steel service centers need flexible laser power, fast material changeover, and clear cost-per-meter modeling across carbon steel, stainless steel, and aluminum jobs.",
    pains: [
      "Mixed customer orders make one-size machine selection risky.",
      "Quoting teams need cost per meter before committing delivery dates.",
      "Service centers need a machine range that supports both sheet and plate work."
    ],
    recommendedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: ["laser-power-selection-guide", "laser-cutting-roi-calculation", "assist-gas-cost-strategy"],
    proofPoints: ["12 kW and 30 kW model comparison", "Running cost calculator", "Structured material capability tables"]
  },
  {
    slug: "machinery-fabrication-laser-cutting",
    title: "Fiber Laser Cutting for Machinery Fabrication",
    industry: "Machinery fabrication",
    heroAnswer:
      "Machinery fabricators use fiber laser cutting to improve repeatability, reduce outsourced part cutting, and support mid-thickness production with stable accuracy.",
    pains: [
      "Nested parts must remain consistent across batches and shifts.",
      "Outsourced cutting creates lead-time uncertainty.",
      "Maintenance teams need practical service routines after installation."
    ],
    recommendedProductSlugs: ["tl-fc3015-12kw"],
    relatedTopicSlugs: ["maintenance-plan-laser-head", "repeat-positioning-accuracy", "fiber-vs-co2-laser"],
    proofPoints: ["Repeat positioning accuracy glossary", "Expert maintenance guidance", "Mid-thickness sheet production fit"]
  }
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
