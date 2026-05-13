import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { CaseStudies } from "./collections/CaseStudies";
import { ContentPages } from "./collections/ContentPages";
import { Experts } from "./collections/Experts";
import { Faqs } from "./collections/Faqs";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { TechnicalSpecs } from "./collections/TechnicalSpecs";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " - TitanLaser CMS"
    }
  },
  collections: [Users, Media, TechnicalSpecs, Experts, Products, CaseStudies, Faqs, ContentPages],
  globals: [SiteSettings],
  cors: [process.env.SITE_URL || "http://localhost:4321"],
  csrf: [process.env.SITE_URL || "http://localhost:4321"],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./titanlaser.db"
    }
  }),
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql")
  },
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-before-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  }
});
