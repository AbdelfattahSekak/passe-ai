<template>
  <TheNavbar />
  <div class="flex flex-col min-h-screen">
    <TheHeader>
      <SearchForm @submit="handleSearch" />
    </TheHeader>

    <FullScreenLoader
      :show="loading"
      title="Planning Your Adventure"
      message="Crafting the perfect itinerary for you..."
    />

    <main>
      <section aria-labelledby="suggested-trips-heading">
        <TripSuggestions @select="handleTripSelect" />
      </section>

      <section aria-labelledby="features-heading" class="py-12">
        <h2 id="features-heading" class="text-3xl font-bold text-center mb-8">
          Plan Smarter with AI
        </h2>
        <TravelIcons />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTripStore } from "~/stores/trip";
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
    title: "AI Road Trip Planner - Create Your Perfect Journey",
    description:
      "Plan your dream road trip with our AI-powered itinerary builder. Get personalized routes, discover hidden gems, and find the best stops along the way.",
    path: "/",
    keywords: [
      "personalized road trip",
      "smart route planning",
      "travel itinerary generator",
      "road trip stops",
      "travel optimization",
    ],
    schema: {
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
    },
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
        '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: "AIzaSyBtOCyt32wOEftvX3y5nVbHwZkSFfRAT0E", v: "weekly"});',
    },
  ],
});
</script>
