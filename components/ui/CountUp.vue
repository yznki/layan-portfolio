<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    target: number
    suffix?: string
    duration?: number
  }>(),
  {
    suffix: '',
    duration: 2,
  },
)

const displayValue = ref(0)
const containerRef = ref<HTMLSpanElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayValue.value = props.target
    return
  }

  ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(displayValue, {
        value: props.target,
        duration: props.duration,
        ease: 'power2.out',
        snap: { value: 1 },
      })
    },
  })
})
</script>

<template>
  <span ref="containerRef" class="count-up">
    {{ displayValue }}{{ suffix }}
  </span>
</template>
