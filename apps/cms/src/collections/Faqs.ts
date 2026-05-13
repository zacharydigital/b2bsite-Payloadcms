import type { CollectionConfig } from "payload";
import { publishedOrAdmin } from "../access/publishedOrAdmin";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "FAQ",
    plural: "FAQs"
  },
  admin: {
    group: "AEO Modules",
    useAsTitle: "question",
    defaultColumns: ["question", "relatedProduct", "status"]
  },
  access: {
    read: publishedOrAdmin
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "relatedProduct", type: "relationship", relationTo: "products" },
    { name: "relatedCase", type: "relationship", relationTo: "caseStudies" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" }
      ]
    }
  ]
};
