export type CatalogPage = {
  number: number;
  path: string;
  group: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  audience: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  highlights: string[];
  sections: {
    heading: string;
    body: string;
    items: string[];
  }[];
};

const images = {
  laserFactory:
    "https://images.unsplash.com/photo-1581091215367-59ab6b87a64c?auto=format&fit=crop&w=1800&q=82",
  cutting:
    "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=1800&q=82",
  logistics:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=82",
  engineer:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=82",
  inspection:
    "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1800&q=82",
  trade:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=82",
  warehouse:
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1800&q=82",
  conference:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=82",
  data:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=82",
  compliance:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82",
  team:
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=82"
};

const imageByGroup: Record<string, string> = {
  "Commercial conversion": images.trade,
  "Product and technical": images.cutting,
  "Solutions and services": images.laserFactory,
  "Trust and company": images.engineer,
  "Trade operations": images.logistics,
  "Content and demand generation": images.data,
  "Campaign landing pages": images.conference,
  "Portal and retention": images.warehouse,
  "Legal and compliance": images.compliance,
  "Utility and SEO": images.data,
  "Industry-specific modules": images.inspection
};

function page(input: Omit<CatalogPage, "primaryCta" | "secondaryCta" | "highlights" | "sections" | "image"> & {
  image?: string;
  highlights?: string[];
  sections?: CatalogPage["sections"];
  primaryCta?: CatalogPage["primaryCta"];
  secondaryCta?: CatalogPage["secondaryCta"];
}): CatalogPage {
  const highlights = input.highlights || [
    "Factory-direct engineering response within 24 hours",
    "Structured specs linked to product, case, and RFQ workflows",
    "Export buyer proof: CE, ISO workflow, packing, logistics, and service"
  ];
  return {
    ...input,
    image: input.image || imageByGroup[input.group] || images.laserFactory,
    primaryCta: input.primaryCta || { label: "Send RFQ", href: "/request-quote" },
    secondaryCta: input.secondaryCta || { label: "Compare models", href: "/compare/12kw-vs-30kw-fiber-laser" },
    highlights,
    sections:
      input.sections || [
        {
          heading: "Buyer intent handled on this page",
          body: `${input.title} is designed for export buyers who need clear technical fit, purchasing confidence, and a fast path to a qualified inquiry.`,
          items: [
            `Audience: ${input.audience}`,
            "Primary proof: structured machine data, field application evidence, and engineering ownership",
            "Conversion path: CTA to RFQ, quote cart, sample/demo request, or calculator depending on buyer stage"
          ]
        },
        {
          heading: "TitanLaser demo content blocks",
          body: "The page uses reusable content atoms so the same fact can appear consistently in product tables, application claims, internal links, and JSON-LD.",
          items: [
            "Product model references: TL-FC3015-12KW and TL-GigaCut-30KW",
            "Application evidence: Vietnam shipyard 30 mm carbon steel cutting case",
            "Trust modules: chief engineer attribution, certifications, factory capacity, and visible buyer FAQs"
          ]
        },
        {
          heading: "SEO, AEO, and GEO role",
          body: "The page is written as a semantic node in the knowledge graph instead of an isolated brochure page.",
          items: [
            "Direct answer section for answer engines",
            "Three-step anchor links into product, proof, and conversion pages",
            "Clear entity names, machine specs, countries, industries, standards, and buyer outcomes"
          ]
        }
      ]
  };
}

export const catalogPages: CatalogPage[] = [
  page({
    number: 4,
    path: "/quote-cart",
    group: "Commercial conversion",
    title: "Quote Cart for Multi-Model Laser RFQs",
    kicker: "RFQ cart",
    description:
      "Collect multiple laser models, materials, thickness ranges, spare parts, and service requests into one engineering quotation brief.",
    audience: "procurement teams comparing several high-power laser cutting configurations",
    image: images.cutting,
    highlights: ["Add 12 kW and 30 kW systems", "Bundle chiller, dust collector, and spare lens kits", "Send one consolidated RFQ"]
  }),
  page({
    number: 6,
    path: "/contact",
    group: "Commercial conversion",
    title: "Contact TitanLaser Global Sales and Engineering",
    kicker: "Contact us",
    description:
      "Reach TitanLaser export sales, application engineering, after-sales service, and distributor support for high-power fiber laser projects.",
    audience: "buyers needing a real human contact before RFQ",
    image: images.team,
    highlights: ["Asia, Middle East, Africa, and Europe time-zone support", "Engineering email routing", "WhatsApp and Teams-ready buyer workflow"]
  }),
  page({
    number: 7,
    path: "/thank-you",
    group: "Commercial conversion",
    title: "RFQ Confirmation and Next Steps",
    kicker: "Thank you",
    description:
      "A conversion confirmation page that tells buyers what TitanLaser will review and guides them to the calculator, case study, and datasheet center.",
    audience: "buyers after form submission",
    image: images.trade,
    primaryCta: { label: "Open calculator", href: "/tools/running-cost-calculator" },
    secondaryCta: { label: "Read shipyard case", href: "/case-studies/vietnam-shipyard-30mm-carbon-steel" }
  }),
  page({
    number: 9,
    path: "/request-sample",
    group: "Commercial conversion",
    title: "Request a Cut Sample",
    kicker: "Sample request",
    description:
      "Submit material grade, thickness, drawing file requirements, edge quality target, and delivery address for a TitanLaser cut-sample validation.",
    audience: "manufacturers requiring proof before equipment purchase",
    image: images.inspection,
    highlights: ["Sample card with material, gas, speed, and burr notes", "Optional video of the cutting process", "DHL-ready export sample workflow"]
  }),
  page({
    number: 10,
    path: "/book-demo",
    group: "Commercial conversion",
    title: "Book a Live Demo or Factory Tour",
    kicker: "Demo booking",
    description:
      "Schedule a remote cutting demo, factory tour, or application review session with TitanLaser engineers for thick-plate fiber laser projects.",
    audience: "equipment buyers and distributors evaluating factory capability",
    image: images.laserFactory,
    highlights: ["Live cutting demo", "Factory floor walkthrough", "Engineering Q&A for site readiness"]
  }),

  page({
    number: 11,
    path: "/product-lines",
    group: "Product and technical",
    title: "Fiber Laser Cutting Machine Product Line Overview",
    kicker: "Product line",
    description:
      "Compare TitanLaser compact, heavy-duty, and high-power fiber laser cutting machine lines by plate size, power range, automation, and buyer use case.",
    audience: "buyers choosing a machine family before a specific model",
    image: images.cutting
  }),
  page({
    number: 12,
    path: "/specifications",
    group: "Product and technical",
    title: "Fiber Laser Machine Specifications and Datasheet Table",
    kicker: "Specifications",
    description:
      "A structured specification hub for laser power, working area, positioning accuracy, assist gas, compliance, and material cutting capacity.",
    audience: "engineers and sourcing managers validating technical requirements",
    image: images.data
  }),
  page({
    number: 13,
    path: "/product-selector",
    group: "Product and technical",
    title: "Fiber Laser Product Configurator and Selector",
    kicker: "Product selector",
    description:
      "Select material, thickness, monthly volume, power supply, automation level, and target payback window to shortlist TitanLaser models.",
    audience: "buyers who know the job but not the exact model",
    image: images.cutting,
    primaryCta: { label: "Use cost calculator", href: "/tools/running-cost-calculator" }
  }),
  page({
    number: 14,
    path: "/cad-3d-models",
    group: "Product and technical",
    title: "CAD and 3D Model Download Center",
    kicker: "CAD library",
    description:
      "Download installation footprint drawings, loading diagrams, foundation plans, dust collector layouts, and machine enclosure references.",
    audience: "plant engineers planning floor layout and utility routing",
    image: images.data
  }),
  page({
    number: 15,
    path: "/datasheets",
    group: "Product and technical",
    title: "Technical Datasheet Downloads",
    kicker: "Datasheets",
    description:
      "Access model datasheets, cutting parameter references, assist gas charts, packing lists, and pre-installation requirement documents.",
    audience: "technical buyers building an internal approval file",
    image: images.data
  }),
  page({
    number: 16,
    path: "/msds-sds",
    group: "Product and technical",
    title: "SDS and Safety Documentation",
    kicker: "Safety documents",
    description:
      "Safety documentation for auxiliary fluids, lubricants, protective lens handling, nitrogen and oxygen gas use, and machine operation risk notices.",
    audience: "EHS managers and import compliance teams",
    image: images.compliance
  }),
  page({
    number: 17,
    path: "/certifications",
    group: "Product and technical",
    title: "CE, ISO, RoHS, and Export Certifications",
    kicker: "Certifications",
    description:
      "Review TitanLaser quality certificates, electrical safety documentation, export paperwork support, and compliance evidence for distributor due diligence.",
    audience: "importers, distributors, and large factory procurement teams",
    image: images.compliance
  }),
  page({
    number: 18,
    path: "/product-videos",
    group: "Product and technical",
    title: "Product Video Gallery",
    kicker: "Video proof",
    description:
      "Watch cutting demonstrations, operator walkthroughs, loading automation, edge quality close-ups, and factory acceptance test recordings.",
    audience: "buyers who need visual proof before scheduling a demo",
    image: images.cutting
  }),
  page({
    number: 19,
    path: "/product-360",
    group: "Product and technical",
    title: "360 Degree Machine Walkaround",
    kicker: "360 view",
    description:
      "Inspect the laser source cabinet, cutting bed, exchange table, control panel, beam path enclosure, and maintenance access points.",
    audience: "engineering teams checking serviceability and plant fit",
    image: images.laserFactory
  }),
  page({
    number: 20,
    path: "/compatibility",
    group: "Product and technical",
    title: "Machine Compatibility and Fitment Lookup",
    kicker: "Compatibility",
    description:
      "Check compatible laser sources, cutting heads, chillers, gas systems, nesting software, dust collectors, and automation accessories.",
    audience: "buyers integrating a TitanLaser machine into an existing plant",
    image: images.inspection
  }),
  page({
    number: 21,
    path: "/cross-reference",
    group: "Product and technical",
    title: "Cross-Reference and Alternative Model Lookup",
    kicker: "Cross-reference",
    description:
      "Compare TitanLaser models with plasma, CO2 laser, and competing fiber laser configurations by cut quality, energy cost, and maintenance profile.",
    audience: "buyers replacing old equipment or comparing vendor quotes",
    image: images.data
  }),

  page({
    number: 23,
    path: "/applications",
    group: "Solutions and services",
    title: "Fiber Laser Cutting Applications",
    kicker: "Applications",
    description:
      "Explore TitanLaser applications for shipbuilding, steel service centers, machinery fabrication, agricultural equipment, construction machinery, and metal furniture.",
    audience: "buyers searching by production scenario",
    image: images.cutting
  }),
  page({
    number: 24,
    path: "/by-role/procurement",
    group: "Solutions and services",
    title: "Fiber Laser Buying Guide for Procurement Teams",
    kicker: "By role",
    description:
      "A buyer-side workflow for collecting specs, comparing vendor claims, validating references, and preparing RFQ documents for laser cutting equipment.",
    audience: "procurement and sourcing departments",
    image: images.trade
  }),
  page({
    number: 25,
    path: "/markets/southeast-asia",
    group: "Solutions and services",
    title: "Southeast Asia Fiber Laser Market Hub",
    kicker: "Regional hub",
    description:
      "Region-specific content for Vietnam, Thailand, Malaysia, Indonesia, and the Philippines, including power supply, gas sourcing, training, and logistics notes.",
    audience: "Southeast Asian factories and distributors",
    image: images.logistics
  }),
  page({
    number: 26,
    path: "/oem-odm",
    group: "Solutions and services",
    title: "OEM and ODM Fiber Laser Manufacturing Services",
    kicker: "OEM / ODM",
    description:
      "Private specification, distributor branding, enclosure customization, documentation package, and regional accessory configuration for channel partners.",
    audience: "distributors and machine brand owners",
    image: images.laserFactory
  }),
  page({
    number: 27,
    path: "/customization",
    group: "Solutions and services",
    title: "Custom Fiber Laser Machine Configuration",
    kicker: "Customization",
    description:
      "Customize working area, exchange table, laser source brand, cutting head, automation, safety enclosure, color, documentation, and spare-part packages.",
    audience: "factories with site-specific requirements",
    image: images.inspection
  }),
  page({
    number: 28,
    path: "/custom-process",
    group: "Solutions and services",
    title: "Custom Machine Project Process",
    kicker: "Custom process",
    description:
      "A staged process covering requirement capture, engineering review, layout confirmation, production, factory acceptance testing, packing, installation, and training.",
    audience: "buyers managing custom equipment projects",
    image: images.engineer
  }),
  page({
    number: 29,
    path: "/private-label",
    group: "Solutions and services",
    title: "Private Label Machine Program",
    kicker: "Private label",
    description:
      "Distributor-focused private label support for machine appearance, documentation, spare parts, training material, and after-sales escalation workflows.",
    audience: "regional equipment distributors",
    image: images.trade
  }),
  page({
    number: 30,
    path: "/integrations",
    group: "Solutions and services",
    title: "Software, Automation, and Factory Integration",
    kicker: "Integrations",
    description:
      "Integration notes for nesting software, ERP job tickets, barcode workflows, loading/unloading automation, dust extraction, and plant MES reporting.",
    audience: "automation managers and digital factory teams",
    image: images.data
  }),

  page({
    number: 32,
    path: "/factory",
    group: "Trust and company",
    title: "TitanLaser Factory and Manufacturing Floor",
    kicker: "Factory tour",
    description:
      "View the assembly floor, laser calibration area, electric cabinet line, FAT bay, packing zone, and export loading workflow.",
    audience: "buyers doing factory due diligence",
    image: images.laserFactory
  }),
  page({
    number: 33,
    path: "/production-capacity",
    group: "Trust and company",
    title: "Production Capacity and Delivery Planning",
    kicker: "Capacity",
    description:
      "Monthly machine output, critical component stock, production slots, lead-time planning, and rush-order handling for export projects.",
    audience: "buyers comparing delivery risk",
    image: images.warehouse
  }),
  page({
    number: 34,
    path: "/quality-control",
    group: "Trust and company",
    title: "Quality Control and Factory Acceptance Testing",
    kicker: "QC",
    description:
      "TitanLaser QC covers incoming inspection, frame machining, beam calibration, electrical testing, cutting sample validation, and FAT documentation.",
    audience: "quality managers and distributor technical teams",
    image: images.inspection
  }),
  page({
    number: 35,
    path: "/rd-capabilities",
    group: "Trust and company",
    title: "R&D Capabilities and Application Lab",
    kicker: "R&D",
    description:
      "Meet the application engineering workflow behind cutting parameter validation, high-power stability testing, automation upgrades, and special material trials.",
    audience: "technical buyers checking supplier depth",
    image: images.engineer
  }),
  page({
    number: 36,
    path: "/milestones",
    group: "Trust and company",
    title: "Company Milestones",
    kicker: "Milestones",
    description:
      "A timeline of TitanLaser export projects, power upgrades, factory expansion, certification milestones, and regional distributor partnerships.",
    audience: "buyers validating business continuity",
    image: images.trade
  }),
  page({
    number: 37,
    path: "/awards-certifications",
    group: "Trust and company",
    title: "Awards and Certifications",
    kicker: "Awards",
    description:
      "A consolidated trust page for ISO workflow, CE documentation, RoHS component declarations, software certificates, patents, and customer awards.",
    audience: "large-account due diligence teams",
    image: images.compliance
  }),
  page({
    number: 38,
    path: "/patents-ip",
    group: "Trust and company",
    title: "Patents and Intellectual Property",
    kicker: "Patents",
    description:
      "TitanLaser IP evidence for machine frame stability, gas control optimization, automation safety, and cutting process parameter control.",
    audience: "buyers seeking technology confidence",
    image: images.engineer
  }),
  page({
    number: 39,
    path: "/case-studies",
    group: "Trust and company",
    title: "Customer Case Studies",
    kicker: "Case library",
    description:
      "Browse TitanLaser customer outcomes by country, industry, material, thickness, machine model, and measured production result.",
    audience: "buyers searching for proof in similar plants",
    image: images.cutting
  }),
  page({
    number: 41,
    path: "/testimonials",
    group: "Trust and company",
    title: "Customer Testimonials",
    kicker: "Testimonials",
    description:
      "Buyer feedback from shipyards, steel processors, machinery fabricators, and distributors with context on application, service, and measurable outcomes.",
    audience: "late-stage buyers needing confidence",
    image: images.team
  }),
  page({
    number: 42,
    path: "/trusted-by",
    group: "Trust and company",
    title: "Trusted by Export Buyers and Fabricators",
    kicker: "Client proof",
    description:
      "A logo-wall style page for regional distributors, shipbuilding suppliers, metal service centers, and machinery fabrication customers.",
    audience: "buyers looking for supplier credibility",
    image: images.trade
  }),
  page({
    number: 43,
    path: "/press",
    group: "Trust and company",
    title: "Press and Media Coverage",
    kicker: "Press",
    description:
      "Media mentions, exhibition coverage, distributor announcements, product launch releases, and industry association references.",
    audience: "buyers validating external recognition",
    image: images.conference
  }),
  page({
    number: 44,
    path: "/partners",
    group: "Trust and company",
    title: "Partners and Distributors",
    kicker: "Partners",
    description:
      "Regional service partners, distributor program details, spare-parts support, training access, and partner qualification requirements.",
    audience: "channel partners and export buyers needing local support",
    image: images.team
  }),
  page({
    number: 45,
    path: "/team",
    group: "Trust and company",
    title: "Leadership and Engineering Team",
    kicker: "Team",
    description:
      "Meet TitanLaser leadership, application engineers, service trainers, and export project managers responsible for buyer outcomes.",
    audience: "buyers assessing E-E-A-T signals",
    image: images.engineer
  }),

  ...[
    [46, "/trade-terms", "Trade Terms and Incoterms", "FOB, CIF, DAP, EXW, sea freight, insurance, and documentation guidance for fiber laser machine export projects."],
    [47, "/payment-methods", "Payment Methods", "T/T, L/C, Alibaba Trade Assurance-style escrow, staged milestone payments, and distributor account workflows."],
    [48, "/shipping-logistics", "Shipping and Logistics", "Container loading, wooden case packing, sea freight, air freight for spare parts, customs documents, and delivery lead times."],
    [49, "/moq", "MOQ and Order Quantity Policy", "Minimum order quantity guidance for machines, spare parts, sample cutting, accessories, and distributor stocking orders."],
    [50, "/packaging", "Export Packaging Solutions", "Moisture protection, shock control, container loading diagrams, spare-part labeling, and overseas receiving checklists."],
    [51, "/export-compliance", "Export Compliance and Customs Support", "Commercial invoice, packing list, certificate of origin, compliance documents, and buyer import coordination."],
    [52, "/after-sales-service", "After-Sales Service", "Remote diagnosis, installation guidance, operator training, spare parts dispatch, maintenance playbooks, and service escalation."],
    [53, "/warranty-policy", "Warranty Policy", "Warranty scope, covered components, buyer responsibilities, spare-part replacement workflow, and service documentation requirements."],
    [54, "/return-policy", "Return and Sample Policy", "Return handling for samples, accessories, documentation corrections, and exceptional equipment issue escalation."],
    [55, "/faq", "Frequently Asked Questions", "Buying, logistics, installation, power supply, assist gas, warranty, maintenance, and technical model selection FAQs."],
    [56, "/how-to-order", "How to Order a Fiber Laser Machine", "A step-by-step buying process from requirement review to RFQ, layout confirmation, deposit, FAT, shipment, and installation."]
  ].map(([number, path, title, description]) =>
    page({
      number: Number(number),
      path: String(path),
      group: "Trade operations",
      title: String(title),
      kicker: "Trade support",
      description: String(description),
      audience: "international buyers preparing purchasing, logistics, and service approval"
    })
  ),

  ...[
    [57, "/blog", "TitanLaser Blog and Resource Index", "A content hub for fiber laser technology, buying decisions, maintenance, application proof, and export buyer education."],
    [58, "/blog/fiber-laser-power-selection", "Blog: How to Select Fiber Laser Power", "A long-tail article for matching laser power with material, thickness, speed, gas cost, and payback goals."],
    [60, "/whitepaper", "Whitepaper: High-Power Laser Cutting Economics", "A gated whitepaper landing page for cost models, ROI worksheets, and process planning for high-power cutting."],
    [61, "/industry-report", "Industry Report: Metal Fabrication Laser Upgrade Trends", "A buyer education report on plasma replacement, gas cost pressure, labor scarcity, and automation demand."],
    [62, "/glossary", "Fiber Laser Glossary", "A glossary index explaining laser power, beam quality, kerf, assist gas, piercing, repeatability, and cutting speed."],
    [63, "/knowledge-base", "Knowledge Base and Learning Center", "A structured learning center that connects buyer questions, glossary terms, product specs, and application cases."],
    [64, "/video-hub", "Video Hub", "A central gallery for factory tours, product demos, case videos, maintenance training, and exhibition recordings."],
    [65, "/webinar", "Webinar: Fiber Laser Buying and ROI", "A webinar registration page for high-power laser selection, operating cost, installation readiness, and case-based Q&A."],
    [66, "/podcast", "Podcast: Industrial Cutting Notes", "Audio-format brand authority content covering fabrication trends, buyer interviews, maintenance tips, and application stories."],
    [67, "/news", "News and Announcements", "Company news, product launches, partner announcements, exhibition updates, certification news, and customer milestones."],
    [68, "/events", "Trade Shows and Events", "Exhibition pages for FABTECH-style events, Canton Fair meetings, distributor days, and factory open-house schedules."],
    [69, "/newsletter", "Newsletter Signup", "A lead nurturing page for buyers who want cutting charts, maintenance checklists, and product update alerts."],
    [70, "/competitor-comparison", "TitanLaser vs Traditional Cutting Alternatives", "A comparison page for fiber laser against plasma, oxy-fuel, CO2 laser, and outsourced cutting workflows."],
    [71, "/alternative-to-plasma-cutting", "Alternative to Plasma Cutting for Thick Plate", "A search-intent page for buyers evaluating high-power fiber laser as a plasma replacement."]
  ].map(([number, path, title, description]) =>
    page({
      number: Number(number),
      path: String(path),
      group: "Content and demand generation",
      title: String(title),
      kicker: "Resource hub",
      description: String(description),
      audience: "buyers in research, evaluation, and supplier shortlisting stages",
      primaryCta: { label: "Read pillar guide", href: "/guides/ultimate-guide-fiber-laser-cutting-metal-fabrication" }
    })
  ),

  ...[
    [72, "/lp/google-ads-high-power-laser", "Google Ads Landing Page: 30 kW Fiber Laser", "A focused PPC landing page for buyers searching high-power fiber laser cutter pricing, specs, and delivery."],
    [73, "/lp/linkedin-ads-factory-direct", "LinkedIn Ads Landing Page: Factory-Direct Laser Systems", "A visual lead-capture page for manufacturing executives, distributors, and procurement managers."],
    [74, "/lp/fabtech-2026", "Trade Show Landing Page: FABTECH 2026 Meetings", "A meeting-booking landing page for pre-show and post-show lead capture around live demos and sample cutting."],
    [75, "/lp/q3-promotion", "Quarterly Promotion Landing Page", "A time-bound landing page for bundled spare parts, installation support, and production-slot priority offers."],
    [76, "/lp/year-end-upgrade", "Year-End Manufacturing Upgrade Landing Page", "A seasonal capital equipment landing page for factories using remaining budget to upgrade cutting capacity."],
    [77, "/lp/retargeting-cutting-cost", "Retargeting Landing Page: Reduce Cutting Cost", "A second-visit page focused on operating cost, ROI calculator, comparison tables, and proof from similar factories."]
  ].map(([number, path, title, description]) =>
    page({
      number: Number(number),
      path: String(path),
      group: "Campaign landing pages",
      title: String(title),
      kicker: "Campaign page",
      description: String(description),
      audience: "paid traffic visitors with narrow commercial intent",
      primaryCta: { label: "Get campaign quote", href: "/request-quote" },
      secondaryCta: { label: "Book demo", href: "/book-demo" }
    })
  ),

  ...[
    [78, "/login", "Login and Register", "A portal entry for distributors and repeat buyers who need quote history, files, documentation, and account-specific support."],
    [79, "/customer-dashboard", "Customer Dashboard", "A demo customer center showing inquiry history, recommended downloads, open service tickets, and project notes."],
    [80, "/my-quotes", "My Quotes", "A buyer retention page for viewing quote requests, selected models, engineering comments, and next-step reminders."],
    [81, "/dealer-portal", "Dealer and Distributor Portal", "A channel portal concept for sales kits, local-language documents, pricing requests, spare parts, and training resources."],
    [82, "/download-center", "Download Center", "A central file library for datasheets, CAD drawings, installation guides, certificates, service manuals, and marketing kits."],
    [83, "/order-tracking", "Quote Approval and Order Tracking", "A large-account workflow page for approval status, payment milestones, FAT schedule, shipping, and installation preparation."]
  ].map(([number, path, title, description]) =>
    page({
      number: Number(number),
      path: String(path),
      group: "Portal and retention",
      title: String(title),
      kicker: "Buyer portal",
      description: String(description),
      audience: "repeat buyers, distributors, and account-managed customers",
      image: images.warehouse
    })
  ),

  page({
    number: 84,
    path: "/privacy-policy",
    group: "Legal and compliance",
    title: "Privacy Policy",
    kicker: "GDPR / CCPA privacy",
    description:
      "TitanLaser explains how export buyer inquiry data, RFQ files, sample requests, calculator inputs, CRM notes, and analytics data are collected, used, stored, and protected.",
    audience: "EU, UK, North American, and enterprise buyers reviewing personal-data handling before inquiry",
    image: images.compliance,
    secondaryCta: { label: "Contact data protection", href: "/contact" },
    highlights: ["RFQ and sample-request data scope", "GDPR/CCPA-style buyer rights", "CRM, analytics, and file-retention disclosure"],
    sections: [
      {
        heading: "What buyer data is collected",
        body: "The demo models the privacy disclosures a real export equipment supplier should provide before buyers submit technical or commercial information.",
        items: [
          "Contact identity: name, company, country, work email, phone or IM handle",
          "Project data: material, thickness, drawings, target capacity, installation country, and RFQ notes",
          "Website data: page visits, calculator inputs, form events, download requests, device information, and consent preferences"
        ]
      },
      {
        heading: "How TitanLaser uses the data",
        body: "Data is used for legitimate B2B inquiry handling, application engineering review, quotation, logistics planning, and after-sales support.",
        items: [
          "Prepare model recommendations, cut-sample plans, and quotation documents",
          "Route inquiries to export sales, application engineers, service teams, or distributors",
          "Improve content, conversion paths, and technical documentation using aggregated analytics"
        ]
      },
      {
        heading: "Buyer rights and retention",
        body: "A production site should provide a clear privacy contact and operational workflow for access, correction, deletion, consent withdrawal, and data-export requests.",
        items: [
          "Buyers may request access, correction, deletion, restriction, portability, or objection where applicable",
          "RFQ files and commercial records are retained only for documented sales, warranty, compliance, and service purposes",
          "Sensitive drawings and plant data should be handled under NDA when requested by the buyer"
        ]
      }
    ]
  }),
  page({
    number: 85,
    path: "/cookie-policy",
    group: "Legal and compliance",
    title: "Cookie Policy and Consent Center",
    kicker: "Cookie consent",
    description:
      "A consent-focused page for essential cookies, analytics, advertising pixels, language preferences, region settings, and buyer download attribution.",
    audience: "EU buyers and visitors who need clear cookie categories and consent controls",
    image: images.compliance,
    secondaryCta: { label: "Open privacy policy", href: "/privacy-policy" },
    highlights: ["Essential, analytics, marketing, and preference categories", "Consent withdrawal workflow", "EU-market transparency"],
    sections: [
      {
        heading: "Cookie categories",
        body: "The page separates cookies by business purpose so buyers can understand what is required and what is optional.",
        items: [
          "Essential: session routing, CSRF protection, RFQ form continuity, and consent record storage",
          "Preferences: language, country, currency, unit system, and recently viewed products",
          "Analytics and marketing: aggregated site performance, campaign attribution, remarketing audiences, and conversion measurement"
        ]
      },
      {
        heading: "Consent behavior",
        body: "For production, the banner should block non-essential scripts until the visitor grants consent and should preserve consent history.",
        items: [
          "Accept all, reject non-essential, and customize by category",
          "Consent timestamp, consent version, and browser identifier stored for compliance evidence",
          "A persistent footer link should reopen the consent center at any time"
        ]
      },
      {
        heading: "B2B analytics use",
        body: "Analytics should help improve buyer journeys without exposing confidential project data.",
        items: [
          "Track aggregate page performance, RFQ funnel drop-off, and download demand",
          "Do not send uploaded drawings or detailed project notes to advertising platforms",
          "Respect DNT/GPC signals where required by target market policy"
        ]
      }
    ]
  }),
  page({
    number: 86,
    path: "/terms-of-service",
    group: "Legal and compliance",
    title: "Terms of Service",
    kicker: "Business terms",
    description:
      "Service terms for RFQ communication, sample cutting, demo booking, document access, quote preparation, and buyer-supplier communication on TitanLaser.",
    audience: "buyers using interactive RFQ, sample, demo, download, and portal workflows",
    image: images.compliance,
    secondaryCta: { label: "Request clarification", href: "/contact" },
    highlights: ["RFQ and demo workflow terms", "No online-purchase assumption", "Document and sample limitations"],
    sections: [
      {
        heading: "Scope of service",
        body: "TitanLaser is modeled as a B2B inquiry and engineering review site, not an e-commerce checkout for capital equipment.",
        items: [
          "RFQ forms initiate a review; they do not create a binding purchase order",
          "Quotes become valid only when issued in a signed or confirmed commercial document",
          "Demo bookings and sample requests are subject to engineering capacity and material availability"
        ]
      },
      {
        heading: "Buyer responsibilities",
        body: "The buyer is responsible for providing accurate technical, commercial, and site information.",
        items: [
          "Confirm material grade, thickness, local voltage, gas availability, installation constraints, and target output",
          "Verify import restrictions, customs requirements, local safety rules, and operator qualifications",
          "Review final technical drawings, pro forma invoices, and contract terms before payment"
        ]
      },
      {
        heading: "Limitations",
        body: "Website content supports technical evaluation but does not replace project-specific engineering confirmation.",
        items: [
          "Published specs, charts, and calculators are indicative until confirmed for the buyer's material and site",
          "Lead time, freight, and availability can change according to production schedule and logistics market conditions",
          "Warranty and service obligations are governed by the final sales contract"
        ]
      }
    ]
  }),
  page({
    number: 87,
    path: "/terms-of-use",
    group: "Legal and compliance",
    title: "Website Terms of Use",
    kicker: "Site use",
    description:
      "Usage rules for TitanLaser website content, technical articles, downloads, images, calculators, comparison tables, and demo portal pages.",
    audience: "visitors, distributors, content users, and buyers downloading technical material",
    image: images.compliance,
    secondaryCta: { label: "View download center", href: "/download-center" },
    highlights: ["Technical content usage", "Download and copyright terms", "No misuse of calculator or portal demo"],
    sections: [
      {
        heading: "Permitted use",
        body: "Buyers and distributors may use the site to evaluate TitanLaser products, prepare RFQs, and share internal procurement documents.",
        items: [
          "Use product data, guides, and datasheets for internal technical evaluation",
          "Share links with colleagues, distributors, and purchasing committees",
          "Request permission before republishing charts, photos, or guide content externally"
        ]
      },
      {
        heading: "Restricted use",
        body: "The site should not be scraped, copied, or misrepresented as another supplier's technical material.",
        items: [
          "Do not remove brand context from images, diagrams, certificates, or comparison tables",
          "Do not upload harmful files or use forms for spam, fraud, or competitor impersonation",
          "Do not rely on demo portal pages as real account, pricing, or order records"
        ]
      },
      {
        heading: "Technical information disclaimer",
        body: "Technical content is structured for SEO/AEO/GEO clarity, but production decisions still require engineering confirmation.",
        items: [
          "Cutting performance depends on material grade, gas purity, maintenance, operator setup, and environment",
          "Published pages may be updated as models, standards, or documentation packages change",
          "Errors can be reported through the contact page for review by the content owner"
        ]
      }
    ]
  }),
  page({
    number: 88,
    path: "/anti-bribery-compliance",
    group: "Legal and compliance",
    title: "Anti-Bribery and Compliance Statement",
    kicker: "Ethics and compliance",
    description:
      "TitanLaser sets expectations for anti-bribery, gifts and hospitality, distributor conduct, sanctioned-party screening, conflict reporting, and export business ethics.",
    audience: "large buyers, procurement auditors, distributors, and compliance teams",
    image: images.compliance,
    secondaryCta: { label: "Contact compliance", href: "/contact" },
    highlights: ["Zero-tolerance bribery policy", "Distributor conduct requirements", "Escalation and reporting route"],
    sections: [
      {
        heading: "Policy commitments",
        body: "A serious export supplier should make its commercial ethics visible before large buyers begin due diligence.",
        items: [
          "No bribery, kickbacks, facilitation payments, or improper benefits to win or retain business",
          "Gifts and hospitality must be modest, transparent, lawful, and never tied to purchasing decisions",
          "Conflicts of interest must be disclosed before quotation, tender, or distributor appointment"
        ]
      },
      {
        heading: "Export and distributor controls",
        body: "The policy also applies to representatives, service partners, and distributor channels.",
        items: [
          "Screen counterparties where sanctions, restricted-party, or high-risk market concerns apply",
          "Require distributors to follow lawful tender, import, tax, and anti-corruption practices",
          "Document unusual payment routes, third-party commission requests, or pressure to bypass controls"
        ]
      },
      {
        heading: "Reporting and response",
        body: "A production compliance page should provide a clear reporting channel and response procedure.",
        items: [
          "Reports can be sent to the compliance contact listed on the contact page",
          "Credible concerns are reviewed by management with confidentiality protection where possible",
          "Confirmed violations can result in quote cancellation, distributor termination, or legal escalation"
        ]
      }
    ]
  }),
  page({
    number: 89,
    path: "/sustainability",
    group: "Legal and compliance",
    title: "ESG and Sustainability",
    kicker: "Sustainability",
    description:
      "TitanLaser describes energy-efficiency design, responsible packaging, waste reduction, service-life extension, supplier review, and buyer-facing ESG documentation.",
    audience: "European and North American buyers with ESG supplier-screening requirements",
    image: images.laserFactory,
    secondaryCta: { label: "View supply chain due diligence", href: "/supply-chain-due-diligence" },
    highlights: ["Energy-efficiency positioning", "Reusable packaging and documentation", "Supplier-screening narrative"],
    sections: [
      {
        heading: "Product-level sustainability",
        body: "Fiber laser cutting can help buyers reduce secondary processing, scrap, and energy intensity when correctly matched to the job.",
        items: [
          "Higher cut accuracy can reduce rework, grinding, and rejected parts",
          "Correct power selection avoids oversizing and unnecessary electricity consumption",
          "Preventive maintenance extends service life for laser source, optics, motion system, and auxiliary equipment"
        ]
      },
      {
        heading: "Factory and packaging practices",
        body: "The demo models the ESG disclosures buyers often expect from machinery exporters.",
        items: [
          "Wooden packaging specification, moisture protection, and reusable crate guidance",
          "Waste segregation for metal, packaging, electronic components, and consumable materials",
          "Digital documentation to reduce repeated paper packs where import rules allow"
        ]
      },
      {
        heading: "Buyer documentation",
        body: "ESG pages should support buyer questionnaires and supplier onboarding.",
        items: [
          "Energy-saving claims should link back to real machine specs and operating assumptions",
          "Compliance documents should be maintained in the download center",
          "Annual improvement notes can be added as the supplier matures"
        ]
      }
    ]
  }),
  page({
    number: 90,
    path: "/supply-chain-due-diligence",
    group: "Legal and compliance",
    title: "Supply Chain Due Diligence",
    kicker: "Supplier due diligence",
    description:
      "A buyer-facing due diligence page covering supplier qualification, component traceability, high-risk material review, audit support, and documentation controls.",
    audience: "industrial buyers, electronics-style procurement teams, and enterprise compliance reviewers",
    image: images.inspection,
    secondaryCta: { label: "Request audit documents", href: "/contact" },
    highlights: ["Component traceability", "Supplier qualification", "Audit-ready records"],
    sections: [
      {
        heading: "Critical supplier controls",
        body: "High-power laser machines depend on controlled sourcing for laser sources, cutting heads, servo systems, controllers, chillers, and safety components.",
        items: [
          "Approved supplier list with component category, quality record, and substitution rules",
          "Incoming inspection for critical mechanical, electrical, optical, and safety parts",
          "Change-control procedure when a component brand or specification is updated"
        ]
      },
      {
        heading: "Traceability records",
        body: "Traceability matters for warranty, service, customs, and enterprise supplier audits.",
        items: [
          "Machine serial number linked to key component records and FAT documents",
          "Packing photos, shipping marks, certificate files, and service spare-part batches retained by project",
          "Buyer-specific document pack available under NDA or contract requirements"
        ]
      },
      {
        heading: "Audit and risk response",
        body: "The page explains how buyers can initiate deeper review before order placement.",
        items: [
          "Remote factory audit, live video tour, and document review before deposit",
          "Corrective-action tracking for nonconformities found during buyer review",
          "Escalation route for restricted-party, forced-labor, sanctions, or origin concerns"
        ]
      }
    ]
  }),
  page({
    number: 91,
    path: "/accessibility",
    group: "Legal and compliance",
    title: "Accessibility Statement",
    kicker: "Accessibility",
    description:
      "TitanLaser states accessibility goals for keyboard navigation, readable contrast, alternative text, form labeling, responsive layouts, and feedback handling.",
    audience: "North American and European buyers, public-sector procurement reviewers, and users requiring accessible site paths",
    image: images.team,
    secondaryCta: { label: "Report accessibility issue", href: "/contact" },
    highlights: ["Keyboard and screen-reader goals", "Accessible RFQ forms", "Feedback and remediation process"],
    sections: [
      {
        heading: "Accessibility goals",
        body: "The demo is structured so important buyer paths remain usable across desktop, mobile, keyboard navigation, and assistive technologies.",
        items: [
          "Clear headings, semantic sections, visible focus states, readable contrast, and descriptive link labels",
          "Alt text for product, factory, case, and engineering imagery",
          "Form labels for RFQ, search, contact, sample, and demo request workflows"
        ]
      },
      {
        heading: "Known limitations",
        body: "Some production integrations should be audited again when they are connected.",
        items: [
          "Third-party widgets such as maps, review badges, video embeds, and cookie banners require separate accessibility checks",
          "Generated PDF, CAD, and datasheet files need document-level accessibility review",
          "Portal pages require keyboard and screen-reader testing after authentication is implemented"
        ]
      },
      {
        heading: "Feedback process",
        body: "A public accessibility statement should give users a practical way to report barriers.",
        items: [
          "Report the URL, device, browser, assistive technology, and issue description through the contact page",
          "Critical RFQ access issues should be routed to sales support within one business day",
          "Accessibility improvements should be tracked with release notes and owner assignment"
        ]
      }
    ]
  }),

  ...[
    [92, "/search-results", "Search Results", "A static demo search-results page for product, application, document, and case-study discovery."],
  ].map(([number, path, title, description]) =>
    page({
      number: Number(number),
      path: String(path),
      group: "Utility and SEO",
      title: String(title),
      kicker: "Utility",
      description: String(description),
      audience: "site users and crawlers requiring discovery, routing, or fallback information",
      image: images.data
    })
  ),
  page({
    number: 97,
    path: "/hreflang-hub",
    group: "Utility and SEO",
    title: "Language and Hreflang Hub",
    kicker: "Multilingual SEO",
    description:
      "A multilingual routing hub for export buyers, showing English, Spanish, German, and Portuguese market paths with hreflang logic.",
    audience: "international buyers and SEO crawlers requiring localized discovery",
    image: images.data,
    primaryCta: { label: "Open Southeast Asia hub", href: "/markets/southeast-asia" },
    secondaryCta: { label: "Switch region", href: "/region-currency" },
    highlights: ["Language-market routing", "Hreflang and canonical strategy", "Localized RFQ handoff"],
    sections: [
      {
        heading: "Language routing model",
        body: "The hub demonstrates how a real export site should separate language from market assumptions.",
        items: [
          "English global: /en/ for default international buyers",
          "Spanish LATAM/Spain: /es/ with distributor routing and localized units",
          "German DACH/EU: /de/ with compliance, privacy, and technical documentation emphasis",
          "Portuguese Brazil/Portugal: /pt/ with regional inquiry routing and localized RFQ context"
        ]
      },
      {
        heading: "Hreflang implementation rules",
        body: "A production build should generate reciprocal hreflang tags from CMS locale and market fields, not manually typed page by page.",
        items: [
          "Each localized URL must point back to all alternate language versions plus x-default",
          "Canonical stays on the same-language URL unless pages are duplicate placeholders",
          "Language pages should localize examples, compliance notes, contact routing, and units rather than using raw machine translation"
        ]
      },
      {
        heading: "Localized conversion handoff",
        body: "Language switching should preserve buyer intent and route the inquiry to the correct sales workflow.",
        items: [
          "Carry selected product, calculator assumptions, and RFQ context across language switch",
          "Show local service partner, spare-part lead time, and import documentation notes where available",
          "Fallback to English engineering support if the local-language page is not yet published"
        ]
      }
    ]
  }),
  page({
    number: 98,
    path: "/region-currency",
    group: "Utility and SEO",
    title: "Region and Currency Switcher",
    kicker: "Market preference",
    description:
      "A market preference page for country, currency, units, shipping assumptions, voltage, gas availability, and regional sales handoff.",
    audience: "buyers from different export markets comparing cost, logistics, and service assumptions",
    image: images.logistics,
    primaryCta: { label: "Request regional quote", href: "/request-quote" },
    secondaryCta: { label: "Open shipping guide", href: "/shipping-logistics" },
    highlights: ["Country and currency preference", "Metric/imperial and voltage assumptions", "Regional sales routing"],
    sections: [
      {
        heading: "Region settings",
        body: "For equipment buyers, region switching is more than currency. It affects voltage, gas sourcing, shipping, documentation, service, and installation planning.",
        items: [
          "Country/market: global, Southeast Asia, Middle East, Africa, Europe, North America, LATAM",
          "Currency display: USD default, EUR estimate, AED/SAR regional reference, local currency notes where supported",
          "Units: metric by default, imperial conversion for North American buyer review"
        ]
      },
      {
        heading: "Engineering assumptions by market",
        body: "A real region switcher should preserve commercial clarity without pretending to provide final landed cost.",
        items: [
          "Voltage and frequency notes: 380V/50Hz, 400V/50Hz, 480V/60Hz, or custom transformer review",
          "Gas supply prompts: oxygen, nitrogen, purity, compressor, storage, and local cost",
          "Shipping assumptions: FOB Shanghai/Ningbo baseline, CIF/DAP estimates only after destination confirmation"
        ]
      },
      {
        heading: "CRM and SEO behavior",
        body: "The selected region should inform form routing and localized content recommendations.",
        items: [
          "Route RFQs by country, language, distributor coverage, and service availability",
          "Recommend country hub, local case studies, trade terms, and certification pages",
          "Avoid auto-redirecting crawlers in a way that hides canonical global pages"
        ]
      }
    ]
  }),
  page({
    number: 99,
    path: "/maintenance",
    group: "Utility and SEO",
    title: "Maintenance Page",
    kicker: "Deployment fallback",
    description:
      "A planned-maintenance fallback page that preserves critical buyer actions, RFQ contact paths, documentation access, and crawler-safe status messaging.",
    audience: "buyers, distributors, and crawlers during deployment or temporary service interruption",
    image: images.inspection,
    primaryCta: { label: "Send urgent RFQ", href: "/request-quote" },
    secondaryCta: { label: "Contact support", href: "/contact" },
    highlights: ["Critical buyer paths remain available", "Clear expected recovery message", "Noindex/temporary status recommendation"],
    sections: [
      {
        heading: "Buyer-facing fallback content",
        body: "A maintenance page should protect conversion during deployment and avoid leaving buyers at a dead end.",
        items: [
          "Show sales email, WhatsApp/IM note, emergency service route, and RFQ link",
          "Link to cached PDFs or essential datasheets when the CMS is unavailable",
          "State planned maintenance window and expected recovery time in UTC plus buyer-relevant region time"
        ]
      },
      {
        heading: "SEO handling",
        body: "Maintenance should be temporary and crawler-safe.",
        items: [
          "Use a 503 status with Retry-After for real temporary downtime, not a permanent 200 maintenance landing page",
          "Do not include the maintenance URL in XML sitemap for production indexing",
          "Keep canonical and noindex logic clear if the page is exposed during deployment"
        ]
      },
      {
        heading: "Operations checklist",
        body: "The page defines what internal teams need before a release window.",
        items: [
          "Confirm CMS, web build, sitemap, robots, forms, analytics, and image assets after deployment",
          "Run smoke tests for homepage, PDP, RFQ, calculator, contact, and sitemap",
          "Keep rollback contact and build artifact reference available to the engineering owner"
        ]
      }
    ]
  }),

  ...[
    [100, "/equipment-demo-videos", "Equipment Demo Videos", "Machinery-specific demo videos for cutting, loading, unloading, calibration, maintenance, and FAT recordings."],
    [101, "/installation-service", "Installation Service", "Export installation workflow, remote commissioning, local service partner support, and operator training plan."],
    [102, "/spare-parts", "Spare Parts Lookup", "Lens, nozzle, ceramic ring, protective glass, belts, sensors, filters, and recommended maintenance stock list."],
    [103, "/used-equipment", "Used Equipment and Trade-In", "A demo page for refurbished units, trade-in evaluation, upgrade paths, and risk-controlled second-hand buying."],
    [104, "/equipment-rental", "Equipment Rental and Trial Program", "Rental and trial concepts for regional distributors, training centers, or short-term production surge scenarios."],
    [105, "/tds", "TDS Technical Data Sheet Pattern", "A chemistry/materials-style technical data sheet example adapted to laser process parameters and auxiliary consumables."],
    [106, "/batch-traceability", "Batch Traceability", "Traceability concept for spare parts, sample plates, certificates, packing photos, and service replacements."],
    [107, "/api-docs", "API Documentation", "A SaaS-style integration page for pushing RFQ, calculator, quote, and download events into CRM or distributor portals."],
    [108, "/status", "Status Page", "A SaaS-style status page for website, download center, RFQ email routing, and portal availability."],
    [109, "/pricing", "Pricing Plans", "A B2B service-style pricing page for service packages, extended warranty, training, and distributor enablement tiers."]
  ].map(([number, path, title, description]) =>
    page({
      number: Number(number),
      path: String(path),
      group: "Industry-specific modules",
      title: String(title),
      kicker: "Industry module",
      description: String(description),
      audience: "target customers comparing industry-specific B2B website depth",
      image: images.inspection
    })
  )
];

export const catalogGroups = [...new Set(catalogPages.map((item) => item.group))];

export function getCatalogPage(pathname: string): CatalogPage | undefined {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return catalogPages.find((page) => page.path === normalized);
}
