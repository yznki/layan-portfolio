<script setup lang="ts">
type CursorState = 'default' | 'hover' | 'view' | 'drag'

const cursorState = inject<Ref<CursorState>>('cursorState', ref('default'))
const outerRef  = ref<HTMLDivElement | null>(null)
const innerRef  = ref<HTMLDivElement | null>(null)
const labelRef  = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const { gsap } = useGsap()
  if (!gsap) return

  // Center all elements on the cursor point using xPercent/yPercent —
  // this avoids the negative top/left offsets that caused sub-pixel blur.
  gsap.set([outerRef.value, innerRef.value, labelRef.value], {
    xPercent: -50,
    yPercent: -50,
  })

  const onMove = (e: MouseEvent) => {
    // Inner dot: snaps immediately
    gsap.to(innerRef.value, {
      x: e.clientX, y: e.clientY,
      duration: 0.12, ease: 'power3.out',
      overwrite: 'auto',
    })
    // Outer ring: lags slightly
    gsap.to(outerRef.value, {
      x: e.clientX, y: e.clientY,
      duration: 0.55, ease: 'power3.out',
      overwrite: 'auto',
    })
    // Label follows ring
    gsap.to(labelRef.value, {
      x: e.clientX, y: e.clientY,
      duration: 0.55, ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  window.addEventListener('mousemove', onMove)
  onUnmounted(() => window.removeEventListener('mousemove', onMove))
})

// Animate width/height instead of scale — scale causes sub-pixel blur on small elements
watch(cursorState, (state) => {
  const { gsap } = useGsap()
  if (!gsap) return

  if (state === 'hover') {
    gsap.to(outerRef.value, { width: 54, height: 54, opacity: 0.55, duration: 0.3, ease: 'power2.out' })
    gsap.to(innerRef.value, { opacity: 0, duration: 0.2 })
    gsap.to(labelRef.value, { opacity: 0, duration: 0.15 })
  } else if (state === 'view') {
    gsap.to(outerRef.value, { width: 80, height: 80, opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.to(innerRef.value, { opacity: 0, duration: 0.2 })
    gsap.to(labelRef.value, { opacity: 1, duration: 0.2, delay: 0.1 })
  } else if (state === 'drag') {
    gsap.to(outerRef.value, { width: 70, height: 70, opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.to(innerRef.value, { opacity: 0, duration: 0.2 })
    gsap.to(labelRef.value, { opacity: 1, duration: 0.2, delay: 0.1 })
  } else {
    gsap.to(outerRef.value, { width: 36, height: 36, opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(innerRef.value, { opacity: 1, duration: 0.2 })
    gsap.to(labelRef.value, { opacity: 0, duration: 0.15 })
  }
})
</script>

<template>
  <!-- Hidden on touch devices via CSS -->
  <div class="cursor-wrapper" aria-hidden="true">
    <!-- Outer ring — size animated directly, not via scale -->
    <div ref="outerRef" class="cursor-outer" />

    <!-- Inner dot -->
    <div ref="innerRef" class="cursor-inner" />

    <!-- Label — separate element so it's never scaled/blurred -->
    <div ref="labelRef" class="cursor-label">
      {{ cursorState === 'drag' ? 'DRAG' : 'VIEW' }}
    </div>
  </div>
</template>

<style scoped>
.cursor-wrapper {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
}

@media (pointer: coarse) {
  .cursor-wrapper { display: none; }
}

.cursor-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--blush);
  border-radius: 50%;
  will-change: transform, width, height;
}

.cursor-inner {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background: var(--blush);
  border-radius: 50%;
  will-change: transform;
}

.cursor-label {
  position: fixed;
  top: 0;
  left: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 400;
  color: var(--blush);
  letter-spacing: 0.1em;
  opacity: 0;
  will-change: transform;
  white-space: nowrap;
  /* Ensure crisp rendering at native size — never scaled */
  -webkit-font-smoothing: antialiased;
}
</style>
