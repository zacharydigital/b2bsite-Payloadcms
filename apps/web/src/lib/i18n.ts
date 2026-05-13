import type { CatalogPage } from "./pageCatalog";

export const locales = ["en", "es", "de", "pt"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { name: string; nativeName: string; htmlLang: string; marketNote: string }> = {
  en: {
    name: "English",
    nativeName: "English",
    htmlLang: "en",
    marketNote: "Global export buyers, distributors, and engineering teams"
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    htmlLang: "es",
    marketNote: "Compradores de España y Latinoamérica que evalúan maquinaria láser industrial"
  },
  de: {
    name: "German",
    nativeName: "Deutsch",
    htmlLang: "de",
    marketNote: "Einkauf, Technik und Compliance-Teams im DACH- und EU-Markt"
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português",
    htmlLang: "pt",
    marketNote: "Compradores do Brasil, Portugal e mercados lusófonos de exportação"
  }
};

export const uiCopy: Record<
  Locale,
  {
    localizedVersion: string;
    globalDemo: string;
    buyerIntent: string;
    modules: string;
    products: string;
    related: string;
    rfqTitle: string;
    rfqBody: string;
    openPage: string;
    homeTitle: string;
    homeDescription: string;
    homeLead: string;
    languageHub: string;
  }
> = {
  en: {
    localizedVersion: "Localized B2B page",
    globalDemo: "TitanLaser multilingual export site demo",
    buyerIntent: "Buyer intent handled on this page",
    modules: "Localized content modules",
    products: "Relevant TitanLaser products",
    related: "Related pages in this language",
    rfqTitle: "Ask TitanLaser about this page",
    rfqBody: "Share your product, market, delivery, and compliance requirements. The RFQ flow keeps language and market context attached to the inquiry.",
    openPage: "Open page",
    homeTitle: "TitanLaser multilingual export site",
    homeDescription: "English content version for global buyers evaluating high-power fiber laser cutting machines.",
    homeLead: "Choose a language version and continue through localized product, compliance, RFQ, and market pages.",
    languageHub: "Language hub"
  },
  es: {
    localizedVersion: "Página B2B localizada",
    globalDemo: "Demo multilingüe de exportación TitanLaser",
    buyerIntent: "Intención del comprador cubierta en esta página",
    modules: "Módulos de contenido localizado",
    products: "Productos TitanLaser relacionados",
    related: "Páginas relacionadas en este idioma",
    rfqTitle: "Consulte a TitanLaser sobre esta página",
    rfqBody: "Comparta producto, mercado, entrega y requisitos de cumplimiento. El flujo RFQ conserva el idioma y el contexto del mercado.",
    openPage: "Abrir página",
    homeTitle: "Sitio multilingüe de exportación TitanLaser",
    homeDescription: "Versión en español para compradores que evalúan máquinas de corte láser de fibra de alta potencia.",
    homeLead: "Seleccione una versión de idioma y continúe por páginas localizadas de producto, cumplimiento, RFQ y mercado.",
    languageHub: "Centro de idiomas"
  },
  de: {
    localizedVersion: "Lokalisierte B2B-Seite",
    globalDemo: "Mehrsprachige TitanLaser Export-Demo",
    buyerIntent: "Kaufabsicht auf dieser Seite",
    modules: "Lokalisierte Inhaltsmodule",
    products: "Relevante TitanLaser Produkte",
    related: "Verwandte Seiten in dieser Sprache",
    rfqTitle: "TitanLaser zu dieser Seite anfragen",
    rfqBody: "Teilen Sie Produkt-, Markt-, Liefer- und Compliance-Anforderungen. Der RFQ-Prozess übernimmt Sprache und Marktkontext.",
    openPage: "Seite öffnen",
    homeTitle: "Mehrsprachige TitanLaser Export-Website",
    homeDescription: "Deutsche Inhaltsversion für Käufer von Hochleistungs-Faserlaserschneidanlagen.",
    homeLead: "Wählen Sie eine Sprachversion und öffnen Sie lokalisierte Produkt-, Compliance-, RFQ- und Marktseiten.",
    languageHub: "Sprachzentrum"
  },
  pt: {
    localizedVersion: "Página B2B localizada",
    globalDemo: "Demo multilíngue de exportação TitanLaser",
    buyerIntent: "Intenção do comprador nesta página",
    modules: "Módulos de conteúdo localizado",
    products: "Produtos TitanLaser relacionados",
    related: "Páginas relacionadas neste idioma",
    rfqTitle: "Fale com a TitanLaser sobre esta página",
    rfqBody: "Informe produto, mercado, entrega e requisitos de conformidade. O fluxo de RFQ mantém idioma e contexto do mercado.",
    openPage: "Abrir página",
    homeTitle: "Site multilíngue de exportação TitanLaser",
    homeDescription: "Versão em português para compradores que avaliam máquinas de corte a laser de fibra de alta potência.",
    homeLead: "Escolha uma versão de idioma e avance por páginas localizadas de produto, conformidade, RFQ e mercado.",
    languageHub: "Central de idiomas"
  }
};

const titleOverrides: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "Privacy Policy": "Política de privacidad",
    "Cookie Policy and Consent Center": "Política de cookies y centro de consentimiento",
    "Terms of Service": "Términos del servicio",
    "Website Terms of Use": "Condiciones de uso del sitio web",
    "Anti-Bribery and Compliance Statement": "Declaración anticorrupción y de cumplimiento",
    "ESG and Sustainability": "ESG y sostenibilidad",
    "Supply Chain Due Diligence": "Debida diligencia de la cadena de suministro",
    "Accessibility Statement": "Declaración de accesibilidad",
    "Language and Hreflang Hub": "Centro de idiomas y hreflang",
    "Region and Currency Switcher": "Selector de región y moneda",
    "Maintenance Page": "Página de mantenimiento",
    "Quote Cart for Multi-Model Laser RFQs": "Carrito de cotización para RFQ láser multimodelo",
    "Fiber Laser Product Configurator and Selector": "Configurador y selector de láser de fibra",
    "Technical Datasheet Downloads": "Descargas de fichas técnicas",
    "Contact TitanLaser Global Sales and Engineering": "Contactar ventas e ingeniería global de TitanLaser"
  },
  de: {
    "Privacy Policy": "Datenschutzerklärung",
    "Cookie Policy and Consent Center": "Cookie-Richtlinie und Einwilligungscenter",
    "Terms of Service": "Servicebedingungen",
    "Website Terms of Use": "Nutzungsbedingungen der Website",
    "Anti-Bribery and Compliance Statement": "Anti-Korruptions- und Compliance-Erklärung",
    "ESG and Sustainability": "ESG und Nachhaltigkeit",
    "Supply Chain Due Diligence": "Sorgfaltspflicht in der Lieferkette",
    "Accessibility Statement": "Erklärung zur Barrierefreiheit",
    "Language and Hreflang Hub": "Sprach- und Hreflang-Zentrum",
    "Region and Currency Switcher": "Regions- und Währungsumschalter",
    "Maintenance Page": "Wartungsseite",
    "Quote Cart for Multi-Model Laser RFQs": "Anfragekorb für mehrere Lasermodelle",
    "Fiber Laser Product Configurator and Selector": "Konfigurator und Selektor für Faserlaser",
    "Technical Datasheet Downloads": "Downloads technischer Datenblätter",
    "Contact TitanLaser Global Sales and Engineering": "TitanLaser Vertrieb und Technik kontaktieren"
  },
  pt: {
    "Privacy Policy": "Política de privacidade",
    "Cookie Policy and Consent Center": "Política de cookies e centro de consentimento",
    "Terms of Service": "Termos de serviço",
    "Website Terms of Use": "Termos de uso do site",
    "Anti-Bribery and Compliance Statement": "Declaração anticorrupção e de conformidade",
    "ESG and Sustainability": "ESG e sustentabilidade",
    "Supply Chain Due Diligence": "Due diligence da cadeia de suprimentos",
    "Accessibility Statement": "Declaração de acessibilidade",
    "Language and Hreflang Hub": "Central de idiomas e hreflang",
    "Region and Currency Switcher": "Seletor de região e moeda",
    "Maintenance Page": "Página de manutenção",
    "Quote Cart for Multi-Model Laser RFQs": "Carrinho de cotação para RFQs de laser",
    "Fiber Laser Product Configurator and Selector": "Configurador e seletor de laser de fibra",
    "Technical Datasheet Downloads": "Downloads de fichas técnicas",
    "Contact TitanLaser Global Sales and Engineering": "Contato com vendas e engenharia global TitanLaser"
  }
};

export function localizedTitle(title: string, locale: Locale) {
  return titleOverrides[locale][title] || title;
}

export function localizedDescription(page: CatalogPage, locale: Locale) {
  if (locale === "en") return page.description;
  const intro = {
    es: "Versión localizada para compradores internacionales.",
    de: "Lokalisierte Version für internationale Käufer.",
    pt: "Versão localizada para compradores internacionais."
  }[locale];
  return `${intro} ${page.description}`;
}

export function localizedPath(path: string, locale: Locale) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function localizedAlternates(path: string, siteUrl: string) {
  return [
    ...locales.map((locale) => ({ lang: locale, href: new URL(localizedPath(path, locale), siteUrl).toString() })),
    { lang: "x-default", href: new URL(path, siteUrl).toString() }
  ];
}

export function getLocale(value: string | undefined): Locale | undefined {
  return locales.find((locale) => locale === value);
}

export const localizedExtraPages: CatalogPage[] = [
  {
    number: 2,
    path: "/products",
    group: "Commercial conversion",
    title: "Fiber Laser Cutting Machines",
    kicker: "PLP / product category",
    description:
      "Localized product listing page for filtering TitanLaser fiber laser cutting machines by power, material capability, application, and export compliance.",
    image: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=1800&q=82",
    audience: "international buyers comparing product categories in their preferred language",
    primaryCta: { label: "Build quote cart", href: "/quote-cart" },
    secondaryCta: { label: "Use product selector", href: "/product-selector" },
    highlights: ["Localized PLP route", "Product filtering context", "RFQ handoff"],
    sections: [
      {
        heading: "Localized product discovery",
        body: "This language version introduces the same product category intent as the English PLP while preserving regional RFQ context.",
        items: [
          "Compare TL-FC3015-12KW and TL-GigaCut-30KW",
          "Review material capability and compliance expectations",
          "Continue to the quote cart or product selector in the selected language path"
        ]
      },
      {
        heading: "SEO and hreflang behavior",
        body: "Localized PLP pages should be reciprocal hreflang alternates of the global product category.",
        items: [
          "Each language path keeps its own canonical URL",
          "Product claims remain tied to the same structured data backbone",
          "The RFQ flow carries language and market preference into CRM context"
        ]
      },
      {
        heading: "Buyer conversion route",
        body: "The localized PLP connects product discovery to quote, selector, downloads, and contact pages.",
        items: [
          "Add products into RFQ cart",
          "Use selector for model recommendation",
          "Contact sales with market-specific assumptions"
        ]
      }
    ]
  }
];
