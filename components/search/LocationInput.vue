<template>
  <div
    class="flex items-center gap-3 cursor-pointer group hover:bg-gray-50/50 p-2 rounded-xl transition-colors duration-200"
    @click="focusInput"
  >
    <div class="relative">
      <i
        class="pi pi-map-marker text-primary border-2 border-primary/20 rounded-full p-2 text-sm group-hover:scale-110 transition-transform duration-200"
      ></i>
      <div
        v-if="isLoadingLocation"
        class="absolute inset-0 flex items-center justify-center"
      >
        <i class="pi pi-spinner animate-spin text-primary"></i>
      </div>
    </div>

    <div class="flex flex-col justify-center items-start w-full min-w-0">
      <label
        :for="id"
        class="block text-sm font-medium text-gray-700 cursor-pointer"
      >
        {{ label }}
      </label>

      <AutoComplete
        variant="outlined"
        ref="autoComplete"
        :id="id"
        forceSelection
        v-model="selectedLocation"
        :suggestions="suggestions"
        completeOnFocus
        @complete="search"
        @item-select="handleSelect"
        :placeholder="placeholder"
        :disabled="disabled || isLoadingLocation"
        class="w-full text-sm"
        :inputClass="`p-0 w-full border-none outline-none bg-transparent rounded-lg shadow-none 
          text-gray-900 font-normal placeholder:text-gray-400 placeholder:font-normal truncate
          ${disabled ? 'cursor-not-allowed opacity-60' : ''}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectedLocation = ref(props.modelValue || "");
const suggestions = ref<string[]>([]);
const autocompleteService = ref<google.maps.places.AutocompleteService | null>(
  null
);
const geocoder = ref<google.maps.Geocoder | null>(null);
const isLoadingLocation = ref(false);

const autoComplete = ref();

const focusInput = () => {
  autoComplete.value?.$el.querySelector("input").focus();
};

onMounted(async () => {
  const { AutocompleteService } = (await google.maps.importLibrary(
    "places"
  )) as google.maps.PlacesLibrary;

  autocompleteService.value = new AutocompleteService();
  geocoder.value = new google.maps.Geocoder();
  selectedLocation.value = props.modelValue;
});

watch(
  () => props.modelValue,
  (newValue) => {
    selectedLocation.value = newValue;
  }
);

watch(selectedLocation, (newValue) => {
  emit("update:modelValue", newValue);
});

const search = async (event: { query: string }) => {
  if (event.query === "") {
    suggestions.value = ["📍 Use current location"];
    return;
  }
  if (!autocompleteService.value || !event.query) {
    suggestions.value = [];
    return;
  }

  try {
    const result = await autocompleteService.value.getPlacePredictions({
      input: event.query,
      types: ["(cities)"],
    });

    suggestions.value = result.predictions.map((p) => p.description);
  } catch (error) {
    console.error("Places API error:", error);
    suggestions.value = [];
  }
};

const getCurrentLocation = async () => {
  try {
    isLoadingLocation.value = true;
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const result = await geocoder.value?.geocode({
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });

    if (result?.results[0]) {
      selectedLocation.value = result.results[0].formatted_address;
      emit("update:modelValue", result.results[0].formatted_address);
    }
  } catch (error) {
    console.error("Error getting current location:", error);
  } finally {
    isLoadingLocation.value = false;
  }
};

const handleSelect = (event: { value: string }) => {
  if (event.value === "📍 Use current location") {
    getCurrentLocation();
    return;
  }
  emit("update:modelValue", event.value);
};
</script>

<style scoped>
:deep(.p-autocomplete-panel) {
  @apply mt-2 bg-white rounded-xl shadow-lg border border-gray-200;
}

:deep(.p-autocomplete-items) {
  @apply py-2;
}

:deep(.p-autocomplete-item) {
  @apply px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150;
}

:deep(.p-autocomplete-item:first-child) {
  @apply font-medium text-primary border-b border-gray-100 mb-1;
}

:deep(.p-autocomplete-loader) {
  @apply right-2;
}
</style>
