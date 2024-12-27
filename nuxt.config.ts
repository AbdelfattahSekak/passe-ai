import theme from "./theme";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
  ],
  css: [
    "@/assets/styles/main.scss",
    // "primevue/resources/themes/aura-light-green/theme.css",
    "primeicons/primeicons.css",
  ],
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
      theme: {
        preset: theme,
        options: {
          darkModeSelector: "",
        },
      },
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
      RATE_LIMIT_VALUE: process.env.RATE_LIMIT_VALUE || 10,
    },
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
