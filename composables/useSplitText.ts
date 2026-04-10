import type { Ref } from 'vue'

interface SplitTextOptions {
  by?: 'chars' | 'words' | 'lines'
  stagger?: number
  delay?: number
  duration?: number
  ease?: string
  /** If true, uses ScrollTrigger instead of playing immediately */
  onScroll?: boolean
}

/**
 * Splits text in an element and animates it in on scroll (or immediately).
 * Cleans up SplitText instance and ScrollTrigger on unmount.
 */
export function useSplitText(
  target: Ref<HTMLElement | null>,
  options: SplitTextOptions = {},
) {
  const {
    by = 'lines',
    stagger = 0.05,
    delay = 0,
    duration = 1,
    ease = 'power4.out',
    onScroll = true,
  } = options

  let split: InstanceType<typeof import('gsap/SplitText').SplitText> | null = null
  let trigger: InstanceType<typeof import('gsap/ScrollTrigger').ScrollTrigger> | null = null

  onMounted(() => {
    if (!target.value) return

    const { gsap, ScrollTrigger, SplitText } = useGsap()
    if (!gsap || !SplitText) return

    split = new SplitText(target.value, { type: by })
    const els = by === 'chars' ? split.chars : by === 'words' ? split.words : split.lines

    // Wrap each piece in an overflow-hidden container for the reveal
    gsap.set(els, { yPercent: 110, opacity: 0 })

    const animProps = {
      yPercent: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
    }

    if (onScroll && ScrollTrigger) {
      trigger = ScrollTrigger.create({
        trigger: target.value,
        start: 'top 85%',
        onEnter: () => gsap.to(els, animProps),
        once: true,
      })
    } else {
      gsap.to(els, animProps)
    }
  })

  onUnmounted(() => {
    trigger?.kill()
    split?.revert()
  })
}
