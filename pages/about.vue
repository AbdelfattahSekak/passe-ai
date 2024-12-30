<template>
  <TheNavbar />

  <!-- Hero Section -->
  <div class="relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1
            class="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-800 to-primary-400 bg-clip-text text-transparent"
          >
            About Passe.ai
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Your AI-powered companion for creating unforgettable road trip
            experiences. We combine advanced technology with local insights to
            craft personalized journeys that match your interests and travel
            style.
          </p>
        </div>
        <div
          class="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl transform md:translate-y-8"
        >
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80"
            alt="Road trip through scenic mountains"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Values Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 class="text-3xl font-bold mb-12 text-center">Our Values</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <i :class="`pi ${value.icon} text-3xl text-primary mb-4`"></i>
        <h3 class="text-xl font-semibold mb-3">{{ value.title }}</h3>
        <p class="text-gray-600">{{ value.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from "~/components/layout/TheNavbar.vue";
import { generateMetaTags } from "~/utils/seo";

const values = [
  {
    icon: "pi-compass",
    title: "Innovation",
    description:
      "Using cutting-edge AI to revolutionize travel planning and create smarter journeys.",
  },
  {
    icon: "pi-users",
    title: "Community",
    description:
      "Building meaningful connections through shared travel experiences and stories.",
  },
  {
    icon: "pi-heart",
    title: "Passion",
    description:
      "Dedicated to creating memorable travel experiences that last a lifetime.",
  },
];

const team = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    socials: [
      { icon: "pi-twitter", link: "#" },
      { icon: "pi-linkedin", link: "#" },
    ],
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    socials: [
      { icon: "pi-twitter", link: "#" },
      { icon: "pi-linkedin", link: "#" },
    ],
  },
  {
    name: "Mike Johnson",
    role: "Head of Design",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    socials: [
      { icon: "pi-twitter", link: "#" },
      { icon: "pi-linkedin", link: "#" },
    ],
  },
];

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

<style scoped>
.p-button-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}
</style>
