<template>
  <div class="bg-white flex flex-col min-h-screen">
    <TheNavbar />

    <div class="fixed top-[60px] left-0 right-0 z-40">
      <TheHeader>
        <SearchForm v-model="searchParams" @submit="handleSearch" />
      </TheHeader>
    </div>

    <FullScreenLoader
      :show="loading"
      title="Planning Your Adventure"
      message="Crafting the perfect itinerary for you..."
    />

    <div v-if="!loading && itinerary" class="mt-[calc(20vh+60px)]">
      <main
        class="relative flex flex-col sm:flex-col md:flex-row gap-4"
        role="main"
      >
        <div
          class="w-full md:w-1/2 bg-white order-2 sm:order-2 md:order-1"
          role="complementary"
          aria-label="Trip Itinerary"
        >
          <TripItinerary :title="itinerary.title" :stops="itinerary.stops" />
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
    </div>

    <div v-if="error" class="mt-[calc(20vh+60px)] p-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ error }}</h2>
      <Button @click="retryLoad" label="Try Again" class="p-button-primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "~/stores/useSearchStore";
import type { SearchFormData, Trip } from "~/types";

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

const loading = ref(true);
const error = ref<string | null>(null);
const itinerary = ref<Trip | null>(null);
const searchParams = computed(() => searchStore.searchParams);

async function loadTripData() {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch(`/api/trip/${route.params.id}`);
    itinerary.value = response as Trip;
  } catch (err) {
    error.value = "Failed to load trip details. Please try again.";
    console.error("Error loading trip:", err);
  } finally {
    loading.value = false;
  }
}

async function handleSearch(formData: SearchFormData) {
  try {
    const response = await $fetch("/api/trip", {
      method: "POST",
      body: formData,
    });

    const newTrip = response as Trip;
    router.push(`/trip/${newTrip.id}`);
  } catch (err) {
    error.value = "Failed to create trip. Please try again.";
    console.error("Error creating trip:", err);
  }
}

function retryLoad() {
  loadTripData();
}

onMounted(() => {
  loadTripData();
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
