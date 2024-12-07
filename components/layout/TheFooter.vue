<template>
  <footer class="bg-gray-900 text-white" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <PasseIcon class="h-8 w-auto text-primary" />
            <span class="ml-2 text-xl font-bold">Passe.ai</span>
          </div>
          <p class="text-gray-400 mb-4">
            Your AI-powered companion for creating unforgettable road trip experiences.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-primary" aria-label="Follow us on Twitter">
              <i class="pi pi-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary" aria-label="Follow us on Facebook">
              <i class="pi pi-facebook text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary" aria-label="Follow us on Instagram">
              <i class="pi pi-instagram text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-primary">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-primary">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-400 hover:text-primary">Contact</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/privacy" class="text-gray-400 hover:text-primary">Privacy Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-gray-400 hover:text-primary">Terms of Service</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Passe.ai. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-primary text-sm">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-primary text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>