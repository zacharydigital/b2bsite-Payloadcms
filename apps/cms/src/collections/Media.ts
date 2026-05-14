import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    disableLocalStorage: true,
    crop: false,
    focalPoint: false
  },
  admin: {
    group: "Core",
    useAsTitle: "alt"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true
    },
    {
      name: "caption",
      type: "text"
    }
  ]
};
