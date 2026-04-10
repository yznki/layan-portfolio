<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    duration?: number
    delay?: number
    width?: number | string
    height?: number | string
  }>(),
  {
    duration: 1.2,
    delay: 0,
  },
)

const wrapRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!wrapRef.value) return
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return

  // Check for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(wrapRef.value, { clipPath: 'inset(0% 0 0 0)' })
    return
  }

  gsap.set(wrapRef.value, { clipPath: 'inset(100% 0 0 0)' })

  ScrollTrigger.create({
    trigger: wrapRef.value,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(wrapRef.value, {
        clipPath: 'inset(0% 0 0 0)',
        duration: props.duration,
        delay: props.delay,
        ease: 'power4.out',
      })
    },
  })
})
</script>

<template>
  <div ref="wrapRef" class="reveal-image-wrap">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      class="reveal-image"
    />
  </div>
</template>

<style scoped>
.reveal-image-wrap {
  overflow: hidden;
  display: block;
}

.reveal-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
