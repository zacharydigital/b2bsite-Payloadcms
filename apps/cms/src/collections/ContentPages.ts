import type { CollectionConfig } from "payload";
import { publishedOrAdmin } from "../access/publishedOrAdmin";

export const ContentPages: CollectionConfig = {
  slug: "contentPages",
  labels: {
    singular: "Content Page",
    plural: "Content Pages"
  },
  admin: {
    group: "Semantic Content",
    useAsTitle: "title",
    defaultColumns: ["title", "type", "reviewStatus", "status"]
  },
  access: {
    read: publishedOrAdmin
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Pillar", value: "pillar" },
        { label: "Cluster", value: "cluster" },
        { label: "Glossary", value: "glossary" },
        { label: "Claim Review", value: "claimReview" }
      ]
    },
    { name: "title", type: "text", required: true },
    { name: "seoSummary", type: "textarea", required: true },
    { name: "heroAnswer", type: "textarea", required: true },
    {
      name: "bodyBlocks",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "content", type: "textarea", required: true }
      ]
    },
    { name: "relatedProducts", type: "relationship", relationTo: "products", hasMany: true },
    { name: "relatedTopics", type: "relationship", relationTo: "contentPages", hasMany: true },
    { name: "expert", type: "relationship", relationTo: "experts" },
    { name: "faqs", type: "relationship", relationTo: "faqs", hasMany: true },
    {
      name: "claim",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData.type === "claimReview"
      },
      fields: [
        { name: "claimText", type: "textarea" },
        { name: "verdict", type: "textarea" },
        { name: "reviewedBy", type: "text" }
      ]
    },
    {
      name: "governance",
      type: "group",
      fields: [
        { name: "lastReviewedAt", type: "date", required: true },
        { name: "nextReviewAt", type: "date", required: true },
        {
          name: "reviewStatus",
          type: "select",
          required: true,
          defaultValue: "fresh",
          options: [
            { label: "Fresh", value: "fresh" },
            { label: "Review Soon", value: "review-soon" },
            { label: "Stale", value: "stale" }
          ]
        },
        { name: "contentOwner", type: "text", required: true }
      ]
    },
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
