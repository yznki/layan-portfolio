<script setup lang="ts">
const ruleRef = ref<HTMLDivElement | null>(null)

// Animate horizontal rule on scroll
onMounted(() => {
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return

  gsap.fromTo(
    ruleRef.value,
    { width: '0%' },
    {
      width: '100%',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ruleRef.value,
        start: 'top 85%',
        once: true,
      },
    },
  )
})

// Projects data — driven by content in Phase 3; hard-coded here for Phase 2
const projects = [
  {
    slug: 'tedxju-2025',
    title: 'TEDxJU 2025',
    category: 'Brand Identity',
    palette: { primary: '#EB0028', accent: '#EB0028', bg: '#0A0A0A' },
    coverImage: '/images/tedxju/placeholder-cover.jpg',
  },
  {
    slug: 'kpmg',
    title: 'KPMG',
    category: 'Social Media Design',
    palette: { primary: '#00338D', accent: '#483698', bg: '#E8EAF0' },
    coverImage: '/images/kpmg/placeholder-cover.jpg',
  },
  {
    slug: 'kalmntina',
    title: 'Kalmntina',
    category: 'Content Creation',
    palette: { primary: '#E8731A', accent: '#E8731A', bg: '#FFF3E0' },
    coverImage: '/images/kalmntina/placeholder-cover.jpg',
  },
]
</script>

<template>
  <section id="work" class="work-section" aria-labelledby="work-heading">
    <div class="work-inner">
      <!-- Section header -->
      <header class="work-header">
        <p class="work-eyebrow">— Selected Work</p>
        <h2 id="work-heading" class="work-title">SELECTED WORK</h2>
        <div ref="ruleRef" class="work-rule" style="width: 0%" aria-hidden="true" />
      </header>

      <!-- 2-col grid with column-2 offset -->
      <div class="work-grid">
        <!-- Column 1: TEDxJU, Kalmntina -->
        <div class="work-col work-col-1">
          <HomeWorkCard
            v-for="(p, i) in [projects[0], projects[2]]"
            :key="p.slug"
            v-bind="p"
            :index="i"
          />
        </div>

        <!-- Column 2: KPMG — offset downward -->
        <div class="work-col work-col-2">
          <HomeWorkCard
            :key="projects[1].slug"
            v-bind="projects[1]"
            :index="1"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-section {
  background: var(--navy);
  padding: 5rem 1.25rem 6rem;
}

@media (min-width: 768px) {
  .work-section { padding: 7rem 2.5rem 8rem; }
}
@media (min-width: 1024px) {
  .work-section { padding: 9rem 4rem 10rem; }
}

.work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

/* ─── Header ── */
.work-header {
  margin-bottom: 3.5rem;
}

.work-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--blush);
  letter-spacing: 0.25em;
  margin-bottom: 0.75rem;
  opacity: 0.8;
}

.work-title {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 5rem);
  color: var(--cream);
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.work-rule {
  height: 1px;
  background: rgba(245, 160, 192, 0.2);
  overflow: hidden;
}

/* ─── Grid ── */
.work-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .work-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: start;
  }
}

.work-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Offset column 2 downward for visual rhythm */
@media (min-width: 1024px) {
  .work-col-2 {
    margin-top: 4rem;
  }
}
</style>
