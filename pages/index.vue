<template>
  <div class="bg-white flex flex-col min-h-screen">
    <TheNavbar />

    <div class="fixed top-[60px] left-0 right-0 z-40">
      <TheHeader>
        <SearchForm @submit="handleSearch" />
      </TheHeader>
    </div>

    <div class="mt-[calc(20vh+60px)]">
      <template v-if="!itinerary">
        <TripSuggestions @select="handleTripSelect" />
        <TravelIcons />
      </template>

      <template v-else>
        <main
          class="relative flex flex-col sm:flex-col md:flex-row gap-4"
          role="main"
        >
          <div
            class="w-full md:w-1/2 bg-white order-2 sm:order-2 md:order-1"
            role="complementary"
            aria-label="Trip Itinerary"
          >
            <TripItinerary title="Your dream trip" :stops="itinerary.stops" />
          </div>

          <div
            class="w-full md:w-1/2 order-1 sm:order-1 md:order-2"
            role="complementary"
            aria-label="Trip Map"
          >
            <div class="sticky top-[calc(20vh+60px)]">
              <TripMap :stops="itinerary.stops" />
            </div>
          </div>
        </main>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// import dummyData from "~/mocks/inference.json";
import { generateMetaTags } from "~/utils/seo";
import type { SearchFormData, Trip } from "~/types";

const itinerary = ref<Trip | null>(null);

const handleSearch = async (formData: SearchFormData) => {
  try {
    const result = (await $fetch("/api/inference", {
      method: "POST",
      body: formData,
    })) as Trip;
    itinerary.value = result;
  } catch (error) {
    console.error("Error processing itinerary:", error);
  }
};

const handleTripSelect = async (trip: Trip) => {};

useHead(
  generateMetaTags({
    title: "AI-Powered Road Trip Planner",
    description:
      "Plan your perfect road trip with Passe.ai. Our AI-powered itinerary builder helps you discover hidden gems and create unforgettable memories.",
    path: "/",
  })
);

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Passe.ai",
        description:
          "AI-powered road trip planner helping travelers create personalized itineraries.",
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Passe.ai",
          url: "https://passe.ai",
        },
      }),
    },
    {
      async: true,
      children:
        '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: "AIzaSyDIjoG678cuWVehcMzTaOeM_qPPKdBc5tQ", v: "weekly"});',
    },
  ],
});
</script>

<style>
.sticky {
  position: sticky;
  transition: all 0.3s ease;
}
</style>
