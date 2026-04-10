import type { Ref } from 'vue'

/**
 * Applies a GSAP ScrollTrigger parallax effect to an element.
 * @param target - The element to parallax
 * @param speed  - Movement factor; 0.15 = ±15% of scroll range (default)
 */
export function useParallax(target: Ref<HTMLElement | null>, speed = 0.15) {
  let trigger: InstanceType<typeof import('gsap/ScrollTrigger').ScrollTrigger> | null = null

  onMounted(() => {
    if (!target.value) return
    const { gsap, ScrollTrigger } = useGsap()
    if (!gsap || !ScrollTrigger) return

    const yFrom = -(speed * 100)
    const yTo = speed * 100

    gsap.fromTo(
      target.value,
      { yPercent: yFrom },
      {
        yPercent: yTo,
        ease: 'none',
        scrollTrigger: {
          trigger: target.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    trigger = ScrollTrigger.getById(target.value.id) ?? null
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}
