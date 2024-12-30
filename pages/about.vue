<template>
  <TheNavbar />
  <div class="pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold mb-8">About Passe.ai</h1>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-lg text-gray-600 mb-6">
            Passe.ai is your AI-powered companion for creating unforgettable
            road trip experiences. We combine advanced technology with local
            insights to craft personalized journeys that match your interests
            and travel style.
          </p>
          <p class="text-lg text-gray-600 mb-6">
            Our mission is to make road trip planning effortless while helping
            you discover hidden gems and create lasting memories along the way.
          </p>
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Our Values</h2>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="pi pi-compass text-primary mt-1"></i>
                <div>
                  <h3 class="font-semibold">Innovation</h3>
                  <p class="text-gray-600">
                    Using cutting-edge AI to revolutionize travel planning.
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="pi pi-users text-primary mt-1"></i>
                <div>
                  <h3 class="font-semibold">Community</h3>
                  <p class="text-gray-600">
                    Building connections through shared travel experiences.
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="pi pi-heart text-primary mt-1"></i>
                <div>
                  <h3 class="font-semibold">Passion</h3>
                  <p class="text-gray-600">
                    Dedicated to creating memorable travel experiences.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80"
            alt="Road trip through scenic mountains"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from "~/components/layout/TheNavbar.vue";
import { generateMetaTags } from "~/utils/seo";

useHead(
  generateMetaTags({
    title: "About Us",
    description:
      "Learn about Passe.ai, your AI-powered road trip planning companion. Discover how we help travelers create unforgettable journeys with personalized itineraries.",
    path: "/about",
  })
);

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        mainEntity: {
          "@type": "Organization",
          name: "Passe.ai",
          description: "AI-powered road trip planning platform",
          url: "https://passe.ai",
          sameAs: [
            "https://twitter.com/passeai",
            "https://facebook.com/passeai",
            "https://instagram.com/passeai",
          ],
        },
      }),
    },
  ],
});
</script>
