<template>
  <div class="relative flex flex-col items-start w-full">
    <label :for="id" class="block text-sm font-medium text-white mb-1">{{
      label
    }}</label>
    <div class="relative">
      <i
        class="pi pi-map-marker absolute left-3 top-1/2 -translate-y-1/2 z-10"
      ></i>
      <AutoComplete
        :id="id"
        v-model="selectedLocation"
        :suggestions="suggestions"
        @complete="search"
        @item-select="handleSelect"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full text-sm h-[45px]"
        :pt="{
          root: { class: 'w-full' },
          input: {
            class: 'w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300',
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

const selectedLocation = ref("");
const suggestions = ref<string[]>([]);
const autocompleteService = ref<google.maps.places.AutocompleteService | null>(
  null
);

onMounted(async () => {
  autocompleteService.value = new google.maps.places.AutocompleteService();
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
