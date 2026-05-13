import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Site Settings",
  admin: {
    group: "Core"
  },
  access: {
    read: () => true
  },
  fields: [
    { name: "brandName", type: "text", required: true },
    { name: "legalName", type: "text", required: true },
    { name: "tagline", type: "textarea", required: true },
    { name: "siteUrl", type: "text", required: true },
    { name: "logoUrl", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    {
      name: "address",
      type: "group",
      fields: [
        { name: "streetAddress", type: "text", required: true },
        { name: "addressLocality", type: "text", required: true },
        { name: "addressRegion", type: "text", required: true },
        { name: "postalCode", type: "text", required: true },
        { name: "addressCountry", type: "text", required: true }
      ]
    },
    {
      name: "sameAs",
      type: "array",
      fields: [{ name: "url", type: "text", required: true }]
    }
  ]
};
