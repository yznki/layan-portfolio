<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    by?: 'chars' | 'words' | 'lines'
    stagger?: number
    delay?: number
    duration?: number
    onScroll?: boolean
  }>(),
  {
    by: 'lines',
    stagger: 0.05,
    delay: 0,
    duration: 1,
    onScroll: true,
  },
)

const containerRef = ref<HTMLElement | null>(null)

useSplitText(containerRef, {
  by: props.by,
  stagger: props.stagger,
  delay: props.delay,
  duration: props.duration,
  ease: 'power4.out',
  onScroll: props.onScroll,
})
</script>

<template>
  <!-- overflow-hidden so letters don't peek below before reveal -->
  <div ref="containerRef" class="overflow-hidden">
    <slot />
  </div>
</template>
