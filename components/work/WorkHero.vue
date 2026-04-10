<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()

const titleRef = ref<HTMLElement | null>(null)
const metaRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Title chars reveal on scroll enter
  if (titleRef.value) {
    const chars = titleRef.value.querySelectorAll<HTMLElement>('.title-char')
    gsap.set(chars, { yPercent: 110 })
    ScrollTrigger.create({
      trigger: titleRef.value,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'power4.out',
        })
      },
    })
  }

  // Meta row fades up
  if (metaRef.value) {
    gsap.fromTo(
      metaRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: metaRef.value,
          start: 'top 85%',
          once: true,
        },
      },
    )
  }
})

// Split title into individual char spans for the reveal
const titleChars = computed(() =>
  (props.data.title as string).split('').map((c, i) => ({
    char: c === ' ' ? '\u00A0' : c,
    key: i,
  })),
)

const metaItems = computed(() => [
  { label: 'Client',   value: props.data.client   },
  { label: 'Role',     value: props.data.role     },
  { label: 'Year',     value: props.data.year     },
  { label: 'Category', value: props.data.category },
])
</script>

<template>
  <section class="work-hero" aria-label="Project hero">
    <!-- Hero image / placeholder -->
    <div class="hero-image-wrap">
      <!-- TODO: replace with real hero image from Layan -->
      <div
        class="hero-placeholder"
        :style="{ background: `linear-gradient(160deg, ${data.palette.bg}, ${data.palette.primary}33)` }"
      />
    </div>

    <!-- Title overlapping image bottom -->
    <div class="hero-title-wrap">
      <h1 ref="titleRef" class="hero-title">
        <span
          v-for="item in titleChars"
          :key="item.key"
          class="title-char"
        >{{ item.char }}</span>
      </h1>
    </div>

    <!-- Metadata row -->
    <div ref="metaRef" class="hero-meta" style="opacity: 0">
      <span
        v-for="(item, i) in metaItems"
        :key="item.label"
        class="meta-item"
      >
        <span class="meta-label">{{ item.label }}</span>
        <span class="meta-value">{{ item.value }}</span>
        <span v-if="i < metaItems.length - 1" class="meta-sep" aria-hidden="true">·</span>
      </span>
    </div>
  </section>
</template>

<style scoped>
.work-hero {
  position: relative;
  background: var(--cs-bg);
  padding-bottom: 3rem;
}

.hero-image-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

@media (min-width: 768px) {
  .hero-image-wrap { aspect-ratio: 21 / 9; }
}

.hero-placeholder {
  width: 100%;
  height: 100%;
  /* TODO: replace with <ParallaxImage> once real asset is available */
}

/* Title overlaps the bottom edge of the image */
.hero-title-wrap {
  max-width: 1280px;
  margin: -2rem auto 0;
  padding: 0 1.25rem;
  overflow: hidden;
}

@media (min-width: 768px) {
  .hero-title-wrap { padding: 0 2.5rem; margin-top: -3rem; }
}
@media (min-width: 1024px) {
  .hero-title-wrap { padding: 0 4rem; margin-top: -4rem; }
}

.hero-title {
  color: var(--cs-text);
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2.25rem, 9vw, 12rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  white-space: normal;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

@media (min-width: 768px) {
  .hero-title {
    white-space: nowrap;
    overflow: hidden;
  }
}

.title-char {
  display: inline-block;
}

/* Metadata row */
.hero-meta {
  max-width: 1280px;
  margin: 2rem auto 0;
  padding: 0 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 0;
}

@media (min-width: 768px) {
  .hero-meta { padding: 0 2.5rem; }
}
@media (min-width: 1024px) {
  .hero-meta { padding: 0 4rem; }
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--cs-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.meta-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--cs-text);
  letter-spacing: 0.02em;
}

.meta-sep {
  font-size: 1rem;
  color: var(--cs-text-muted);
  margin: 0 0.5rem;
}
</style>
