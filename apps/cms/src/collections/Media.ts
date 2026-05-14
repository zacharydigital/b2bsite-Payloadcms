import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    disableLocalStorage: Boolean(process.env.S3_BUCKET),
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
