import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
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

const siteUrl = process.env.SITE_URL || "http://localhost:4321";
const publicPayloadUrl = process.env.PUBLIC_PAYLOAD_URL || "http://localhost:3001";
const payloadSecret = process.env.PAYLOAD_SECRET || "dev-secret-change-before-production";
const dbAdapter = process.env.DB_ADAPTER || "sqlite";
const databaseUri = process.env.DATABASE_URI || "file:./titanlaser.local.db";
const s3Bucket = process.env.S3_BUCKET;
const s3PublicUrl = process.env.S3_PUBLIC_URL;

const db =
  dbAdapter === "postgres"
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri
        }
      })
    : sqliteAdapter({
        client: {
          url: databaseUri
        }
      });

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " - TitanLaser CMS"
    }
  },
  collections: [Users, Media, TechnicalSpecs, Experts, Products, CaseStudies, Faqs, ContentPages],
  globals: [SiteSettings],
  cors: [siteUrl, publicPayloadUrl],
  csrf: [siteUrl, publicPayloadUrl],
  db,
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql")
  },
  plugins: [
    s3Storage({
      enabled: Boolean(s3Bucket),
      bucket: s3Bucket || "",
      collections: {
        media: {
          disablePayloadAccessControl: true,
          prefix: "media",
          ...(s3PublicUrl
            ? {
                generateFileURL: ({ filename, prefix }) =>
                  [s3PublicUrl.replace(/\/$/, ""), prefix, filename].filter(Boolean).join("/")
              }
            : {})
        }
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ""
        },
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        region: process.env.S3_REGION || "auto"
      }
    })
  ],
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  }
});
