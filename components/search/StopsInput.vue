<template>
  <div class="relative">
    <label class="block text-sm font-medium text-gray-700 mb-1">Number of Stops</label>
    <div class="relative border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
      <div class="flex items-center h-[48px]">
        <button 
          type="button"
          @click="decrementValue"
          :disabled="value <= 1 || disabled"
          class="flex-none w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="pi pi-minus text-sm"></i>
        </button>
        
        <div class="flex-1 flex flex-col items-center justify-center px-4">
          <div class="text-base font-medium">{{ value }}</div>
          <div class="text-xs text-gray-500">stops</div>
        </div>
        
        <button 
          type="button"
          @click="incrementValue"
          :disabled="value >= 10 || disabled"
          class="flex-none w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="pi pi-plus text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})

const incrementValue = () => {
  if (value.value < 10) {
    const newValue = value.value + 1
    value.value = newValue
    emit('update:modelValue', newValue)
  }
}

const decrementValue = () => {
  if (value.value > 1) {
    const newValue = value.value - 1
    value.value = newValue
    emit('update:modelValue', newValue)
  }
}
</script>

<style scoped>
.pi {
  font-size: 12px;
}
</style>