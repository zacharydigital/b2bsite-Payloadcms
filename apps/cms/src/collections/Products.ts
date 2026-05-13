import type { CollectionConfig } from "payload";
import { publishedOrAdmin } from "../access/publishedOrAdmin";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Entity Backbone",
    useAsTitle: "model",
    defaultColumns: ["model", "series", "powerKw", "status"]
  },
  access: {
    read: publishedOrAdmin
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "model", type: "text", required: true },
    { name: "series", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "shortDescription", type: "textarea", required: true },
    { name: "heroImage", type: "text", required: true },
    { name: "powerKw", type: "number", required: true, min: 1 },
    { name: "positioningAccuracy", type: "text", required: true },
    { name: "repeatPositioningAccuracy", type: "text", required: true },
    { name: "servoMotorBrand", type: "text", required: true },
    {
      name: "assistGasTypes",
      type: "array",
      fields: [{ name: "gas", type: "text", required: true }]
    },
    {
      name: "complianceStandards",
      type: "array",
      fields: [{ name: "standard", type: "text", required: true }]
    },
    {
      name: "applicationLimits",
      type: "array",
      fields: [{ name: "limit", type: "textarea", required: true }]
    },
    {
      name: "recommendedFor",
      type: "array",
      fields: [{ name: "application", type: "text", required: true }]
    },
    {
      name: "galleryMedia",
      type: "array",
      admin: { description: "PDP gallery images, video poster, and 360 preview." },
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Image", value: "image" },
            { label: "Video", value: "video" },
            { label: "360 Preview", value: "360" }
          ]
        },
        { name: "url", type: "text", required: true },
        { name: "alt", type: "text", required: true },
        { name: "caption", type: "text", required: true },
        { name: "priority", type: "checkbox", defaultValue: false }
      ]
    },
    {
      name: "commercialTerms",
      type: "group",
      fields: [
        { name: "moq", type: "text", required: true },
        { name: "leadTime", type: "text", required: true },
        { name: "payment", type: "text", required: true },
        { name: "sample", type: "text", required: true },
        { name: "packaging", type: "text", required: true },
        { name: "exportMarkets", type: "text", required: true }
      ]
    },
    {
      name: "featureAdvantages",
      type: "array",
      admin: { description: "FABE rows: Feature, Advantage, Benefit, Evidence." },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "feature", type: "textarea", required: true },
        { name: "advantage", type: "textarea", required: true },
        { name: "benefit", type: "textarea", required: true },
        { name: "evidence", type: "textarea", required: true },
        { name: "image", type: "text", required: true },
        { name: "reportLink", type: "text" }
      ]
    },
    {
      name: "applications",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "summary", type: "textarea", required: true },
        { name: "image", type: "text", required: true },
        { name: "linkedSolutionPath", type: "text", required: true }
      ]
    },
    {
      name: "certifications",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "level",
          type: "select",
          required: true,
          options: [
            { label: "Product", value: "product" },
            { label: "Factory", value: "factory" }
          ]
        },
        { name: "issuer", type: "text", required: true },
        { name: "certificateNo", type: "text", required: true },
        { name: "validUntil", type: "text", required: true },
        { name: "image", type: "text", required: true },
        { name: "requestable", type: "checkbox", defaultValue: true }
      ]
    },
    {
      name: "manufacturingQc",
      type: "group",
      fields: [
        {
          name: "processSteps",
          type: "array",
          fields: [
            { name: "step", type: "text", required: true },
            { name: "detail", type: "textarea", required: true }
          ]
        },
        { name: "capacityText", type: "text", required: true },
        {
          name: "factoryImages",
          type: "array",
          fields: [
            { name: "url", type: "text", required: true },
            { name: "alt", type: "text", required: true },
            { name: "caption", type: "text", required: true }
          ]
        },
        { name: "walkthroughVideo", type: "text" }
      ]
    },
    {
      name: "downloads",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Datasheet", value: "datasheet" },
            { label: "Catalog", value: "catalog" },
            { label: "Installation Guide", value: "installationGuide" },
            { label: "Compliance Pack", value: "compliancePack" }
          ]
        },
        { name: "pages", type: "number", required: true },
        { name: "fileLabel", type: "text", required: true },
        { name: "gateRequired", type: "checkbox", defaultValue: true }
      ]
    },
    {
      name: "inquiryDefaults",
      type: "group",
      fields: [
        { name: "replySla", type: "text", required: true },
        { name: "privacyPromise", type: "textarea", required: true },
        { name: "ndaAvailable", type: "checkbox", defaultValue: true },
        { name: "whatsappUrl", type: "text", required: true },
        { name: "socialProofText", type: "text", required: true }
      ]
    },
    {
      name: "relatedProductSlugs",
      type: "array",
      admin: { description: "Fallback related product slugs used by the frontend seed data." },
      fields: [{ name: "slug", type: "text", required: true }]
    },
    {
      name: "trackingMeta",
      type: "group",
      fields: [
        { name: "category", type: "text", required: true },
        { name: "primaryApplication", type: "text", required: true },
        { name: "conversionGoal", type: "text", required: true }
      ]
    },
    {
      name: "materialCapabilities",
      type: "array",
      required: true,
      fields: [
        { name: "material", type: "text", required: true },
        { name: "maxThicknessMm", type: "number", required: true },
        { name: "recommendedThicknessMm", type: "text", required: true },
        { name: "assistGas", type: "text", required: true },
        { name: "cuttingSpeedMMin", type: "number", required: true }
      ]
    },
    { name: "technicalSpecs", type: "relationship", relationTo: "technicalSpecs", hasMany: true },
    { name: "relatedCases", type: "relationship", relationTo: "caseStudies", hasMany: true },
    { name: "expert", type: "relationship", relationTo: "experts", required: true },
    { name: "faqs", type: "relationship", relationTo: "faqs", hasMany: true },
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
