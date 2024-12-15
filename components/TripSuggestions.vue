<template>
  <section class="mt-20 py-4" aria-labelledby="suggested-trips">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="suggested-trips" class="text-3xl font-bold text-gray-900 mb-8">Popular Road Trips</h2>
      <!-- class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" -->
      <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
         <Card v-for="trip in trips" :key="trip.title" class="w-full flex gap-6 border-none shadow-none cursor-pointer"  @click="selectTrip(trip)">
          <template #header>
            <div class="relative h-[348px] overflow-hidden rounded-xl">
              <img 
                :src="trip.image" 
                :alt="trip.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <!-- <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white">
                {{ trip.duration }}
              </div> -->
            </div>
          </template>
         <!-- <template #header>
            <div class="relative h-48 overflow-hidden rounded-t-xl">
              <img 
                :src="trip.image" 
                :alt="trip.title"
                class="min-w-[300px] min-h-[348ps] object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white">
                {{ trip.duration }}
              </div>
            </div>
          </template>
          
          <template #title>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-white">{{ trip.title }}</h3>
              <span class="text-primary font-medium">{{ trip.distance }}</span>
            </div>
          </template> -->
          
          <template #content>
            <div class="">
              <div class="flex items-center gap-1 text-xs text-gray-500">
                <span class="flex items-center gap-1">
                  <i class="pi pi-calendar"></i>
                  {{ trip.duration }}
                </span>
                <span>.</span>
                <span class="flex items-center gap-1">
                  <i class="pi pi-map-marker"></i>
                  {{ trip.stops }} stops
                </span>
              </div>
              <p class="text-black mt-4">{{ trip.description }}</p>

              <!-- <Button 
                class="w-full flex items-end"
                @click="selectTrip(trip)"
              >
                See Trip
              </Button> -->
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const trips = [
  {
    title: 'Pacific Coast Highway',
    description: 'Drive along California\'s stunning coastline from San Francisco to Los Angeles, experiencing breathtaking ocean views and charming coastal towns.',
    image:"https://cdn.dev.beautifuldestinations.app/533723be-c115-4aac-ae26-afc3cded1d7e/originalThumbnail.jpg",
    duration: '5 days',
    distance: '500 miles',
    stops: 8
  },
  {
    title: 'Route 66 Adventure',
    description: 'Experience the historic Mother Road from Chicago to Santa Monica, discovering vintage Americana and iconic landmarks.',
    image: '	https://cdn.dev.beautifuldestinations.app/441154e1-ec87-4ca6-8f64-0100bd40720f/originalThumbnail.jpg',
    duration: '14 days',
    distance: '2,448 miles',
    stops: 15
  },
  {
    title: 'Blue Ridge Parkway',
    description: 'Wind through the Appalachian Highlands, enjoying spectacular mountain vistas and rich cultural heritage sites.',
    image: '	https://cdn.dev.beautifuldestinations.app/08596c95-9fd9-4b3f-84d9-c01f334b7188/originalThumbnail.jpg',
    duration: '7 days',
    distance: '469 miles',
    stops: 10
  },
  {
    title: 'Blue Ridge Parkway',
    description: 'Wind through the Appalachian Highlands, enjoying spectacular mountain vistas and rich cultural heritage sites.',
    image: '	https://cdn.dev.beautifuldestinations.app/939a1b90-1b93-4a5f-80bf-f15c29b03f6d/originalThumbnail.jpg',
    duration: '7 days',
    distance: '469 miles',
    stops: 10
  }
];


const emit = defineEmits(['select']);

const selectTrip = (trip: any) => {
  emit('select', trip);
};
</script>