import type { NuxtConfig } from '@nuxt/schema'

export function generateStaticRoutes(): NuxtConfig['nitro'] {
  // Define supported locales
  const locales = ['en', 'fr', 'es', 'ar']
  
  // Define base routes that need to be generated for each locale
  const baseRoutes = [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ]

  // Generate all routes with locale prefixes
  const routes = locales.flatMap(locale => 
    baseRoutes.map(route => `/${locale}${route}`)
  )

  return {
    prerender: {
      routes: routes,
      crawlLinks: true,
      failOnError: false,
    }
  }
}