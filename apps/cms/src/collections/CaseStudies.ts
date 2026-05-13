import type { CollectionConfig } from "payload";
import { publishedOrAdmin } from "../access/publishedOrAdmin";

export const CaseStudies: CollectionConfig = {
  slug: "caseStudies",
  labels: {
    singular: "Case Study",
    plural: "Case Studies"
  },
  admin: {
    group: "Trust Proof",
    useAsTitle: "title",
    defaultColumns: ["title", "country", "customerIndustry", "status"]
  },
  access: {
    read: publishedOrAdmin
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true },
    { name: "customerIndustry", type: "text", required: true },
    { name: "country", type: "text", required: true },
    { name: "painPoint", type: "textarea", required: true },
    { name: "product", type: "relationship", relationTo: "products", required: true },
    { name: "expert", type: "relationship", relationTo: "experts", required: true },
    { name: "heroImage", type: "text", required: true },
    {
      name: "fieldMedia",
      type: "array",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Image", value: "image" },
            { label: "Video", value: "video" }
          ]
        },
        { name: "url", type: "text", required: true },
        { name: "caption", type: "text", required: true },
        { name: "capturedAt", type: "date", required: true },
        { name: "location", type: "text", required: true }
      ]
    },
    {
      name: "measuredResults",
      type: "array",
      fields: [
        { name: "metric", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "context", type: "textarea", required: true }
      ]
    },
    { name: "summary", type: "textarea", required: true },
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
