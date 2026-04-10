<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)

const services = [
  {
    icon: '✦',
    title: 'Graphic Design',
    body: 'From posters to print — crafting visuals that communicate with purpose and precision.',
  },
  {
    icon: '◈',
    title: 'Brand Identity',
    body: 'Logos, color systems, and guidelines that build a cohesive brand world from the ground up.',
  },
  {
    icon: '⊹',
    title: 'Content Creation',
    body: 'Scroll-stopping content tailored to each platform — visually consistent and strategically driven.',
  },
  {
    icon: '◉',
    title: 'Social Media',
    body: "Feed planning, templates, and campaign design that build a brand's online presence.",
  },
]

onMounted(() => {
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Only run horizontal scroll on desktop (≥1024px)
  const mm = gsap.matchMedia()

  mm.add('(min-width: 1024px)', () => {
    if (!sectionRef.value || !trackRef.value) return

    const totalWidth = trackRef.value.scrollWidth
    const viewportWidth = sectionRef.value.offsetWidth
    const distance = totalWidth - viewportWidth

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

    return () => {
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === sectionRef.value)
        .forEach(st => st.kill())
    }
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="services-section"
    aria-labelledby="services-heading"
  >
    <div class="services-header">
      <p class="services-eyebrow">— What I Do</p>
      <h2 id="services-heading" class="services-title">WHAT I DO</h2>
    </div>

    <!-- Scrollable track (horizontal on desktop, vertical stack on mobile) -->
    <div ref="trackRef" class="services-track">
      <article
        v-for="(service, i) in services"
        :key="i"
        class="service-card"
      >
        <span class="service-icon" aria-hidden="true">{{ service.icon }}</span>
        <h3 class="service-name">
          <RevealText by="lines" :on-scroll="true">
            {{ service.title }}
          </RevealText>
        </h3>
        <p class="service-body">{{ service.body }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background: var(--navy);
  padding: 5rem 1.25rem 6rem;
  overflow: hidden;
}

@media (min-width: 768px) {
  .services-section { padding: 7rem 2.5rem 8rem; }
}

@media (min-width: 1024px) {
  .services-section {
    /* Height set by GSAP pin — extra bottom padding handled by ScrollTrigger */
    padding: 7rem 4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

/* ─── Header ── */
.services-header {
  max-width: 1280px;
  margin: 0 auto 3rem;
}

@media (min-width: 1024px) {
  .services-header { width: 100%; }
}

.services-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--blush);
  letter-spacing: 0.25em;
  margin-bottom: 0.75rem;
  opacity: 0.8;
}

.services-title {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 5rem);
  color: var(--cream);
  line-height: 1;
  letter-spacing: -0.02em;
}

/* ─── Track ── */
.services-track {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .services-track {
    flex-direction: row;
    gap: 1.5rem;
    width: max-content;
    max-width: none;
    margin: 0;
    padding: 0 4rem;
    will-change: transform;
  }
}

/* ─── Card ── */
.service-card {
  background: var(--ink);
  border-top: 3px solid var(--blush);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  transition: transform 0.3s ease;
}

@media (min-width: 1024px) {
  .service-card {
    width: clamp(280px, 30vw, 380px);
    flex-shrink: 0;
  }

  .service-card:hover {
    transform: perspective(800px) rotateX(-4deg) rotateY(4deg);
  }
}

.service-icon {
  display: block;
  font-size: 2rem;
  color: var(--blush);
  margin-bottom: 1.25rem;
  line-height: 1;
}

.service-name {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--cream);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.service-body {
  font-family: 'General Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--cream);
  opacity: 0.55;
  line-height: 1.7;
}
</style>
