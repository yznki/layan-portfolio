<script setup lang="ts">
const emit = defineEmits<{ done: [] }>()

const preloaderRef = ref<HTMLDivElement | null>(null)
const letterRefs = ref<HTMLSpanElement[]>([])
const countRef = ref<HTMLSpanElement | null>(null)
const count = ref(0)

const letters = 'LAYAN'.split('')

onMounted(async () => {
  const { gsap } = useGsap()
  if (!gsap) {
    emit('done')
    return
  }

  // Check for reduced motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    emit('done')
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      // Wipe preloader upward
      gsap.to(preloaderRef.value, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => emit('done'),
      })
    },
  })

  // Staggered letter reveal from below
  tl.fromTo(
    letterRefs.value,
    { yPercent: 110 },
    { yPercent: 0, duration: 0.8, stagger: 0.05, ease: 'power4.out' },
  )

  // Counter tween 0 → 100
  tl.to(
    count,
    {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      snap: { value: 1 },
    },
    '<',
  )

  // Subtitle fade up
  tl.fromTo(
    '.preloader-subtitle',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=1.8',
  )
})
</script>

<template>
  <div
    ref="preloaderRef"
    class="preloader"
    style="clip-path: inset(0 0 0 0)"
  >
    <!-- Logo wordmark -->
    <div class="preloader-name" aria-hidden="true">
      <span
        v-for="(letter, i) in letters"
        :key="i"
        :ref="(el) => { if (el) letterRefs[i] = el as HTMLSpanElement }"
        class="preloader-letter"
      >{{ letter }}</span>
    </div>

    <!-- Subtitle -->
    <p class="preloader-subtitle">
      Graphic Design · Branding · Content
    </p>

    <!-- Counter -->
    <span ref="countRef" class="preloader-counter">
      {{ count }}<small>%</small>
    </span>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  background: var(--navy);
  z-index: 9000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preloader-name {
  display: flex;
  overflow: hidden;
}

.preloader-letter {
  display: inline-block;
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(3rem, 10vw, 8rem);
  color: var(--blush);
  line-height: 1;
  letter-spacing: -0.02em;
}

.preloader-subtitle {
  margin-top: 1.5rem;
  font-family: 'General Sans', sans-serif;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--cream);
  opacity: 0.6;
  letter-spacing: 0.05em;
}

.preloader-counter {
  position: absolute;
  bottom: 2rem;
  right: 2.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--cream);
  opacity: 0.5;
}

.preloader-counter small {
  font-size: 0.65em;
  opacity: 0.7;
}
</style>
