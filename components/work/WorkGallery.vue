<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()

const layout = computed(() => props.data.galleryLayout ?? 'grid-2x2')

// Placeholder images — 4 items for all layouts
const images = computed(() =>
  (props.data.images as string[] | undefined) ??
  Array.from({ length: 4 }, (_, i) => `placeholder-${i + 1}`)
)

// Before-after drag state
const dividerX = ref(50)   // percent
const dragging = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

const startDrag = () => { dragging.value = true }
const stopDrag  = () => { dragging.value = false }

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!dragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  dividerX.value = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
}

// Horizontal scroll track
const trackRef = ref<HTMLDivElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (layout.value === 'horizontal-scroll' && trackRef.value && sectionRef.value) {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const distance = trackRef.value!.scrollWidth - sectionRef.value!.offsetWidth
      gsap.to(trackRef.value, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${distance}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })
  }

  if (layout.value === 'grid-2x2') {
    const cards = document.querySelectorAll<HTMLElement>('.gallery-grid-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.1,
          delay: i * 0.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        },
      )
    })
  }
})
</script>

<template>
  <section ref="sectionRef" class="work-gallery" aria-label="Project gallery">

    <!-- ── LAYOUT: grid-2x2 ────────────────────────────────────────────── -->
    <template v-if="layout === 'grid-2x2'">
      <div class="gallery-grid">
        <div
          v-for="(img, i) in images.slice(0, 4)"
          :key="i"
          class="gallery-grid-card"
          :style="{ '--r': `${(i % 2 === 0 ? 1 : -1) * (1 + (i % 3))}deg` }"
        >
          <!-- TODO: replace with <NuxtImg :src="img"> once real assets arrive -->
          <div class="gallery-placeholder" :style="{ background: `var(--cs-primary)` }">
            <span class="gallery-placeholder-label">Image {{ i + 1 }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── LAYOUT: horizontal-scroll ────────────────────────────────────── -->
    <template v-else-if="layout === 'horizontal-scroll'">
      <div ref="trackRef" class="gallery-h-track">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="gallery-h-card"
          :style="{ '--r': `${(i % 2 === 0 ? 1.5 : -1.5)}deg` }"
        >
          <div class="gallery-placeholder tall" :style="{ background: `var(--cs-primary)` }">
            <span class="gallery-placeholder-label">Image {{ i + 1 }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── LAYOUT: before-after ──────────────────────────────────────────── -->
    <template v-else-if="layout === 'before-after'">
      <div class="ba-wrap">
        <div
          ref="containerRef"
          class="ba-container"
          @mousemove="onDrag"
          @touchmove.prevent="onDrag"
          @mouseup="stopDrag"
          @touchend="stopDrag"
        >
          <!-- AFTER (full width, sits behind) -->
          <div class="ba-after">
            <span class="ba-label after-label">AFTER</span>
            <div class="gallery-placeholder" :style="{ background: `var(--cs-accent)` }">
              <span class="gallery-placeholder-label">After</span>
            </div>
          </div>

          <!-- BEFORE (clipped by divider) -->
          <div
            class="ba-before"
            :style="{ clipPath: `inset(0 ${100 - dividerX}% 0 0)` }"
          >
            <span class="ba-label before-label">BEFORE</span>
            <div class="gallery-placeholder" :style="{ background: `var(--cs-primary)` }">
              <span class="gallery-placeholder-label">Before</span>
            </div>
          </div>

          <!-- Divider handle -->
          <div
            class="ba-divider"
            :style="{ left: `${dividerX}%` }"
            @mousedown="startDrag"
            @touchstart="startDrag"
          >
            <div class="ba-handle">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── LAYOUT: large-first ────────────────────────────────────────────── -->
    <template v-else>
      <div class="gallery-large-first">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="gallery-lf-card"
          :class="i === 0 ? 'large' : 'small'"
        >
          <div class="gallery-placeholder" :style="{ background: `var(--cs-primary)` }">
            <span class="gallery-placeholder-label">Image {{ i + 1 }}</span>
          </div>
        </div>
      </div>
    </template>

  </section>
</template>

<style scoped>
.work-gallery {
  background: var(--cs-bg);
  padding: 3rem 1.25rem 5rem;
  overflow: hidden;
}

@media (min-width: 768px) { .work-gallery { padding: 4rem 2.5rem 6rem; } }
@media (min-width: 1024px) { .work-gallery { padding: 5rem 4rem 7rem; } }

/* ─── Shared placeholder ── */
.gallery-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  opacity: 0.7;
}

.gallery-placeholder.tall { min-height: 460px; }

.gallery-placeholder-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: white;
  opacity: 0.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* ─── grid-2x2 ── */
.gallery-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 639px) {
  .gallery-grid { grid-template-columns: 1fr; }
}

.gallery-grid-card {
  aspect-ratio: 4 / 3;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  border-radius: 8px;
  overflow: hidden;
  transform: rotate(var(--r));
  will-change: clip-path, opacity;
}

/* ─── horizontal-scroll ── */
.gallery-h-track {
  display: flex;
  gap: 2rem;
  width: max-content;
  padding: 2rem 4rem;
  will-change: transform;
}

@media (max-width: 1023px) {
  .gallery-h-track {
    flex-wrap: wrap;
    width: 100%;
    padding: 1rem 0;
  }
}

.gallery-h-card {
  width: clamp(280px, 35vw, 520px);
  aspect-ratio: 3 / 4;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  transform: rotate(var(--r));
  box-shadow: 0 24px 64px rgba(0,0,0,0.25);
}

@media (max-width: 1023px) {
  .gallery-h-card { width: 100%; transform: none; }
}

/* ─── before-after ── */
.ba-wrap {
  max-width: 1280px;
  margin: 0 auto;
}

.ba-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  cursor: ew-resize;
  user-select: none;
}

.ba-after,
.ba-before {
  position: absolute;
  inset: 0;
}

.ba-before {
  transition: clip-path 0s linear;
}

.ba-label {
  position: absolute;
  top: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
  opacity: 0.7;
  z-index: 2;
}

.before-label { left: 1rem; }
.after-label  { right: 1rem; }

.ba-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: white;
  transform: translateX(-50%);
  z-index: 10;
  cursor: ew-resize;
}

.ba-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

/* ─── large-first ── */
.gallery-large-first {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
}

.gallery-lf-card.large {
  grid-column: 1 / -1;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  border-radius: 12px;
}

.gallery-lf-card.small {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
}
</style>
