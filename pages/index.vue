<template>
  <div class="bg-white flex flex-col min-h-screen">
    <TheNavbar />

    <div class="fixed top-[60px] left-0 right-0 z-40">
      <TheHeader>
        <SearchForm @submit="handleSearch" />
      </TheHeader>
    </div>

    <FullScreenLoader
      :show="loading"
      title="Planning Your Adventure"
      message="Crafting the perfect itinerary for you..."
    />
    <div class="mt-[calc(20vh+60px)]">
      <TripSuggestions @select="handleTripSelect" />
      <TravelIcons />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTripStore } from "~/stores/useTripStore";
import type { SearchFormData, Trip } from "~/types";

const router = useRouter();
const tripStore = useTripStore();
const error = ref<string | null>(null);
const loading = ref(false);

async function handleSearch(formData: SearchFormData) {
  try {
    loading.value = true;
    const response = await $fetch("/api/inference", {
      method: "POST",
      body: formData,
    });
    const trip = response as Trip;
    tripStore.setTrip(trip);
    await navigateTo(`/trip/${trip.id}`);
  } catch (err) {
    error.value = "Failed to create trip. Please try again.";
    console.error("Error creating trip:", err);
  } finally {
    loading.value = false;
  }
}

function handleTripSelect(trip: Trip) {
  tripStore.setTrip(trip);
  router.push(`/trip/${trip.id}`);
}

// Clear trip data when leaving the page
onBeforeUnmount(() => {
  tripStore.clearTrip();
});

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
