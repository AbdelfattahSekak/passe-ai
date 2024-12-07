export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module'
  ],
  css: [
    '@/assets/styles/main.scss',
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css'
  ],
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
      {
        path: '~/components/search',
        pathPrefix: false,
      },
      {
        path: '~/components/layout',
        pathPrefix: false,
      },
      {
        path: '~/components/icons',
        pathPrefix: false,
      }
    ]
  },
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    options: {
      ripple: true,
      inputStyle: 'filled'
    },
    components: {
      include: [
        'Button',
        'InputText',
        'InputNumber',
        'Card',
        'ProgressSpinner',
        'AutoComplete',
        'Textarea'
      ]
    },
    directives: {
      include: ['ripple']
    }
  },
  googleFonts: {
    families: {
      'DM Sans': [400, 500, 600, 700],
    },
    display: 'swap'
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Passe.ai - AI-Powered Road Trip Planner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#FF5A5F' },
        {
          name: 'description',
          content: 'Plan your perfect road trip with Passe.ai, the AI-powered itinerary builder. Discover hidden gems and create unforgettable memories.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})