import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react()],
  site: process.env.SITE_URL || "http://localhost:4321"
});
