import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Admin",
    useAsTitle: "email"
  },
  fields: [
    {
      name: "name",
      type: "text"
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" }
      ]
    }
  ]
};
