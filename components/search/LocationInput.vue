<template>
  <div class="flex items-center gap-6 cursor-pointer" @click="focusInput">
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
        ref="autoComplete"
        style="outline: none"
        :id="id"
        v-model="selectedLocation"
        :suggestions="suggestions"
        @complete="search"
        @item-select="handleSelect"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full text-sm h-[30px]"
        :pt="{
          root: { class: 'w-full' },
          input: {
            class:
              'w-full outline-none bg-transparent rounded-lg shadow-none text-gray-900',
          },
        }"
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

const autoComplete = ref();

const focusInput = () => {
  autoComplete.value?.$el.querySelector("input").focus();
};

onMounted(async () => {
  const { AutocompleteService } = (await google.maps.importLibrary(
    "places"
  )) as google.maps.PlacesLibrary;
  autocompleteService.value = new AutocompleteService();
  // Ensure the selectedLocation is synced with modelValue on mount
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

const handleSelect = (event: { value: string }) => {
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
</style>
