import { generateStaticRoutes } from "./utils/seo/generateStaticRoutes";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    ...generateStaticRoutes(),
    prerender: {
      // Additional prerender options
      crawlLinks: true,
      routes: ["/sitemap.xml"],
      ignore: ["/api/**"],
    },
  },

  routeRules: {
    // Static pages
    "/": { prerender: true },
    "/about": { prerender: true },
    "/contact": { prerender: true },
    "/privacy": { prerender: true },
    "/terms": { prerender: true },

    // Dynamic pages
    "/trip/**": { isr: true }, // Incremental Static Regeneration

    // API routes
    "/api/**": { cors: true },
  },
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  css: ["@/assets/styles/main.scss", "primeicons/primeicons.css"],
  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
      {
        path: "~/components/search",
        pathPrefix: false,
      },
      {
        path: "~/components/layout",
        pathPrefix: false,
      },
      {
        path: "~/components/icons",
        pathPrefix: false,
      },
      {
        path: "~/components/loading",
        pathPrefix: false,
      },
      {
        path: "~/composables",
        pathPrefix: false,
      },
    ],
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: "none",
    },

    components: {
      include: [
        "Button",
        "InputText",
        "InputNumber",
        "Card",
        "ProgressSpinner",
        "AutoComplete",
        "Textarea",
        "Toast",
        "Menu",
        "Dialog",
        "Tabs",
        "TabPanels",
        "TabPanel",
        "Tab",
      ],
    },
    directives: {
      include: ["ripple"],
    },
  },

  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
    },
    server: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
      TRIPADVISOR_API_KEY: process.env.TRIPADVISOR_API_KEY || "",
      SUPABASE_URL: process.env.SUPABASE_URL || "",
      SUPABASE_KEY: process.env.SUPABASE_KEY || "",
      UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL || "",
      UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN || "",
      RATE_LIMIT_VALUE: process.env.RATE_LIMIT_VALUE || "10",
      TRIP_TABLE_NAME: process.env.TRIP_TABLE_NAME || "dev_trips",
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      Inter: [400, 700],
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: ["en"],
    vueI18n: "./i18n.config.ts",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Passe.ai - AI-Powered Road Trip Planner",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#FF5A5F" },
        {
          name: "description",
          content:
            "Plan your perfect road trip with Passe.ai, the AI-powered itinerary builder. Discover hidden gems and create unforgettable memories.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
