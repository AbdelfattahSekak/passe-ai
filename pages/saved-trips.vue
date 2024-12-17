<template>
  <div class="pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Saved Trips</h1>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <i class="pi pi-plus"></i>
          Plan New Trip
        </NuxtLink>
      </div>

      <div v-if="savedTrips.length === 0" class="text-center py-12">
        <i class="pi pi-map text-6xl text-gray-300 mb-4"></i>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          No saved trips yet
        </h2>
        <p class="text-gray-600 mb-6">Start planning your next adventure!</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <i class="pi pi-plus"></i>
          Create New Trip
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="trip in savedTrips" :key="trip.id" class="relative">
          <template #header>
            <div class="relative h-48 overflow-hidden rounded-t-xl">
              <!-- <img 
                :src="trip.stops[0].images[0].url"
                :alt="trip.stops[0].images[0].description"
                class="w-full h-full object-cover"
              /> -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-xl font-semibold text-white">
                  {{ trip.start }} to {{ trip.destination }}
                </h3>
                <p class="text-white/90 text-sm">
                  {{ trip.stops.length }} stops
                </p>
              </div>
            </div>
          </template>

          <template #content>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                  Created {{ new Date(trip.createdAt).toLocaleDateString() }}
                </span>
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="deleteTrip(trip.id)"
                  aria-label="Delete trip"
                />
              </div>

              <Button class="w-full" @click="viewTrip(trip)">
                View Details
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { savedTrips, deleteTrip } = useSavedTrips();
const router = useRouter();

const viewTrip = (trip: any) => {
  router.push({
    path: "/",
    query: { tripId: trip.id },
  });
};

useHead(
  generateMetaTags({
    title: "Saved Trips",
    description: "View and manage your saved road trip itineraries.",
    path: "/saved-trips",
  })
);
</script>
