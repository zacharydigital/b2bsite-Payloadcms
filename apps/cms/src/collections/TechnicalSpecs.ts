import type { CollectionConfig } from "payload";
import { publishedOrAdmin } from "../access/publishedOrAdmin";

export const TechnicalSpecs: CollectionConfig = {
  slug: "technicalSpecs",
  labels: {
    singular: "Technical Spec",
    plural: "Technical Specs"
  },
  admin: {
    group: "Entity Backbone",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "value", "unit", "status"]
  },
  access: {
    read: publishedOrAdmin
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "value", type: "text", required: true },
    { name: "unit", type: "text" },
    { name: "minValue", type: "number" },
    { name: "maxValue", type: "number" },
    { name: "material", type: "text" },
    { name: "condition", type: "textarea" },
    { name: "sourceNote", type: "textarea", required: true },
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
