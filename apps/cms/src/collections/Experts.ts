import type { CollectionConfig } from "payload";
import { publishedOrAdmin } from "../access/publishedOrAdmin";

export const Experts: CollectionConfig = {
  slug: "experts",
  admin: {
    group: "Trust Proof",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "status"]
  },
  access: {
    read: publishedOrAdmin
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "avatar", type: "text", required: true },
    { name: "bio", type: "textarea", required: true },
    {
      name: "credentials",
      type: "array",
      fields: [{ name: "credential", type: "text", required: true }]
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true }
      ]
    },
    {
      name: "projectHighlights",
      type: "array",
      fields: [{ name: "highlight", type: "text", required: true }]
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
