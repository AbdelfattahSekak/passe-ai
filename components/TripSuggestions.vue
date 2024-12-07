<template>
  <section class="py-16 bg-white" aria-labelledby="suggested-trips">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="suggested-trips" class="text-3xl font-bold text-gray-900 mb-8">Popular Road Trips</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="trip in trips" :key="trip.title" class="border-0">
          <template #header>
            <div class="relative h-48 overflow-hidden rounded-t-xl">
              <img 
                :src="trip.image" 
                :alt="trip.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-900">
                {{ trip.duration }}
              </div>
            </div>
          </template>
          
          <template #title>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-900">{{ trip.title }}</h3>
              <span class="text-primary font-medium">{{ trip.distance }}</span>
            </div>
          </template>
          
          <template #content>
            <div class="space-y-4">
              <p class="text-gray-600">{{ trip.description }}</p>
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <i class="pi pi-map-marker"></i>
                  {{ trip.stops }} stops
                </span>
                <span class="flex items-center gap-1">
                  <i class="pi pi-clock"></i>
                  {{ trip.duration }}
                </span>
              </div>
              <Button 
                class="w-full"
                @click="selectTrip(trip)"
              >
                View Itinerary
              </Button>
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
    image: 'https://images.unsplash.com/photo-1540820658620-e933c0ec78aa?auto=format&fit=crop&q=80',
    duration: '5 days',
    distance: '500 miles',
    stops: 8
  },
  {
    title: 'Route 66 Adventure',
    description: 'Experience the historic Mother Road from Chicago to Santa Monica, discovering vintage Americana and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&q=80',
    duration: '14 days',
    distance: '2,448 miles',
    stops: 15
  },
  {
    title: 'Blue Ridge Parkway',
    description: 'Wind through the Appalachian Highlands, enjoying spectacular mountain vistas and rich cultural heritage sites.',
    image: 'https://images.unsplash.com/photo-1635355955841-06d40b64230a?auto=format&fit=crop&q=80',
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