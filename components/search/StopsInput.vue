<template>
  <div class="relative flex items-center gap-6">
    <div class="flex flex-col items-start w-full  border-r">
      <label class="block text-sm text-gray-900 mt-2">{{ label }}</label>
      <div class="relative  rounded-lg hover:border-gray-400 transition w-full">
        <div class="flex items-center h-[45px] gap-12">
          <button type="button" @click="decrementValue" :disabled="value <= 1 || disabled"
            class="flex-none border rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="pi pi-minus text-sm text-gray-500"></i>
          </button>

          <div class="flex flex-col items-center justify-center">
            <div class="text-base font-medium text-gray-700">{{ value }}</div>
            <div class="text-xs text-gray-700">stops</div>
          </div>

          <button type="button" @click="incrementValue" :disabled="value >= 10 || disabled"
            class="flex-none border mr-6 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="pi pi-plus text-sm text-gray-700"></i>
          </button>
        </div>
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

</style>