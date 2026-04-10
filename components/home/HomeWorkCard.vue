<script setup lang="ts">
interface Palette {
  primary: string
  accent: string
  bg: string
}

const props = defineProps<{
  slug: string
  title: string
  category: string
  palette: Palette
  coverImage: string
  index: number
}>()

const cardRef = ref<HTMLDivElement | null>(null)
const overlayRef = ref<HTMLDivElement | null>(null)
const cursorState = inject<Ref<string>>('cursorState')

onMounted(() => {
  if (!cardRef.value) return
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Clip-path scroll reveal
  gsap.set(cardRef.value, { clipPath: 'inset(100% 0 0 0)' })
  ScrollTrigger.create({
    trigger: cardRef.value,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.to(cardRef.value, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        delay: props.index * 0.15,
        ease: 'power4.out',
      })
    },
  })
})

const onMouseEnter = () => {
  if (cursorState) cursorState.value = 'view'
  const { gsap } = useGsap()
  if (!gsap || !overlayRef.value) return
  gsap.to(overlayRef.value, { opacity: 1, duration: 0.4, ease: 'power2.out' })
}

const onMouseLeave = () => {
  if (cursorState) cursorState.value = 'default'
  const { gsap } = useGsap()
  if (!gsap || !overlayRef.value) return
  gsap.to(overlayRef.value, { opacity: 0, duration: 0.4, ease: 'power2.out' })
}
</script>

<template>
  <NuxtLink
    :to="`/work/${slug}`"
    class="work-card"
    :aria-label="`View ${title} case study`"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div ref="cardRef" class="card-inner">
      <!-- Image / placeholder -->
      <div
        class="card-image-wrap"
        :style="{ background: palette.bg }"
      >
        <!-- TODO: replace with real cover image -->
        <div class="card-placeholder">
          <span class="placeholder-title">{{ title }}</span>
        </div>

        <!-- Hover accent overlay -->
        <div
          ref="overlayRef"
          class="card-overlay"
          :style="{ background: palette.accent }"
        />
      </div>

      <!-- Info bar -->
      <div class="card-info">
        <span class="card-title">{{ title }}</span>
        <span class="card-category">{{ category }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.work-card {
  display: block;
  text-decoration: none;
  cursor: none;
}

.card-inner {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  will-change: clip-path;
}

.card-image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

@media (max-width: 1023px) {
  .card-image-wrap { aspect-ratio: 16 / 9; }
}

/* Scale on hover */
.work-card:hover .card-image-wrap {
  /* Handled via inner element so we don't break clip-path */
}

.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.work-card:hover .card-placeholder {
  transform: scale(1.04);
}

.placeholder-title {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: white;
  opacity: 0.15;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
}

/* ─── Info bar ── */
.card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem 1.5rem 1.25rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.card-title {
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
}

.card-category {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--blush);
  border: 1px solid var(--blush);
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
