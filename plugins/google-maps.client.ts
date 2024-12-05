import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  if (import.meta.client) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }
});
