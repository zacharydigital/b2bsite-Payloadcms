export type PublishStatus = "draft" | "published";
export type ContentPageType = "pillar" | "cluster" | "glossary" | "claimReview";

export type TechnicalSpecSeed = {
  slug: string;
  name: string;
  category: string;
  value: string;
  unit?: string;
  minValue?: number;
  maxValue?: number;
  material?: string;
  condition?: string;
  sourceNote: string;
  status: PublishStatus;
};

export type ProductSeed = {
  slug: string;
  model: string;
  series: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  powerKw: number;
  positioningAccuracy: string;
  repeatPositioningAccuracy: string;
  servoMotorBrand: string;
  assistGasTypes: string[];
  complianceStandards: string[];
  applicationLimits: string[];
  recommendedFor: string[];
  galleryMedia: Array<{
    type: "image" | "video" | "360";
    url: string;
    alt: string;
    caption: string;
    priority?: boolean;
  }>;
  commercialTerms: {
    moq: string;
    leadTime: string;
    payment: string;
    sample: string;
    packaging: string;
    exportMarkets: string;
  };
  featureAdvantages: Array<{
    title: string;
    feature: string;
    advantage: string;
    benefit: string;
    evidence: string;
    image: string;
    reportLink?: string;
  }>;
  applications: Array<{
    name: string;
    summary: string;
    image: string;
    linkedSolutionPath: string;
  }>;
  certifications: Array<{
    name: string;
    level: "product" | "factory";
    issuer: string;
    certificateNo: string;
    validUntil: string;
    image: string;
    requestable: boolean;
  }>;
  manufacturingQc: {
    processSteps: Array<{ step: string; detail: string }>;
    capacityText: string;
    factoryImages: Array<{ url: string; alt: string; caption: string }>;
    walkthroughVideo?: string;
  };
  downloads: Array<{
    title: string;
    type: "datasheet" | "catalog" | "installationGuide" | "compliancePack";
    pages: number;
    fileLabel: string;
    gateRequired: boolean;
  }>;
  inquiryDefaults: {
    replySla: string;
    privacyPromise: string;
    ndaAvailable: boolean;
    whatsappUrl: string;
    socialProofText: string;
  };
  relatedProductSlugs: string[];
  trackingMeta: {
    category: string;
    primaryApplication: string;
    conversionGoal: string;
  };
  materialCapabilities: Array<{
    material: string;
    maxThicknessMm: number;
    recommendedThicknessMm: string;
    assistGas: string;
    cuttingSpeedMMin: number;
  }>;
  specSlugs: string[];
  expertSlug: string;
  faqSlugs: string[];
  status: PublishStatus;
};

export type ExpertSeed = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  credentials: string[];
  socialLinks: Array<{ label: string; url: string }>;
  projectHighlights: string[];
  status: PublishStatus;
};

export type CaseStudySeed = {
  slug: string;
  title: string;
  customerIndustry: string;
  country: string;
  painPoint: string;
  productSlug: string;
  expertSlug: string;
  heroImage: string;
  fieldMedia: Array<{ type: "image" | "video"; url: string; caption: string; capturedAt: string; location: string }>;
  measuredResults: Array<{ metric: string; value: string; context: string }>;
  summary: string;
  status: PublishStatus;
};

export type FaqSeed = {
  slug: string;
  question: string;
  answer: string;
  relatedProductSlug?: string;
  relatedCaseSlug?: string;
  status: PublishStatus;
};

export type ContentPageSeed = {
  slug: string;
  type: ContentPageType;
  title: string;
  seoSummary: string;
  heroAnswer: string;
  bodyBlocks: Array<{ heading: string; content: string }>;
  relatedProductSlugs: string[];
  relatedTopicSlugs: string[];
  expertSlug?: string;
  faqSlugs: string[];
  claim?: {
    claimText: string;
    verdict: string;
    reviewedBy: string;
  };
  status: PublishStatus;
  lastReviewedAt: string;
  nextReviewAt: string;
  reviewStatus: "fresh" | "review-soon" | "stale";
  contentOwner: string;
};

export const siteSettingsSeed = {
  brandName: "TitanLaser",
  legalName: "TitanLaser Intelligent Equipment Co., Ltd.",
  tagline: "High-power fiber laser cutting systems for metal fabrication exporters.",
  siteUrl: "http://localhost:4321",
  logoUrl: "https://images.unsplash.com/photo-1581091215367-59ab6b3851fe?auto=format&fit=crop&w=512&q=80",
  email: "sales@titanlaser.example",
  phone: "+86-755-5555-3015",
  address: {
    streetAddress: "88 Intelligent Manufacturing Avenue",
    addressLocality: "Shenzhen",
    addressRegion: "Guangdong",
    postalCode: "518000",
    addressCountry: "CN"
  },
  sameAs: ["https://www.linkedin.com/company/titanlaser-example"]
};

export const technicalSpecsSeed: TechnicalSpecSeed[] = [
  {
    slug: "max-carbon-steel-thickness-30kw",
    name: "Maximum carbon steel cutting thickness",
    category: "Cutting capacity",
    value: "30",
    unit: "mm",
    minValue: 1,
    maxValue: 30,
    material: "Carbon steel",
    condition: "Oxygen assist gas, factory-tuned process database",
    sourceNote: "Validated in TitanLaser application lab and Vietnam shipyard field run.",
    status: "published"
  },
  {
    slug: "repeat-positioning-accuracy",
    name: "Repeat positioning accuracy",
    category: "Motion system",
    value: "±0.02",
    unit: "mm",
    sourceNote: "Measured on dual-drive gantry platform after calibration.",
    status: "published"
  },
  {
    slug: "laser-power-range",
    name: "Fiber laser power range",
    category: "Laser source",
    value: "1-30",
    unit: "kW",
    minValue: 1,
    maxValue: 30,
    sourceNote: "Available power configurations for export product line.",
    status: "published"
  }
];

export const expertsSeed: ExpertSeed[] = [
  {
    slug: "zhao-ming",
    name: "Mr. Ming Zhao",
    role: "Chief Laser Application Engineer",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=80",
    bio: "Mr. Zhao leads TitanLaser process validation for shipbuilding, heavy machinery, and service-center customers. His work focuses on matching laser power, gas strategy, and motion control to real production constraints.",
    credentials: [
      "12 years in high-power fiber laser process engineering",
      "Led 80+ overseas commissioning projects",
      "Specialist in 20-30 kW carbon steel and stainless steel cutting"
    ],
    socialLinks: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/ming-zhao-titanlaser-example" },
      { label: "GitHub", url: "https://github.com/titanlaser-lab" }
    ],
    projectHighlights: [
      "Vietnam shipyard 30mm carbon steel validation",
      "Saudi structural steel service center nesting optimization",
      "Mexico appliance factory stainless steel cost reduction"
    ],
    status: "published"
  }
];

const pdpImages = {
  factory: "https://images.unsplash.com/photo-1581091215367-59ab6b87a64c?auto=format&fit=crop&w=1400&q=80",
  cutting: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=1400&q=80",
  inspection: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1400&q=80",
  packing: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
  engineer: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
  certificate: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80"
};

const commonCommercialTerms = {
  moq: "1 set",
  leadTime: "35-55 days after deposit",
  payment: "T/T, L/C, staged milestone payment",
  sample: "Cut sample available, cost deductible from confirmed order",
  packaging: "Export wooden case, anti-rust wrap, shock indicators",
  exportMarkets: "60+ countries, FOB/CIF/DAP support"
};

const commonInquiryDefaults = {
  replySla: "Reply within 12 business hours",
  privacyPromise: "No newsletters. No reselling. No calls unless requested.",
  ndaAvailable: true,
  whatsappUrl: "https://wa.me/8613800003015",
  socialProofText: "Trusted by 2,000+ importers, distributors, and metal fabrication teams"
};

const commonCertifications = [
  {
    name: "CE Machinery Safety Declaration",
    level: "product" as const,
    issuer: "TUV-style notified body demo record",
    certificateNo: "TL-CE-2026-3015",
    validUntil: "2028-12-31",
    image: pdpImages.certificate,
    requestable: true
  },
  {
    name: "ISO 9001 Quality Management",
    level: "factory" as const,
    issuer: "Demo certification body",
    certificateNo: "TL-ISO-2026-QMS",
    validUntil: "2029-03-30",
    image: pdpImages.certificate,
    requestable: true
  },
  {
    name: "IEC 60825-1 Laser Safety Review",
    level: "product" as const,
    issuer: "TitanLaser compliance lab",
    certificateNo: "TL-LSR-2026-08",
    validUntil: "2028-08-31",
    image: pdpImages.certificate,
    requestable: true
  }
];

export const productsSeed: ProductSeed[] = [
  {
    slug: "tl-fc3015-12kw",
    model: "TL-FC3015-12KW",
    series: "FC3015",
    title: "TL-FC3015-12KW Fiber Laser Cutting Machine",
    shortDescription: "A compact high-power system for export factories cutting stainless steel, carbon steel, and aluminum sheet up to mid-thickness ranges.",
    heroImage: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=80",
    powerKw: 12,
    positioningAccuracy: "±0.03 mm",
    repeatPositioningAccuracy: "±0.02 mm",
    servoMotorBrand: "Yaskawa",
    assistGasTypes: ["Nitrogen", "Oxygen", "Compressed air"],
    complianceStandards: ["CE", "ISO 9001", "RoHS"],
    applicationLimits: ["Not recommended for highly reflective copper above 8mm without process validation"],
    recommendedFor: ["Sheet metal fabrication", "Elevator panels", "Machinery covers"],
    galleryMedia: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=80",
        alt: "TL-FC3015-12KW compact fiber laser cutting machine front view",
        caption: "Compact 3015 platform for sheet metal fabrication",
        priority: true
      },
      {
        type: "image",
        url: pdpImages.cutting,
        alt: "Fiber laser cutting stainless steel sheet in production",
        caption: "Stainless steel cutting validation with nitrogen assist gas"
      },
      {
        type: "image",
        url: pdpImages.inspection,
        alt: "Application engineer inspecting cut edge quality",
        caption: "Factory acceptance testing and edge inspection"
      },
      {
        type: "image",
        url: pdpImages.packing,
        alt: "Export packaging for industrial machinery shipment",
        caption: "Wooden case export packing with shipping mark"
      },
      {
        type: "video",
        url: pdpImages.factory,
        alt: "Factory walkthrough video poster",
        caption: "60-second factory walkthrough video poster"
      },
      {
        type: "360",
        url: pdpImages.engineer,
        alt: "360 degree machine walkaround poster",
        caption: "360 degree service access walkaround preview"
      }
    ],
    commercialTerms: commonCommercialTerms,
    featureAdvantages: [
      {
        title: "Cut mid-thickness sheet with stable repeatability",
        feature: "12 kW fiber laser source with calibrated dual-drive motion platform",
        advantage: "Balances power, speed, and footprint for export fabrication shops",
        benefit: "Helps buyers replace outsourced cutting while keeping floor-space requirements manageable",
        evidence: "Repeat positioning accuracy is specified at ±0.02 mm after calibration.",
        image: pdpImages.cutting,
        reportLink: "/download-center"
      },
      {
        title: "Lower maintenance burden than legacy CO2 systems",
        feature: "Fiber delivery path with simplified optical maintenance routine",
        advantage: "Reduces mirror alignment work and helps operators keep uptime predictable",
        benefit: "Shortens the ramp-up path for factories upgrading from older cutting technology",
        evidence: "Maintenance checklist is included in the installation guide download.",
        image: pdpImages.inspection,
        reportLink: "/maintenance-plan-laser-head"
      },
      {
        title: "Export-ready documentation package",
        feature: "CE, ISO 9001, RoHS, packing, installation, and spare-parts document set",
        advantage: "Supports importer due diligence before deposit and before customs clearance",
        benefit: "Reduces procurement friction for buyers preparing internal approval files",
        evidence: "Compliance pack is available through the gated download module.",
        image: pdpImages.certificate,
        reportLink: "/certifications"
      }
    ],
    applications: [
      {
        name: "Sheet metal fabrication",
        summary: "Stable cutting for stainless steel cabinets, enclosures, elevator panels, and machinery covers.",
        image: pdpImages.cutting,
        linkedSolutionPath: "/solutions/machinery-fabrication-laser-cutting"
      },
      {
        name: "Machinery covers",
        summary: "Repeatable nested production for covers, guards, brackets, and formed sheet components.",
        image: pdpImages.factory,
        linkedSolutionPath: "/solutions/machinery-fabrication-laser-cutting"
      },
      {
        name: "Mixed material job shop",
        summary: "Flexible process window for carbon steel, stainless steel, and aluminum in small-batch export work.",
        image: pdpImages.engineer,
        linkedSolutionPath: "/applications"
      }
    ],
    certifications: commonCertifications,
    manufacturingQc: {
      processSteps: [
        { step: "IQC", detail: "Incoming inspection for laser source, servo system, rails, electrical cabinet, and safety parts." },
        { step: "IPQC", detail: "Frame leveling, gantry calibration, wiring inspection, and cutting head alignment." },
        { step: "FQC", detail: "Material cutting sample validation, accuracy check, alarm test, and process database review." },
        { step: "OQC", detail: "Packing list, spare-parts kit, shipping mark, photo record, and export document check." }
      ],
      capacityText: "Monthly capacity: 35-45 compact sheet laser systems across FC series lines.",
      factoryImages: [
        { url: pdpImages.factory, alt: "TitanLaser assembly floor for compact machines", caption: "Assembly and motion calibration floor" },
        { url: pdpImages.inspection, alt: "QC inspection for cutting result", caption: "Cut sample inspection and FAT record" }
      ],
      walkthroughVideo: pdpImages.factory
    },
    downloads: [
      { title: "TL-FC3015-12KW Datasheet", type: "datasheet", pages: 8, fileLabel: "PDF datasheet", gateRequired: true },
      { title: "Full Fiber Laser Catalog", type: "catalog", pages: 28, fileLabel: "PDF catalog", gateRequired: true },
      { title: "Installation Readiness Guide", type: "installationGuide", pages: 12, fileLabel: "PDF guide", gateRequired: true }
    ],
    inquiryDefaults: commonInquiryDefaults,
    relatedProductSlugs: ["tl-gigacut-30kw"],
    trackingMeta: {
      category: "Fiber laser cutting machine",
      primaryApplication: "Sheet metal fabrication",
      conversionGoal: "PDP engineering RFQ"
    },
    materialCapabilities: [
      { material: "Carbon steel", maxThicknessMm: 22, recommendedThicknessMm: "1-18 mm", assistGas: "Oxygen", cuttingSpeedMMin: 1.8 },
      { material: "Stainless steel", maxThicknessMm: 30, recommendedThicknessMm: "1-20 mm", assistGas: "Nitrogen", cuttingSpeedMMin: 1.2 },
      { material: "Aluminum", maxThicknessMm: 25, recommendedThicknessMm: "1-16 mm", assistGas: "Nitrogen", cuttingSpeedMMin: 1.4 }
    ],
    specSlugs: ["repeat-positioning-accuracy", "laser-power-range"],
    expertSlug: "zhao-ming",
    faqSlugs: ["what-power-for-20mm-carbon-steel", "nitrogen-vs-oxygen-cost"],
    status: "published"
  },
  {
    slug: "tl-gigacut-30kw",
    model: "TL-GigaCut-30KW",
    series: "GigaCut",
    title: "TL-GigaCut-30KW High-Power Fiber Laser Cutting Machine",
    shortDescription: "A heavy-duty 30 kW fiber laser platform for shipyards, structural steel processors, and high-volume service centers.",
    heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
    powerKw: 30,
    positioningAccuracy: "±0.03 mm",
    repeatPositioningAccuracy: "±0.02 mm",
    servoMotorBrand: "Siemens",
    assistGasTypes: ["Nitrogen", "Oxygen", "Compressed air"],
    complianceStandards: ["CE", "ISO 9001", "RoHS", "IEC 60825-1"],
    applicationLimits: ["Requires stable floor foundation and dedicated gas supply for maximum throughput"],
    recommendedFor: ["Shipbuilding", "Heavy machinery", "Steel service centers"],
    galleryMedia: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
        alt: "TL-GigaCut-30KW high-power fiber laser cutting machine",
        caption: "Heavy-duty 30 kW platform for thick plate and service centers",
        priority: true
      },
      {
        type: "image",
        url: pdpImages.cutting,
        alt: "High-power fiber laser cutting thick carbon steel",
        caption: "30 mm carbon steel cutting validation with oxygen assist gas"
      },
      {
        type: "image",
        url: pdpImages.inspection,
        alt: "Engineer checking thick plate edge quality",
        caption: "Field edge-quality inspection after cutting"
      },
      {
        type: "image",
        url: pdpImages.factory,
        alt: "TitanLaser factory assembly floor for high-power systems",
        caption: "Heavy-duty gantry assembly and calibration bay"
      },
      {
        type: "video",
        url: pdpImages.engineer,
        alt: "30 kW cutting demonstration video poster",
        caption: "30 kW thick plate cutting demo poster"
      },
      {
        type: "360",
        url: pdpImages.packing,
        alt: "360 walkaround of high-power laser cutting system",
        caption: "Walkaround preview including exchange table and service access"
      }
    ],
    commercialTerms: {
      ...commonCommercialTerms,
      leadTime: "45-70 days after deposit",
      packaging: "Reinforced export wooden case, moisture barrier, container loading plan"
    },
    featureAdvantages: [
      {
        title: "Validate 30 mm carbon steel cutting",
        feature: "30 kW fiber laser source with oxygen cutting process database",
        advantage: "Expands thick-plate capability beyond mid-power sheet systems",
        benefit: "Helps shipyards and structural steel processors reduce plasma cleanup and rework",
        evidence: "Vietnam shipyard field run validated 30 mm carbon steel with 42% less secondary grinding.",
        image: pdpImages.cutting,
        reportLink: "/case-studies/vietnam-shipyard-30mm-carbon-steel"
      },
      {
        title: "Designed for high monthly utilization",
        feature: "Heavy-duty gantry, Siemens servo platform, and high-power cooling package",
        advantage: "Supports repeated thick-plate jobs across multi-shift production",
        benefit: "Improves throughput confidence for service centers quoting mixed customer orders",
        evidence: "Factory readiness checklist covers power, gas, chiller, floor, and extraction requirements.",
        image: pdpImages.factory,
        reportLink: "/topics/factory-readiness-checklist-30kw"
      },
      {
        title: "Reduce buyer risk before shipment",
        feature: "FAT process with cutting sample, packing photo, certificate pack, and remote video review",
        advantage: "Gives buyers verifiable production evidence before balance payment",
        benefit: "Supports internal approval for importers, distributors, and large fabrication plants",
        evidence: "FAT and compliance documents are available through the gated download module.",
        image: pdpImages.inspection,
        reportLink: "/download-center"
      }
    ],
    applications: [
      {
        name: "Shipbuilding and heavy plate",
        summary: "Cut hull reinforcement plates, ribs, brackets, and thick carbon steel parts with validated oxygen process settings.",
        image: pdpImages.cutting,
        linkedSolutionPath: "/solutions/shipbuilding-heavy-plate-laser-cutting"
      },
      {
        name: "Steel service centers",
        summary: "Quote mixed customer jobs with wider thickness coverage and structured cost-per-meter assumptions.",
        image: pdpImages.factory,
        linkedSolutionPath: "/solutions/steel-service-center-laser-cutting"
      },
      {
        name: "Heavy machinery fabrication",
        summary: "Support thick plate components, frames, brackets, and high-volume replacement for outsourced cutting.",
        image: pdpImages.engineer,
        linkedSolutionPath: "/solutions/machinery-fabrication-laser-cutting"
      }
    ],
    certifications: commonCertifications,
    manufacturingQc: {
      processSteps: [
        { step: "IQC", detail: "Laser source, high-power cutting head, chiller, electrical components, and safety devices inspected on arrival." },
        { step: "IPQC", detail: "Heavy gantry leveling, drive synchronization, gas path pressure test, and enclosure safety inspection." },
        { step: "FQC", detail: "30 mm carbon steel cut sample, stainless steel edge review, pierce test, motion repeatability, and alarm validation." },
        { step: "OQC", detail: "Container loading plan, reinforced packing, spare-parts kit, certificate pack, and buyer video record." }
      ],
      capacityText: "Monthly capacity: 12-18 high-power GigaCut systems depending on laser source and automation options.",
      factoryImages: [
        { url: pdpImages.factory, alt: "High-power laser machine assembly bay", caption: "Heavy-duty assembly and calibration area" },
        { url: pdpImages.inspection, alt: "Thick plate cutting sample inspection", caption: "FAT sample inspection and process record" }
      ],
      walkthroughVideo: pdpImages.engineer
    },
    downloads: [
      { title: "TL-GigaCut-30KW Datasheet", type: "datasheet", pages: 10, fileLabel: "PDF datasheet", gateRequired: true },
      { title: "High-Power Laser Product Catalog", type: "catalog", pages: 32, fileLabel: "PDF catalog", gateRequired: true },
      { title: "30 kW Factory Readiness Guide", type: "installationGuide", pages: 16, fileLabel: "PDF guide", gateRequired: true },
      { title: "CE and Safety Compliance Pack", type: "compliancePack", pages: 18, fileLabel: "PDF compliance pack", gateRequired: true }
    ],
    inquiryDefaults: commonInquiryDefaults,
    relatedProductSlugs: ["tl-fc3015-12kw"],
    trackingMeta: {
      category: "High-power fiber laser cutting machine",
      primaryApplication: "Shipbuilding and heavy plate",
      conversionGoal: "30 kW PDP engineering RFQ"
    },
    materialCapabilities: [
      { material: "Carbon steel", maxThicknessMm: 30, recommendedThicknessMm: "6-30 mm", assistGas: "Oxygen", cuttingSpeedMMin: 0.9 },
      { material: "Stainless steel", maxThicknessMm: 60, recommendedThicknessMm: "3-40 mm", assistGas: "Nitrogen", cuttingSpeedMMin: 0.7 },
      { material: "Aluminum", maxThicknessMm: 50, recommendedThicknessMm: "3-35 mm", assistGas: "Nitrogen", cuttingSpeedMMin: 0.8 }
    ],
    specSlugs: ["max-carbon-steel-thickness-30kw", "repeat-positioning-accuracy", "laser-power-range"],
    expertSlug: "zhao-ming",
    faqSlugs: ["can-30kw-cut-30mm-carbon-steel", "nitrogen-vs-oxygen-cost", "factory-requirements-30kw"],
    status: "published"
  }
];

export const caseStudiesSeed: CaseStudySeed[] = [
  {
    slug: "vietnam-shipyard-30mm-carbon-steel",
    title: "Vietnam Shipyard Cuts 30mm Carbon Steel with TL-GigaCut-30KW",
    customerIndustry: "Shipbuilding",
    country: "Vietnam",
    painPoint: "The customer needed to replace slow plasma cutting on thick hull reinforcement plates while keeping edge cleanup predictable.",
    productSlug: "tl-gigacut-30kw",
    expertSlug: "zhao-ming",
    heroImage: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1400&q=80",
    fieldMedia: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80",
        caption: "On-site cutting validation with timestamped process sheet.",
        capturedAt: "2026-03-18T09:40:00+07:00",
        location: "Hai Phong, Vietnam"
      }
    ],
    measuredResults: [
      { metric: "Maximum validated carbon steel thickness", value: "30 mm", context: "Oxygen assist gas, production-grade nesting pattern" },
      { metric: "Secondary grinding reduction", value: "42%", context: "Compared with the customer's prior plasma workflow" },
      { metric: "Operator training time", value: "3 days", context: "Two shifts trained by TitanLaser application engineer" }
    ],
    summary: "TitanLaser validated the TL-GigaCut-30KW on 30mm carbon steel plates and connected the field result back to product specs, FAQs, and buying guidance.",
    status: "published"
  }
];

export const faqsSeed: FaqSeed[] = [
  {
    slug: "can-30kw-cut-30mm-carbon-steel",
    question: "Can a 30 kW fiber laser cutting machine cut 30mm carbon steel?",
    answer: "Yes. TitanLaser validates 30mm carbon steel cutting on the TL-GigaCut-30KW with oxygen assist gas, proper foundation, and a tuned process database. The Vietnam shipyard case shows the field result.",
    relatedProductSlug: "tl-gigacut-30kw",
    relatedCaseSlug: "vietnam-shipyard-30mm-carbon-steel",
    status: "published"
  },
  {
    slug: "what-power-for-20mm-carbon-steel",
    question: "What laser power is recommended for 20mm carbon steel?",
    answer: "For stable 20mm carbon steel production, TitanLaser typically recommends 12 kW or above. 30 kW becomes attractive when throughput, edge quality, and thick plate flexibility are more important than initial equipment cost.",
    relatedProductSlug: "tl-fc3015-12kw",
    status: "published"
  },
  {
    slug: "nitrogen-vs-oxygen-cost",
    question: "Is nitrogen or oxygen cheaper for laser cutting?",
    answer: "Oxygen usually lowers gas consumption on carbon steel but can add oxide cleanup. Nitrogen is cleaner for stainless steel and aluminum, but the hourly gas cost is often higher. The right answer depends on material, thickness, finish requirements, and local gas pricing.",
    relatedProductSlug: "tl-gigacut-30kw",
    status: "published"
  },
  {
    slug: "factory-requirements-30kw",
    question: "What factory conditions are required for a 30 kW machine?",
    answer: "A 30 kW laser system needs stable power, a prepared foundation, reliable gas supply, clean compressed air, water chiller capacity, and operator safety zoning before commissioning.",
    relatedProductSlug: "tl-gigacut-30kw",
    status: "published"
  }
];

const pillarSection = (focus: string, buyerQuestion: string, operationalLens: string) =>
  `${focus} matters because B2B buyers do not evaluate a fiber laser cutting machine as a single product page; they evaluate a production system. A procurement manager wants to know whether the machine can cut the current material mix, whether it can absorb future thickness requirements, whether local gas and power infrastructure can support the process, and whether the supplier can prove the claim with engineering evidence. For SEO, AEO, and GEO, this means the content cannot be a thin brochure. It must behave like a structured technical dossier that defines the entity, answers the question directly, links to supporting evidence, and gives the buyer a next step. The core question for this section is: ${buyerQuestion} The short answer should appear early, but the surrounding explanation must show conditions, trade-offs, and limitations.

From an application engineering perspective, ${operationalLens} The same fact should appear consistently in the product page, comparison article, FAQ answer, calculator logic, and case study. If the product page says a 30 kW system can cut 30mm carbon steel, the knowledge base must clarify the gas strategy, the case study must show measured field results, and the calculator must use the same material capability table. This is how a site moves from page-level SEO to entity-level authority. Large language models and answer engines can extract a clean answer because the same fact is repeated in different contexts without contradiction.

The practical implementation is to store this information as atomic fields. Material capability should not live only in a paragraph. It should be a structured array with material, maximum thickness, recommended thickness, assist gas, and reference speed. Compliance should be a repeatable field. Factory requirements should be expressed as checklists. Expert review should be linked to a real person profile. Once this is modeled, the front end can assemble the pillar page, topic clusters, PDP tables, internal links, and JSON-LD from one source of truth. That consistency is the foundation of AEO snippets and GEO citation eligibility.

For conversion, ${focus.toLowerCase()} should always connect back to a commercial action. A reader who starts with a technical question should be able to move into a calculator, compare a 12 kW and 30 kW model, verify a field case, check the author profile, and request a quote with the right context. The pillar page is therefore not an isolated long article. It is the hub of a silo: it receives topical relevance from cluster articles, passes commercial relevance to PDPs, and borrows trust from expert and case pages.`;

const pillarBodyBlocks = [
  {
    heading: "Executive answer: what fiber laser cutting solves for metal fabrication buyers",
    content: pillarSection(
      "The executive answer",
      "when should a factory choose fiber laser cutting instead of plasma, CO2, outsourcing, or another fabrication route?",
      "fiber laser cutting is strongest when a buyer needs repeatable sheet or plate cutting, faster changeover, lower optical maintenance than CO2, cleaner nesting workflow, and a measurable route from machine cost to production throughput."
    )
  },
  {
    heading: "Power selection: matching 12 kW, 20 kW, and 30 kW to real production",
    content: pillarSection(
      "Power selection",
      "how much laser power is enough for the buyer's material mix and future growth plan?",
      "power selection should start with the real material distribution, not the largest number in a brochure. A 12 kW system can be the right purchase for mid-thickness sheet work, while 30 kW becomes valuable for thick carbon steel, service-center flexibility, and high monthly tonnage."
    )
  },
  {
    heading: "Material and thickness capability: why tables beat marketing claims",
    content: pillarSection(
      "Material and thickness capability",
      "can this machine cut the target material and thickness with stable quality in production?",
      "maximum thickness is only meaningful when the page states material grade, assist gas, process database, cutting head configuration, and edge-quality expectation. A structured table helps both human buyers and AI crawlers understand the condition behind every claim."
    )
  },
  {
    heading: "Assist gas strategy: nitrogen, oxygen, compressed air, and operating cost",
    content: pillarSection(
      "Assist gas strategy",
      "which gas gives the lowest total cost for the desired finish and material?",
      "oxygen can reduce gas cost for carbon steel but may create oxide cleanup, nitrogen supports clean stainless steel and aluminum edges with higher gas expense, and compressed air can be attractive when finish requirements are less strict."
    )
  },
  {
    heading: "Accuracy, motion control, and repeatability",
    content: pillarSection(
      "Motion accuracy",
      "how does a buyer know the machine can hold tolerances across shifts and nested jobs?",
      "repeat positioning accuracy, gantry rigidity, servo brand, calibration workflow, and foundation preparation all influence whether the machine can reproduce the same result after thousands of moves. These facts belong in structured specs and glossary definitions."
    )
  },
  {
    heading: "Factory readiness: power, foundation, cooling, gas, and safety zoning",
    content: pillarSection(
      "Factory readiness",
      "what must be prepared before a high-power fiber laser arrives?",
      "a 30 kW installation is not only a machine purchase. It requires stable electrical supply, chiller capacity, gas storage or generation, clean compressed air, extraction planning, operator safety training, and space for loading, unloading, and maintenance."
    )
  },
  {
    heading: "Running cost and ROI: from hourly cost to cost per meter",
    content: pillarSection(
      "Running cost and ROI",
      "how can the buyer estimate whether a machine pays back under local electricity, gas, labor, and utilization assumptions?",
      "the most useful answer combines laser power, cutting speed, gas type, local energy cost, labor cost, and utilization. This is why an interactive calculator should reuse product capability fields instead of asking the buyer to trust generic assumptions."
    )
  },
  {
    heading: "Maintenance and lifecycle planning",
    content: pillarSection(
      "Maintenance planning",
      "what maintenance work protects uptime and cutting quality after installation?",
      "buyers should evaluate lens and nozzle routines, chiller maintenance, rail cleaning, calibration intervals, software backup, spare parts availability, and remote service responsiveness. These items convert vague support promises into audit-ready service expectations."
    )
  },
  {
    heading: "Comparison workflow: fiber vs CO2, plasma, and outsourcing",
    content: pillarSection(
      "Comparison workflow",
      "how should a factory compare fiber laser cutting with other production alternatives?",
      "the right comparison uses material type, thickness, batch size, edge cleanup, operator skill, maintenance burden, floor space, and part accuracy. A cluster article should answer each comparison question and link back to the pillar and relevant PDP."
    )
  },
  {
    heading: "E-E-A-T proof: author profiles, case studies, and certification evidence",
    content: pillarSection(
      "E-E-A-T proof",
      "why should a buyer or answer engine trust the supplier's technical claims?",
      "the claim should be attached to an expert author, a real field case, certification evidence, and measurable results. For a fictional demo brand, third-party review modules must remain integration slots until official Trustpilot or G2 data is connected."
    )
  },
  {
    heading: "Internal silo architecture: how the topic cluster passes authority",
    content: pillarSection(
      "Internal silo architecture",
      "how should articles link so topical authority compounds instead of scattering across the site?",
      "a strong silo uses three anchor stages: exact-topic anchors back to the pillar, commercial-intent anchors into PDPs, and proof anchors into case studies, experts, and the About page. This gives crawlers a reliable path through the knowledge graph."
    )
  },
  {
    heading: "Implementation checklist for a GEO-ready B2B content system",
    content: pillarSection(
      "Implementation checklist",
      "what should the content team build first to make the system operational?",
      "the minimum system should include structured products, reusable specs, pillar content, six or more cluster pages, glossary definitions, FAQs, expert profiles, case studies, review integrations, calculator components, internal link rules, and JSON-LD helpers."
    )
  }
];

const clusterBlock = (focus: string, answer: string) => [
  {
    heading: `Direct answer: ${focus}`,
    content: `${answer} This cluster page is designed to answer one narrow buyer question, then pass relevance back to the pillar guide and forward to product pages. It uses a short answer first, then explains conditions, limitations, and next steps so answer engines can extract the summary while human buyers can continue into evaluation.`
  },
  {
    heading: "How this connects to the TitanLaser silo",
    content: "The article links to the pillar page for broad topical authority, to PDPs for commercial evaluation, to glossary entries for terminology, and to case or expert proof when a claim needs verification. This structure keeps authority inside the same topic silo instead of leaving each article isolated."
  }
];

export const contentPagesSeed: ContentPageSeed[] = [
  {
    slug: "ultimate-guide-fiber-laser-cutting-metal-fabrication",
    type: "pillar",
    title: "Ultimate Guide to Fiber Laser Cutting for Metal Fabrication",
    seoSummary: "A practical B2B guide to fiber laser cutting machines, power selection, material thickness, gas strategy, and factory readiness.",
    heroAnswer: "Fiber laser cutting is the preferred process for metal fabrication when factories need fast cutting speed, predictable kerf, and lower maintenance than CO2 systems.",
    bodyBlocks: pillarBodyBlocks,
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: [
      "fiber-vs-co2-laser",
      "cutting-speed-chart-metal-materials",
      "laser-power-selection-guide",
      "assist-gas-cost-strategy",
      "factory-readiness-checklist-30kw",
      "laser-cutting-roi-calculation",
      "maintenance-plan-laser-head",
      "laser-cutting-quality-troubleshooting"
    ],
    expertSlug: "zhao-ming",
    faqSlugs: ["can-30kw-cut-30mm-carbon-steel", "what-power-for-20mm-carbon-steel"],
    status: "published",
    lastReviewedAt: "2026-05-01",
    nextReviewAt: "2026-08-01",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "fiber-vs-co2-laser",
    type: "cluster",
    title: "Fiber vs CO2 Laser: Which Is Better for Your Factory?",
    seoSummary: "A direct comparison of fiber and CO2 laser cutting for metal fabrication buyers.",
    heroAnswer: "For most metal fabrication exporters, fiber laser cutting is better than CO2 because it cuts reflective metals more efficiently and requires less optical maintenance.",
    bodyBlocks: [
      { heading: "When fiber wins", content: "Fiber systems are strongest for stainless steel, carbon steel, aluminum, and factories that need simpler maintenance." },
      { heading: "When CO2 still appears", content: "CO2 may remain relevant for some non-metal materials, but it is rarely the default choice for high-power metal cutting lines." }
    ],
    relatedProductSlugs: ["tl-fc3015-12kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "laser-power-selection-guide", "laser-cutting-roi-calculation"],
    expertSlug: "zhao-ming",
    faqSlugs: ["what-power-for-20mm-carbon-steel"],
    status: "published",
    lastReviewedAt: "2026-04-20",
    nextReviewAt: "2026-07-20",
    reviewStatus: "fresh",
    contentOwner: "SEO Engineering"
  },
  {
    slug: "cutting-speed-chart-metal-materials",
    type: "cluster",
    title: "Cutting Speed Chart for Carbon Steel, Stainless Steel, and Aluminum",
    seoSummary: "A buyer-friendly explanation of cutting speed ranges by material, thickness, assist gas, and laser power.",
    heroAnswer: "Cutting speed depends on material, thickness, gas, power, and target edge quality. Product-specific tables are more reliable than generic wattage charts.",
    bodyBlocks: [
      { heading: "Why generic charts fail", content: "A 30 kW system cutting 30mm carbon steel with oxygen behaves very differently from stainless steel cutting with nitrogen." },
      { heading: "How TitanLaser publishes speed data", content: "Each product page stores material capability and speed as structured fields so calculators, specs, and JSON-LD stay aligned." }
    ],
    relatedProductSlugs: ["tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "assist-gas-cost-strategy", "laser-cutting-quality-troubleshooting"],
    expertSlug: "zhao-ming",
    faqSlugs: ["can-30kw-cut-30mm-carbon-steel", "nitrogen-vs-oxygen-cost"],
    status: "published",
    lastReviewedAt: "2026-04-25",
    nextReviewAt: "2026-07-25",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "laser-power-selection-guide",
    type: "cluster",
    title: "How to Choose Fiber Laser Power for Carbon Steel, Stainless Steel, and Aluminum",
    seoSummary: "A practical power selection guide for buyers comparing 12 kW, 20 kW, and 30 kW fiber laser cutting systems.",
    heroAnswer: "Choose laser power by material mix, target thickness, monthly tonnage, gas strategy, and payback period, not by wattage alone.",
    bodyBlocks: clusterBlock("laser power selection", "For mixed sheet-metal production, a 12 kW machine can be the right starting point. For thick plate, high utilization, and service-center flexibility, 30 kW is more defensible because it expands the carbon steel, stainless steel, and aluminum operating window."),
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "factory-readiness-checklist-30kw"],
    expertSlug: "zhao-ming",
    faqSlugs: ["what-power-for-20mm-carbon-steel", "can-30kw-cut-30mm-carbon-steel"],
    status: "published",
    lastReviewedAt: "2026-05-10",
    nextReviewAt: "2026-08-10",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "assist-gas-cost-strategy",
    type: "cluster",
    title: "Nitrogen vs Oxygen vs Compressed Air: Laser Cutting Gas Cost Strategy",
    seoSummary: "A B2B guide to choosing assist gas by material, finish requirement, oxidation risk, speed, and local gas cost.",
    heroAnswer: "Oxygen is often cost-effective for carbon steel, nitrogen is preferred for clean stainless and aluminum edges, and compressed air is useful when finish requirements are moderate.",
    bodyBlocks: clusterBlock("assist gas cost strategy", "The lowest gas invoice is not always the lowest production cost. Buyers should compare gas price, cutting speed, oxide cleanup, reject rate, and downstream finishing. The same material table should feed PDPs, calculators, and FAQs."),
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "cutting-speed-chart-metal-materials"],
    expertSlug: "zhao-ming",
    faqSlugs: ["nitrogen-vs-oxygen-cost"],
    status: "published",
    lastReviewedAt: "2026-05-10",
    nextReviewAt: "2026-08-10",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "factory-readiness-checklist-30kw",
    type: "cluster",
    title: "30 kW Fiber Laser Factory Readiness Checklist",
    seoSummary: "A commissioning checklist for power, foundation, gas, cooling, air, safety, and operator preparation before installing a 30 kW machine.",
    heroAnswer: "A 30 kW system needs stable power, prepared foundation, sufficient cooling, reliable assist gas, clean compressed air, extraction, and safety zoning before commissioning.",
    bodyBlocks: clusterBlock("30 kW factory readiness", "High-power laser success depends on the site as much as the machine. Buyers should confirm electrical capacity, chiller placement, gas flow, floor levelness, loading access, extraction, safety curtains, and operator training before shipment."),
    relatedProductSlugs: ["tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "laser-power-selection-guide"],
    expertSlug: "zhao-ming",
    faqSlugs: ["factory-requirements-30kw"],
    status: "published",
    lastReviewedAt: "2026-05-10",
    nextReviewAt: "2026-08-10",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "laser-cutting-roi-calculation",
    type: "cluster",
    title: "How to Calculate Fiber Laser Cutting Machine Running Cost and ROI",
    seoSummary: "A practical guide to hourly cost, cost per meter, utilization, gas, electricity, labor, and payback calculation for laser cutting buyers.",
    heroAnswer: "Running cost should combine electricity, gas, labor, utilization, and cutting speed; ROI depends on throughput gains, cleanup reduction, outsourcing replacement, and machine uptime.",
    bodyBlocks: clusterBlock("running cost and ROI", "A realistic ROI model should start with local utility and gas prices, then use product-specific speed and material capability. Generic calculators are weak unless they pull from the same product facts used by the PDP."),
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "assist-gas-cost-strategy"],
    expertSlug: "zhao-ming",
    faqSlugs: ["nitrogen-vs-oxygen-cost", "what-power-for-20mm-carbon-steel"],
    status: "published",
    lastReviewedAt: "2026-05-10",
    nextReviewAt: "2026-08-10",
    reviewStatus: "fresh",
    contentOwner: "SEO Engineering"
  },
  {
    slug: "maintenance-plan-laser-head",
    type: "cluster",
    title: "Laser Head Maintenance Plan for Fiber Laser Cutting Machines",
    seoSummary: "A maintenance guide for laser head optics, nozzles, calibration, cooling, protective windows, and operator routines.",
    heroAnswer: "A good laser head maintenance plan protects edge quality and uptime by standardizing optics checks, nozzle condition, protective window replacement, calibration, and contamination control.",
    bodyBlocks: clusterBlock("laser head maintenance", "Maintenance content builds trust because buyers care about the cost after installation. The page should clarify daily, weekly, and monthly routines, link to product support expectations, and connect to expert proof."),
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "laser-cutting-quality-troubleshooting"],
    expertSlug: "zhao-ming",
    faqSlugs: ["factory-requirements-30kw"],
    status: "published",
    lastReviewedAt: "2026-05-10",
    nextReviewAt: "2026-08-10",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "laser-cutting-quality-troubleshooting",
    type: "cluster",
    title: "Fiber Laser Cutting Quality Troubleshooting: Burr, Dross, Taper, and Edge Oxidation",
    seoSummary: "A troubleshooting guide for common laser cutting quality problems and the machine, gas, focus, and process settings that affect them.",
    heroAnswer: "Most quality issues come from a small set of variables: focus position, nozzle condition, gas pressure, speed, power, material quality, and machine calibration.",
    bodyBlocks: clusterBlock("cutting quality troubleshooting", "Troubleshooting content earns GEO visibility because it solves real operator problems. Each answer should connect the symptom to likely causes, product capability, maintenance guidance, and expert validation."),
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: ["ultimate-guide-fiber-laser-cutting-metal-fabrication", "maintenance-plan-laser-head", "cutting-speed-chart-metal-materials"],
    expertSlug: "zhao-ming",
    faqSlugs: ["can-30kw-cut-30mm-carbon-steel"],
    status: "published",
    lastReviewedAt: "2026-05-10",
    nextReviewAt: "2026-08-10",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "repeat-positioning-accuracy",
    type: "glossary",
    title: "Repeat Positioning Accuracy",
    seoSummary: "Definition of repeat positioning accuracy for fiber laser cutting machines.",
    heroAnswer: "Repeat positioning accuracy measures how consistently the machine returns to the same programmed location during repeated motion.",
    bodyBlocks: [
      { heading: "Why it matters", content: "Better repeat positioning helps maintain consistent cuts across nested parts and multi-shift production." }
    ],
    relatedProductSlugs: ["tl-fc3015-12kw", "tl-gigacut-30kw"],
    relatedTopicSlugs: [],
    expertSlug: "zhao-ming",
    faqSlugs: [],
    status: "published",
    lastReviewedAt: "2026-04-15",
    nextReviewAt: "2026-10-15",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "assist-gas",
    type: "glossary",
    title: "Assist Gas",
    seoSummary: "Definition of assist gas in laser cutting and how nitrogen, oxygen, and compressed air differ.",
    heroAnswer: "Assist gas removes molten material from the kerf and changes edge quality, oxidation, cutting speed, and operating cost.",
    bodyBlocks: [
      { heading: "Common gases", content: "Oxygen is common for carbon steel, nitrogen for stainless steel and aluminum, and compressed air for lower-cost applications." }
    ],
    relatedProductSlugs: ["tl-gigacut-30kw"],
    relatedTopicSlugs: ["cutting-speed-chart-metal-materials"],
    expertSlug: "zhao-ming",
    faqSlugs: ["nitrogen-vs-oxygen-cost"],
    status: "published",
    lastReviewedAt: "2026-04-15",
    nextReviewAt: "2026-10-15",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  },
  {
    slug: "carbon-steel-cutting-thickness",
    type: "glossary",
    title: "Carbon Steel Cutting Thickness",
    seoSummary: "How maximum carbon steel cutting thickness should be interpreted on fiber laser machine pages.",
    heroAnswer: "Maximum carbon steel cutting thickness is valid only with the stated laser power, assist gas, material grade, process database, and machine condition.",
    bodyBlocks: [
      { heading: "Avoid headline-only comparison", content: "Two machines with the same wattage can produce different results if the motion platform, cutting head, gas path, and service support differ." }
    ],
    relatedProductSlugs: ["tl-gigacut-30kw"],
    relatedTopicSlugs: ["cutting-speed-chart-metal-materials"],
    expertSlug: "zhao-ming",
    faqSlugs: ["can-30kw-cut-30mm-carbon-steel"],
    status: "published",
    lastReviewedAt: "2026-04-15",
    nextReviewAt: "2026-10-15",
    reviewStatus: "fresh",
    contentOwner: "Application Engineering"
  }
];

export const titanLaserSeed = {
  siteSettings: siteSettingsSeed,
  technicalSpecs: technicalSpecsSeed,
  experts: expertsSeed,
  products: productsSeed,
  caseStudies: caseStudiesSeed,
  faqs: faqsSeed,
  contentPages: contentPagesSeed
};
