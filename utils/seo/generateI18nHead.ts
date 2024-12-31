import type { LocaleObject } from '@nuxtjs/i18n'

interface I18nHeadParams {
  title: string
  description: string
  path: string
  locale: string
  locales: LocaleObject[]
}

export function generateI18nHead({
  title,
  description,
  path,
  locale,
  locales,
}: I18nHeadParams) {
  const baseUrl = 'https://passe.ai'

  // Generate alternate links for each locale
  const alternateLinks = locales.map((l) => ({
    rel: 'alternate',
    hreflang: l.code,
    href: `${baseUrl}/${l.code}${path}`
  }))

  // Add x-default hreflang
  alternateLinks.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}/en${path}`
  })

  return {
    title,
    meta: [
      {
        name: 'description',
        content: description
      },
      // Open Graph
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:locale',
        content: locale.replace('-', '_')
      },
      // Twitter
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      }
    ],
    link: [
      // Canonical URL
      {
        rel: 'canonical',
        href: `${baseUrl}/${locale}${path}`
      },
      // Alternate language versions
      ...alternateLinks
    ]
  }
}