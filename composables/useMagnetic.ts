import type { Ref } from 'vue'

/**
 * Magnetic button effect — element follows cursor within its bounding box.
 * @param target   - Element ref
 * @param strength - How far the element moves toward cursor (0–1, default 0.4)
 */
export function useMagnetic(target: Ref<HTMLElement | null>, strength = 0.4) {
  onMounted(() => {
    if (!target.value) return
    const { gsap } = useGsap()
    if (!gsap) return

    const el = target.value

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    onUnmounted(() => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    })
  })
}
