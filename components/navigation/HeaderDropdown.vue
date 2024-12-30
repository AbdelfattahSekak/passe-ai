<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <i class="pi pi-bars text-lg"></i>
      <span class="text-sm">Menu</span>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 mt-1 w-48 rounded-lg bg-white/95 py-1 shadow-lg border border-gray-100 backdrop-blur-sm"
        @click.outside="isOpen = false"
      >
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
          @click="isOpen = false"
        >
          <i :class="item.icon" class="mr-2 text-sm"></i>
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const menuItems = [
  { label: "Home", path: "/", icon: "pi pi-home" },
  { label: "About", path: "/about", icon: "pi pi-info-circle" },
  { label: "Contact", path: "/contact", icon: "pi pi-envelope" },
  { label: "Help", path: "/help", icon: "pi pi-question-circle" },
];
</script>
