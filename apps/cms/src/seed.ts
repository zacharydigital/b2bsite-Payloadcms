// @ts-nocheck
import { titanLaserSeed } from "@titanlaser/content";
import { getPayload } from "payload";
import config from "./payload.config";

type CollectionSlug =
  | "technicalSpecs"
  | "experts"
  | "products"
  | "caseStudies"
  | "faqs"
  | "contentPages";

const payload = await getPayload({ config });

async function clearCollection(collection: CollectionSlug) {
  const existing = await payload.find({
    collection,
    limit: 1000,
    overrideAccess: true
  });

  for (const doc of existing.docs) {
    await payload.delete({
      collection,
      id: doc.id,
      overrideAccess: true
    });
  }
}

async function ensureAdminUser() {
  const email = "admin@titanlaser.local";
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true
  });

  if (existing.docs.length > 0) {
    return existing.docs[0];
  }

  return payload.create({
    collection: "users",
    data: {
      email,
      password: "TitanLaserDemo123!",
      name: "TitanLaser Admin",
      role: "admin"
    },
    overrideAccess: true
  });
}

function toTextRows(values: string[], field: string): any[] {
  return values.map((value) => ({ [field]: value }));
}

function ids(values: Array<string | number | undefined>): number[] {
  return values.filter((value): value is number => typeof value === "number");
}

await ensureAdminUser();

for (const collection of ["contentPages", "faqs", "caseStudies", "products", "experts", "technicalSpecs"] as CollectionSlug[]) {
  await clearCollection(collection);
}

await payload.updateGlobal({
  slug: "siteSettings",
  data: {
    ...titanLaserSeed.siteSettings,
    sameAs: titanLaserSeed.siteSettings.sameAs.map((url) => ({ url }))
  },
  overrideAccess: true
});

const specIds = new Map<string, number>();
for (const spec of titanLaserSeed.technicalSpecs) {
  const created = await payload.create({
    collection: "technicalSpecs",
    data: spec,
    overrideAccess: true
  });
  specIds.set(spec.slug, created.id as number);
}

const expertIds = new Map<string, number>();
for (const expert of titanLaserSeed.experts) {
  const created = await payload.create({
    collection: "experts",
    data: {
      ...expert,
      credentials: toTextRows(expert.credentials, "credential"),
      projectHighlights: toTextRows(expert.projectHighlights, "highlight")
    },
    overrideAccess: true
  });
  expertIds.set(expert.slug, created.id as number);
}

const productIds = new Map<string, number>();
for (const product of titanLaserSeed.products) {
  const created = await payload.create({
    collection: "products",
    data: {
      ...product,
      assistGasTypes: toTextRows(product.assistGasTypes, "gas"),
      complianceStandards: toTextRows(product.complianceStandards, "standard"),
      applicationLimits: toTextRows(product.applicationLimits, "limit"),
      recommendedFor: toTextRows(product.recommendedFor, "application"),
      relatedProductSlugs: toTextRows(product.relatedProductSlugs, "slug"),
      technicalSpecs: ids(product.specSlugs.map((slug) => specIds.get(slug))),
      expert: expertIds.get(product.expertSlug),
      faqs: []
    },
    overrideAccess: true
  });
  productIds.set(product.slug, created.id as number);
}

const caseIds = new Map<string, number>();
for (const caseStudy of titanLaserSeed.caseStudies) {
  const created = await payload.create({
    collection: "caseStudies",
    data: {
      ...caseStudy,
      product: productIds.get(caseStudy.productSlug),
      expert: expertIds.get(caseStudy.expertSlug)
    },
    overrideAccess: true
  });
  caseIds.set(caseStudy.slug, created.id as number);
}

const faqIds = new Map<string, number>();
for (const faq of titanLaserSeed.faqs) {
  const created = await payload.create({
    collection: "faqs",
    data: {
      slug: faq.slug,
      question: faq.question,
      answer: faq.answer,
      relatedProduct: faq.relatedProductSlug ? productIds.get(faq.relatedProductSlug) : undefined,
      relatedCase: faq.relatedCaseSlug ? caseIds.get(faq.relatedCaseSlug) : undefined,
      status: faq.status
    },
    overrideAccess: true
  });
  faqIds.set(faq.slug, created.id as number);
}

for (const product of titanLaserSeed.products) {
  const relatedCases = titanLaserSeed.caseStudies
    .filter((caseStudy) => caseStudy.productSlug === product.slug)
    .map((caseStudy) => caseIds.get(caseStudy.slug));

  await payload.update({
    collection: "products",
    id: productIds.get(product.slug)!,
    data: {
      faqs: ids(product.faqSlugs.map((slug) => faqIds.get(slug))),
      relatedCases: ids(relatedCases)
    },
    overrideAccess: true
  });
}

const pageIds = new Map<string, number>();
for (const page of titanLaserSeed.contentPages) {
  const created = await payload.create({
    collection: "contentPages",
    data: {
      slug: page.slug,
      type: page.type,
      title: page.title,
      seoSummary: page.seoSummary,
      heroAnswer: page.heroAnswer,
      bodyBlocks: page.bodyBlocks,
      relatedProducts: ids(page.relatedProductSlugs.map((slug) => productIds.get(slug))),
      relatedTopics: [],
      expert: page.expertSlug ? expertIds.get(page.expertSlug) : undefined,
      faqs: ids(page.faqSlugs.map((slug) => faqIds.get(slug))),
      claim: page.claim,
      governance: {
        lastReviewedAt: page.lastReviewedAt,
        nextReviewAt: page.nextReviewAt,
        reviewStatus: page.reviewStatus,
        contentOwner: page.contentOwner
      },
      status: page.status
    },
    overrideAccess: true
  });
  pageIds.set(page.slug, created.id as number);
}

for (const page of titanLaserSeed.contentPages) {
  await payload.update({
    collection: "contentPages",
    id: pageIds.get(page.slug)!,
    data: {
      relatedTopics: ids(page.relatedTopicSlugs.map((slug) => pageIds.get(slug)))
    },
    overrideAccess: true
  });
}

console.log("TitanLaser seed completed.");
console.log("Payload admin: http://localhost:3001/admin");
console.log("Admin login: admin@titanlaser.local / TitanLaserDemo123!");

process.exit(0);
