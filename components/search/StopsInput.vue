<template>
  <div class="relative flex flex-col items-start w-full">
    <label class="block text-sm font-medium text-white mb-1">{{ label }}</label>
    <div class="relative border border-gray-300 rounded-lg hover:border-gray-400 transition w-full">
      <div class="flex items-center h-[45px]">
        <button 
          type="button"
          @click="decrementValue"
          :disabled="value <= 1 || disabled"
          class="flex-none w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="pi pi-minus text-sm text-white"></i>
        </button>
        
        <div class="flex-1 flex flex-col items-center justify-center px-4">
          <div class="text-base font-medium text-white">{{ value }}</div>
          <div class="text-xs text-white">stops</div>
        </div>
        
        <button 
          type="button"
          @click="incrementValue"
          :disabled="value >= 10 || disabled"
          class="flex-none w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="pi pi-plus text-sm text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  disabled?: boolean
  label?: string
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