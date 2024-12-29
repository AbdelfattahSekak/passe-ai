<template>
  <div class="flex items-center gap-2 cursor-pointer" @click="focusInput">
    <i
      class="pi pi-map-marker text-gray-900 border-[3px] rounded-full p-3 text-sm"
    ></i>
    <div class="flex flex-col justify-center items-start w-full border-r">
      <label
        :for="id"
        class="block text-sm text-gray-900 mt-2 cursor-pointer"
        >{{ label }}</label
      >

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
        class="w-full text-sm h-[30px]"
        inputClass="p-0 w-full border-none bg-red-100 outline-none bg-transparent rounded-lg shadow-none text-gray-900 font-semibold bg-red-600"
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
  @apply mt-1 bg-white rounded-lg shadow-lg border border-gray-200;
}

:deep(.p-autocomplete-items) {
  @apply py-1;
}

:deep(.p-autocomplete-item) {
  @apply px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer;
}

:deep(.p-autocomplete-item:first-child) {
  @apply font-medium text-primary;
}

.p-inputtext {
}
</style>
