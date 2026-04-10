/**
 * Global page transition middleware.
 * Uses the page-overlay div (provided by app.vue) to fade between pages.
 */
import { getRouteTransitionBg } from '~/utils/workThemes'

let fadeOutTimer: ReturnType<typeof setTimeout> | undefined

export default defineNuxtRouteMiddleware((to, _from) => {
  if (import.meta.server) return

  const overlay = document.querySelector<HTMLDivElement>('.page-overlay')
  if (!overlay) return

  // Fade overlay in — page swap happens, then fade out after navigation
  const { $gsap } = useNuxtApp() as { $gsap?: typeof import('gsap').gsap }
  if (!$gsap) return

  if (fadeOutTimer) {
    clearTimeout(fadeOutTimer)
    fadeOutTimer = undefined
  }

  $gsap.killTweensOf(overlay)
  overlay.style.background = getRouteTransitionBg(to.path)

  $gsap.to(overlay, {
    opacity: 1,
    duration: 0.12,
    ease: 'power2.out',
    onComplete: () => {
      // Fade out is triggered in NuxtPage onMounted via nextTick
      fadeOutTimer = setTimeout(() => {
        overlay.style.background = getRouteTransitionBg(to.path)
        $gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            fadeOutTimer = undefined
          },
        })
      }, 50)
    },
  })
})
