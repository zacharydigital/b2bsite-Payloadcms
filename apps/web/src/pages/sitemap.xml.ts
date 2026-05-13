import type { APIRoute } from "astro";
import { getCaseStudies, getContentPages, getExperts, getProducts } from "../lib/content";
import { locales, localizedExtraPages, localizedPath } from "../lib/i18n";
import { catalogPages } from "../lib/pageCatalog";
import { solutions } from "../lib/solutions";

export const GET: APIRoute = async ({ site }) => {
  const base = site || "http://localhost:4321";
  const [products, cases, experts, pages] = await Promise.all([getProducts(), getCaseStudies(), getExperts(), getContentPages()]);
  const staticPaths = [
    "/",
    "/about",
    "/products",
    "/products/fiber-laser-cutting-machines",
    "/request-quote",
    "/search",
    "/html-sitemap",
    "/tools/running-cost-calculator",
    "/compare/12kw-vs-30kw-fiber-laser"
  ];
  const localizedUrls = locales.flatMap((locale) => [
    `/${locale}`,
    ...localizedExtraPages.map((page) => localizedPath(page.path, locale)),
    ...catalogPages.map((page) => localizedPath(page.path, locale))
  ]);
  const urls = Array.from(new Set([
    ...staticPaths,
    ...catalogPages.map((page) => page.path),
    ...localizedUrls,
    ...products.map((product) => `/products/${product.slug}`),
    ...cases.map((caseStudy) => `/case-studies/${caseStudy.slug}`),
    ...experts.map((expert) => `/experts/${expert.slug}`),
    ...solutions.map((solution) => `/solutions/${solution.slug}`),
    ...pages.map((page) => {
      if (page.type === "pillar") return `/guides/${page.slug}`;
      if (page.type === "glossary") return `/glossary/${page.slug}`;
      return `/topics/${page.slug}`;
    })
  ]));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${new URL(path, base).toString()}</loc>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
