/**
 * Safe GSAP accessor — only resolves on client.
 * Returns gsap, ScrollTrigger, and SplitText from the Nuxt plugin.
 */
export function useGsap() {
  const nuxtApp = useNuxtApp()

  if (import.meta.server) {
    return { gsap: null, ScrollTrigger: null, SplitText: null }
  }

  return {
    gsap: nuxtApp.$gsap as typeof import('gsap').gsap,
    ScrollTrigger: nuxtApp.$ScrollTrigger as typeof import('gsap/ScrollTrigger').ScrollTrigger,
    SplitText: nuxtApp.$SplitText as typeof import('gsap/SplitText').SplitText,
  }
}
