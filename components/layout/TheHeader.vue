<template>
  <header
    class="h-[15vh] flex flex-col items-center justify-center bg-slate-50 border-b-1 w-full sh shadow-sm"
    role="banner"
  >
    <h1 class="text-[28px] font-bold mb-2 sm:mb-2 text-black tracking-tight">
      Your Next Adventure Awaits
    </h1>
    <slot></slot>
  </header>
</template>

<style scoped>
header {
  backdrop-filter: blur(8px);
  background-color: rgba(248, 250, 252, 0.95);
}
</style>
