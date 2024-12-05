<template>
  <div class="relative">
    <UInput
      :id="id"
      v-bind="$attrs"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  id: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [string];
  "place-selected": [google.maps.places.PlaceResult];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const { place } = useGoogleMapsAutocomplete(props.id);

watch(place, (newPlace) => {
  if (newPlace?.formatted_address) {
    emit("update:modelValue", newPlace.formatted_address);
    emit("place-selected", newPlace);
  }
});
</script>
