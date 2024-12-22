<template>
  <header
    class="h-[30vh] p-10 flex flex-col items-center justify-center bg-slate-50 border-b-1 w-full"
    role="banner"
  >
    <h1 class="text-[50px] font-bold my-6 sm:mb-6 text-black tracking-tight">
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