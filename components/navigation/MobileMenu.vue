<template>
  <div>
    <!-- Hamburger Button -->
    <button
      @click="toggleMenu"
      class="md:hidden p-3 focus:outline-none"
      aria-label="Toggle menu"
      :aria-expanded="isOpen"
    >
      <span class="sr-only">Menu</span>
      <i :class="['pi text-xl', isOpen ? 'pi-times' : 'pi-bars']"></i>
    </button>

    <!-- Mobile Menu Panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-white dark:bg-gray-900"
        @keydown.esc="closeMenu"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b">
            <NuxtLink to="/" class="flex items-center" @click="closeMenu">
              <PasseIcon class="h-8 w-auto" />
              <span class="text-xl font-bold">Passe.ai</span>
            </NuxtLink>
            <button
              @click="closeMenu"
              class="p-3 focus:outline-none"
              aria-label="Close menu"
            >
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="flex-1 overflow-y-auto py-4">
            <ul class="space-y-1 px-4">
              <li v-for="item in navigationItems" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  :class="{
                    'bg-gray-100 dark:bg-gray-800': isActive(item.path),
                  }"
                  @click="closeMenu"
                >
                  <i :class="['pi mr-3', item.icon]"></i>
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { navigationItems } from "~/config/navigation";

const isOpen = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  isOpen.value = false;
  document.body.style.overflow = "";
};

const isActive = (path: string) => route.path === path;

// Close menu on route change
watch(() => route.path, closeMenu);

// Clean up on component unmount
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>
