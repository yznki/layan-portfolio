import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  // Nuxt 4 compatibility
  future: {
    compatibilityVersion: 4,
  },

  // Keep files at root (matching CLAUDE.md structure)
  srcDir: '.',

  // Tailwind v4 via Vite plugin
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
    },
  },

  // Component auto-import — no path prefix (RevealText not UiRevealText)
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/icon',
    '@vueuse/nuxt',
  ],

  // Global CSS
  css: ['~/assets/css/main.css'],

  // SSG — prerender all routes including case studies
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/reels',
        '/work/tedxju-2025',
        '/work/kpmg',
        '/work/kalmntina',
      ],
    },
  },

  // App head — preloads, SEO defaults, structured data
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#0F1B4C' },
        { name: 'author', content: 'Layan Altaher' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Layan Altaher' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        // Preload the two most critical font weights
        {
          rel: 'preload',
          href: '/fonts/ClashDisplay-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/GeneralSans-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        // JetBrains Mono from Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap',
        },
      ],
      script: [
        // Person structured data
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Layan Altaher',
            jobTitle: 'Graphic Designer & Content Creator',
            url: 'https://layanaltaher.com',
            sameAs: [],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Amman',
              addressCountry: 'JO',
            },
          }),
        },
      ],
    },
  },

  // Nuxt Image
  image: {
    quality: 85,
    format: ['webp', 'jpg'],
  },
})
