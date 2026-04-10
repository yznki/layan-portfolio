/**
 * Global page transition middleware.
 * Uses the page-overlay div (provided by app.vue) to fade between pages.
 */
export default defineNuxtRouteMiddleware((_to, _from) => {
  if (import.meta.server) return

  const overlay = document.querySelector<HTMLDivElement>('.page-overlay')
  if (!overlay) return

  // Fade overlay in — page swap happens, then fade out after navigation
  const { $gsap } = useNuxtApp() as { $gsap?: typeof import('gsap').gsap }
  if (!$gsap) return

  $gsap.to(overlay, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      // Fade out is triggered in NuxtPage onMounted via nextTick
      setTimeout(() => {
        $gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }, 50)
    },
  })
})
