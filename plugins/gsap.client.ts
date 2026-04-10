import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  // Markers off by default — enable per-trigger when debugging
  ScrollTrigger.defaults({
    markers: false,
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
    },
  }
})
