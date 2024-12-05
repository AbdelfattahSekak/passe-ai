export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@nuxtjs/color-mode"],
  ui: {
    global: true,
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    server: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  },
  googleFonts: {
    families: {
      "DM Sans": [400, 500, 600, 700],
      "Playfair Display": [700],
    },
  },
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "light",
  },
  typescript: {
    strict: true,
  },
});
