<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap, ScrollTrigger, SplitText } = useGsap()
  if (!gsap || !ScrollTrigger) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Word-by-word reveal on paragraphs (desktop only — too heavy on mobile)
  const mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    const paragraphs = sectionRef.value?.querySelectorAll<HTMLElement>('.process-body p')
    if (!paragraphs?.length || !SplitText) return

    paragraphs.forEach((p) => {
      const split = new SplitText(p, { type: 'words' })
      gsap.set(split.words, { opacity: 0, y: 12 })
      ScrollTrigger.create({
        trigger: p,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.025,
            ease: 'power3.out',
          })
        },
      })
    })
  })

  // Mobile: simple fade-in per paragraph
  mm.add('(max-width: 1023px)', () => {
    const paragraphs = sectionRef.value?.querySelectorAll<HTMLElement>('.process-body p')
    if (!paragraphs?.length) return
    paragraphs.forEach((p) => {
      gsap.fromTo(p,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: p, start: 'top 88%', once: true } },
      )
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="work-process" aria-labelledby="process-heading">
    <div class="process-inner">
      <h2 id="process-heading" class="process-heading">The Process</h2>
      <div v-if="data.process?.length" class="process-body">
        <template v-for="(section, index) in data.process" :key="`${section.heading || 'section'}-${index}`">
          <h2 v-if="section.heading">{{ section.heading }}</h2>
          <p>{{ section.body }}</p>
        </template>
      </div>
      <div v-else class="process-body">
        <ContentRenderer :value="data" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-process {
  /* Slightly darker than --cs-bg for visual rhythm */
  background: color-mix(in srgb, var(--cs-bg) 85%, black);
  padding: 5rem 1.25rem 6rem;
}

@media (min-width: 768px) { .work-process { padding: 7rem 2.5rem 8rem; } }
@media (min-width: 1024px) { .work-process { padding: 9rem 4rem 10rem; } }

.process-inner {
  max-width: 760px;
  margin: 0 auto;
}

.process-heading {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3.5rem);
  /* Accent color for section headings — intentional brand touch */
  color: var(--cs-primary);
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.process-body {
  font-family: 'General Sans', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.85;
  color: var(--cs-text);
  opacity: 0.85;
}

.process-body :deep(p) { margin-bottom: 1.75rem; }
.process-body :deep(h2) {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: var(--cs-text);
  opacity: 1;
  margin: 3rem 0 1rem;
}
.process-body :deep(img) {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2rem 0;
}

/* Comments (<!-- -->) are hidden automatically by the browser */
.process-body :deep(.comment) { display: none; }
</style>
