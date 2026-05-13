import {
  caseStudiesSeed,
  contentPagesSeed,
  expertsSeed,
  faqsSeed,
  productsSeed,
  siteSettingsSeed,
  technicalSpecsSeed,
  type CaseStudySeed,
  type ContentPageSeed,
  type ExpertSeed,
  type FaqSeed,
  type ProductSeed,
  type TechnicalSpecSeed
} from "@titanlaser/content";

const API_BASE = process.env.PUBLIC_PAYLOAD_URL || "http://localhost:3001/api";
let apiUnavailable = false;

export type SiteSettings = typeof siteSettingsSeed;
export type TechnicalSpec = TechnicalSpecSeed & { id?: string | number };
export type Expert = ExpertSeed & { id?: string | number };
export type Faq = FaqSeed & {
  id?: string | number;
  relatedProduct?: Product;
  relatedCase?: CaseStudy;
};
export type Product = Omit<ProductSeed, "specSlugs" | "expertSlug" | "faqSlugs"> & {
  id?: string | number;
  technicalSpecs: TechnicalSpec[];
  expert: Expert;
  faqs: Faq[];
  relatedCases: CaseStudy[];
};
export type CaseStudy = Omit<CaseStudySeed, "productSlug" | "expertSlug"> & {
  id?: string | number;
  product: Product | ProductSeed;
  expert: Expert;
};
export type ContentPage = Omit<ContentPageSeed, "relatedProductSlugs" | "relatedTopicSlugs" | "expertSlug" | "faqSlugs"> & {
  id?: string | number;
  relatedProducts: Product[];
  relatedTopics: ContentPage[];
  expert?: Expert;
  faqs: Faq[];
};

function rowsToValues<T extends Record<string, unknown>>(rows: T[] | undefined, key: keyof T): string[] {
  return rows?.map((row) => String(row[key] || "")).filter(Boolean) || [];
}

function normalizeProductDoc(doc: any): Product {
  const seed = productsSeed.find((product) => product.slug === doc.slug);
  return {
    ...doc,
    assistGasTypes: Array.isArray(doc.assistGasTypes) && typeof doc.assistGasTypes[0] === "object" ? rowsToValues(doc.assistGasTypes, "gas") : doc.assistGasTypes || [],
    complianceStandards:
      Array.isArray(doc.complianceStandards) && typeof doc.complianceStandards[0] === "object"
        ? rowsToValues(doc.complianceStandards, "standard")
        : doc.complianceStandards || [],
    applicationLimits:
      Array.isArray(doc.applicationLimits) && typeof doc.applicationLimits[0] === "object"
        ? rowsToValues(doc.applicationLimits, "limit")
        : doc.applicationLimits || [],
    recommendedFor:
      Array.isArray(doc.recommendedFor) && typeof doc.recommendedFor[0] === "object"
        ? rowsToValues(doc.recommendedFor, "application")
        : doc.recommendedFor || [],
    relatedProductSlugs:
      Array.isArray(doc.relatedProductSlugs) && typeof doc.relatedProductSlugs[0] === "object"
        ? rowsToValues(doc.relatedProductSlugs, "slug")
        : doc.relatedProductSlugs || seed?.relatedProductSlugs || [],
    galleryMedia: doc.galleryMedia || seed?.galleryMedia || [],
    commercialTerms: doc.commercialTerms || seed?.commercialTerms,
    featureAdvantages: doc.featureAdvantages || seed?.featureAdvantages || [],
    applications: doc.applications || seed?.applications || [],
    certifications: doc.certifications || seed?.certifications || [],
    manufacturingQc: doc.manufacturingQc || seed?.manufacturingQc,
    downloads: doc.downloads || seed?.downloads || [],
    inquiryDefaults: doc.inquiryDefaults || seed?.inquiryDefaults,
    trackingMeta: doc.trackingMeta || seed?.trackingMeta,
    technicalSpecs: doc.technicalSpecs || [],
    relatedCases: doc.relatedCases || [],
    expert: doc.expert,
    faqs: doc.faqs || []
  };
}

function normalizeExpertDoc(doc: any): Expert {
  return {
    ...doc,
    credentials: Array.isArray(doc.credentials) && typeof doc.credentials[0] === "object" ? rowsToValues(doc.credentials, "credential") : doc.credentials || [],
    projectHighlights:
      Array.isArray(doc.projectHighlights) && typeof doc.projectHighlights[0] === "object"
        ? rowsToValues(doc.projectHighlights, "highlight")
        : doc.projectHighlights || []
  };
}

async function getFromApi<T>(path: string): Promise<T | null> {
  if (apiUnavailable) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 500);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    apiUnavailable = true;
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

const fallbackSpecs = technicalSpecsSeed;
const fallbackExperts: Expert[] = expertsSeed;
const fallbackFaqs: Faq[] = faqsSeed.map((faq) => ({ ...faq }));

const fallbackProducts: Product[] = productsSeed.map((product) => {
  const expert = fallbackExperts.find((item) => item.slug === product.expertSlug)!;
  return {
    ...product,
    technicalSpecs: product.specSlugs.map((slug) => fallbackSpecs.find((spec) => spec.slug === slug)!).filter(Boolean),
    expert,
    faqs: fallbackFaqs.filter((faq) => product.faqSlugs.includes(faq.slug)),
    relatedCases: []
  };
});

const fallbackCases: CaseStudy[] = caseStudiesSeed.map((caseStudy) => ({
  ...caseStudy,
  product: fallbackProducts.find((product) => product.slug === caseStudy.productSlug)!,
  expert: fallbackExperts.find((expert) => expert.slug === caseStudy.expertSlug)!
}));

fallbackProducts.forEach((product) => {
  product.relatedCases = fallbackCases.filter((caseStudy) => "slug" in caseStudy.product && caseStudy.product.slug === product.slug);
});

const fallbackPages: ContentPage[] = contentPagesSeed.map((page) => ({
  ...page,
  relatedProducts: fallbackProducts.filter((product) => page.relatedProductSlugs.includes(product.slug)),
  relatedTopics: [],
  expert: page.expertSlug ? fallbackExperts.find((expert) => expert.slug === page.expertSlug) : undefined,
  faqs: fallbackFaqs.filter((faq) => page.faqSlugs.includes(faq.slug))
}));

fallbackPages.forEach((page) => {
  const seedPage = contentPagesSeed.find((item) => item.slug === page.slug)!;
  page.relatedTopics = fallbackPages.filter((topic) => seedPage.relatedTopicSlugs.includes(topic.slug));
});

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await getFromApi<any>("/globals/siteSettings");
  if (!data) return siteSettingsSeed;
  return {
    ...data,
    sameAs: Array.isArray(data.sameAs) && typeof data.sameAs[0] === "object" ? rowsToValues(data.sameAs, "url") : data.sameAs || []
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await getFromApi<{ docs: any[] }>("/products?depth=2&limit=100&where[status][equals]=published");
  if (!data) return fallbackProducts;
  return data.docs.map(normalizeProductDoc);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const data = await getFromApi<{ docs: any[] }>(`/products?depth=3&limit=1&where[slug][equals]=${encodeURIComponent(slug)}`);
  if (!data) return fallbackProducts.find((product) => product.slug === slug);
  return data.docs[0] ? normalizeProductDoc(data.docs[0]) : undefined;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const data = await getFromApi<{ docs: any[] }>("/caseStudies?depth=2&limit=100&where[status][equals]=published");
  if (!data) return fallbackCases;
  return data.docs.map((doc) => ({ ...doc, expert: normalizeExpertDoc(doc.expert), product: normalizeProductDoc(doc.product) }));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  const data = await getFromApi<{ docs: any[] }>(`/caseStudies?depth=3&limit=1&where[slug][equals]=${encodeURIComponent(slug)}`);
  if (!data) return fallbackCases.find((caseStudy) => caseStudy.slug === slug);
  const doc = data.docs[0];
  return doc ? { ...doc, expert: normalizeExpertDoc(doc.expert), product: normalizeProductDoc(doc.product) } : undefined;
}

export async function getExperts(): Promise<Expert[]> {
  const data = await getFromApi<{ docs: any[] }>("/experts?depth=2&limit=100&where[status][equals]=published");
  if (!data) return fallbackExperts;
  return data.docs.map(normalizeExpertDoc);
}

export async function getExpert(slug: string): Promise<Expert | undefined> {
  const data = await getFromApi<{ docs: any[] }>(`/experts?depth=2&limit=1&where[slug][equals]=${encodeURIComponent(slug)}`);
  if (!data) return fallbackExperts.find((expert) => expert.slug === slug);
  return data.docs[0] ? normalizeExpertDoc(data.docs[0]) : undefined;
}

export async function getContentPages(type?: ContentPage["type"]): Promise<ContentPage[]> {
  const where = type ? `&where[type][equals]=${type}` : "";
  const data = await getFromApi<{ docs: any[] }>(`/contentPages?depth=3&limit=100&where[status][equals]=published${where}`);
  if (!data) return type ? fallbackPages.filter((page) => page.type === type) : fallbackPages;
  return data.docs.map((doc) => ({
    ...doc,
    relatedProducts: (doc.relatedProducts || []).map(normalizeProductDoc),
    relatedTopics: doc.relatedTopics || [],
    expert: doc.expert ? normalizeExpertDoc(doc.expert) : undefined,
    faqs: doc.faqs || [],
    lastReviewedAt: doc.governance?.lastReviewedAt,
    nextReviewAt: doc.governance?.nextReviewAt,
    reviewStatus: doc.governance?.reviewStatus,
    contentOwner: doc.governance?.contentOwner
  }));
}

export async function getContentPage(slug: string): Promise<ContentPage | undefined> {
  const pages = await getContentPages();
  return pages.find((page) => page.slug === slug);
}

export function getMaxCarbonSteelThickness(product: Product | ProductSeed): number {
  return Math.max(
    ...product.materialCapabilities
      .filter((item) => item.material.toLowerCase() === "carbon steel")
      .map((item) => item.maxThicknessMm)
  );
}
