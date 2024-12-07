<template>
  <div 
    ref="mapContainer" 
    class="w-full h-full rounded-lg shadow-md"
    role="region"
    aria-label="Interactive Map"
  >
    <div v-if="!mapLoaded" class="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <ProgressSpinner aria-label="Loading map..." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const props = defineProps<{
  stops: Array<{
    title: string;
    coordinates: string;
    details: string;
  }>;
}>();

const config = useRuntimeConfig();
const mapContainer = ref<HTMLElement | null>(null);
const mapLoaded = ref(false);
let map: google.maps.Map | null = null;
let markers: google.maps.Marker[] = [];
let directionsService: google.maps.DirectionsService | null = null;
let directionsRenderer: google.maps.DirectionsRenderer | null = null;

onMounted(async () => {
  const loader = new Loader({
    apiKey: config.public.googleMapsApiKey,
    libraries: ['places']
  });

  await loader.load();
  await initMap();
  mapLoaded.value = true;
});

const initMap = async () => {
  if (!mapContainer.value) return;

  map = new google.maps.Map(mapContainer.value, {
    zoom: 4,
    center: { lat: 39.8283, lng: -98.5795 },
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ],
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
    gestureHandling: 'cooperative'
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map,
    suppressMarkers: true
  });
};

watch(() => props.stops, (newStops) => {
  if (!map || !newStops.length) return;
  
  // Clear existing markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  // Add new markers and update route
  newStops.forEach((stop, index) => {
    const [lat, lng] = stop.coordinates.split(',').map(Number);
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      title: stop.title,
      label: String(index + 1),
      animation: google.maps.Animation.DROP
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-4">
          <h3 class="font-bold mb-2">${stop.title}</h3>
          <p>${stop.details}</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    
    markers.push(marker);
  });

  updateRoute();
}, { deep: true });

const updateRoute = () => {
  if (!directionsService || !directionsRenderer || props.stops.length < 2) return;

  const origin = props.stops[0];
  const destination = props.stops[props.stops.length - 1];
  const waypoints = props.stops.slice(1, -1).map(stop => ({
    location: new google.maps.LatLng(
      ...stop.coordinates.split(',').map(Number)
    ),
    stopover: true
  }));

  directionsService.route({
    origin: new google.maps.LatLng(
      ...origin.coordinates.split(',').map(Number)
    ),
    destination: new google.maps.LatLng(
      ...destination.coordinates.split(',').map(Number)
    ),
    waypoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, (result, status) => {
    if (status === 'OK' && result) {
      directionsRenderer?.setDirections(result);
    }
  });
};
</script>