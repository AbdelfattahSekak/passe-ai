<template>
  <div class="relative">
    <Button
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      class="flex items-center gap-2"
      text
    >
      <i class="pi pi-globe text-lg"></i>
      <span class="hidden md:inline">{{ currentLocale.name }}</span>
    </Button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
        role="menu"
        aria-orientation="vertical"
      >
        <div class="py-1" role="none">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="switchLanguage(locale.code)"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            :aria-current="locale.code === currentLocale.code"
          >
            {{ locale.name }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();
const isOpen = ref(false);

const availableLocales = computed(() => {
  return locales.value.map((l) => ({
    code: l.code,
    name: l.name,
  }));
});

const currentLocale = computed(() => {
  return locales.value.find((l) => l.code === locale.value) || locales.value[0];
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function switchLanguage(code: string) {
  locale.value = code;
  isOpen.value = false;
  localStorage.setItem("user-locale", code);
}

onMounted(() => {
  const savedLocale = localStorage.getItem("user-locale");
  if (savedLocale && locales.value.some((l) => l.code === savedLocale)) {
    locale.value = savedLocale;
  }
});
</script>
