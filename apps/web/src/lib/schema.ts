import type { CaseStudy, ContentPage, Expert, Faq, Product, SiteSettings } from "./content";

const absolute = (siteUrl: string, path: string) => new URL(path, siteUrl).toString();

export function organizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.legalName,
    alternateName: settings.brandName,
    url: settings.siteUrl,
    logo: settings.logoUrl,
    email: settings.email,
    telephone: settings.phone,
    sameAs: settings.sameAs,
    address: {
      "@type": "PostalAddress",
      ...settings.address
    }
  };
}

export function websiteSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.brandName,
    url: settings.siteUrl,
    description: settings.tagline
  };
}

export function productSchema(product: Product, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProductModel",
    name: product.title,
    model: product.model,
    brand: {
      "@type": "Brand",
      name: settings.brandName
    },
    manufacturer: organizationSchema(settings),
    image: product.heroImage,
    description: product.shortDescription,
    category: "Fiber laser cutting machine",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Laser power", value: product.powerKw, unitText: "kW" },
      { "@type": "PropertyValue", name: "Positioning accuracy", value: product.positioningAccuracy },
      { "@type": "PropertyValue", name: "Repeat positioning accuracy", value: product.repeatPositioningAccuracy },
      { "@type": "PropertyValue", name: "Servo motor brand", value: product.servoMotorBrand },
      ...product.materialCapabilities.map((capability) => ({
        "@type": "PropertyValue",
        name: `${capability.material} maximum cutting thickness`,
        value: capability.maxThicknessMm,
        unitText: "mm",
        description: `${capability.assistGas} assist gas, recommended ${capability.recommendedThicknessMm}`
      })),
      ...product.technicalSpecs.map((spec) => ({
        "@type": "PropertyValue",
        name: spec.name,
        value: spec.value,
        unitText: spec.unit,
        description: spec.condition || spec.sourceNote
      }))
    ]
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(settings.siteUrl, item.path)
    }))
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function articleSchema(page: ContentPage, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.seoSummary,
    author: page.expert
      ? {
          "@type": "Person",
          name: page.expert.name,
          jobTitle: page.expert.role
        }
      : organizationSchema(settings),
    publisher: organizationSchema(settings),
    mainEntityOfPage: absolute(settings.siteUrl, page.type === "pillar" ? `/guides/${page.slug}` : `/topics/${page.slug}`)
  };
}

export function caseStudySchema(caseStudy: CaseStudy, settings: SiteSettings) {
  const video = caseStudy.fieldMedia.find((item) => item.type === "video");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    image: caseStudy.heroImage,
    author: {
      "@type": "Person",
      name: caseStudy.expert.name,
      jobTitle: caseStudy.expert.role
    },
    publisher: organizationSchema(settings),
    about: {
      "@type": "Product",
      name: caseStudy.product.model
    },
    associatedMedia: video
      ? {
          "@type": "VideoObject",
          name: video.caption,
          contentUrl: video.url,
          uploadDate: video.capturedAt
        }
      : undefined
  };
}

export function personSchema(expert: Expert, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: expert.name,
    jobTitle: expert.role,
    image: expert.avatar,
    description: expert.bio,
    worksFor: organizationSchema(settings),
    sameAs: expert.socialLinks.map((link) => link.url),
    knowsAbout: expert.projectHighlights
  };
}

export function definedTermSchema(page: ContentPage, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: page.title,
    description: page.heroAnswer,
    inDefinedTermSet: `${settings.brandName} Laser Cutting Glossary`
  };
}

export function claimReviewSchema(page: ContentPage, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    claimReviewed: page.claim?.claimText,
    reviewRating: {
      "@type": "Rating",
      alternateName: page.claim?.verdict
    },
    author: organizationSchema(settings)
  };
}
