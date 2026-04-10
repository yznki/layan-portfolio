<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()

const leftRef  = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.fromTo(leftRef.value,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: leftRef.value, start: 'top 80%', once: true } },
  )
  gsap.fromTo(rightRef.value,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: rightRef.value, start: 'top 80%', once: true } },
  )
})

const facts = computed(() => [
  { label: 'Client',   value: props.data.client },
  { label: 'Role',     value: props.data.role   },
  { label: 'Year',     value: String(props.data.year) },
  { label: 'Category', value: props.data.category },
])
</script>

<template>
  <section class="work-overview" aria-labelledby="overview-heading">
    <div class="overview-inner">
      <!-- Left: body text -->
      <div ref="leftRef" class="overview-left" style="opacity: 0">
        <h2 id="overview-heading" class="overview-heading">Overview</h2>
        <div class="overview-accent-line" />
        <!-- Renders the markdown body -->
        <div class="overview-body">
          <ContentRenderer :value="data" />
        </div>
      </div>

      <!-- Right: key facts -->
      <div ref="rightRef" class="overview-right" style="opacity: 0">
        <div class="facts-grid">
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="fact-card"
          >
            <span class="fact-label">{{ fact.label }}</span>
            <span class="fact-value">{{ fact.value }}</span>
          </div>
        </div>

        <!-- Tools as pill tags -->
        <div class="tools-wrap">
          <span class="tools-label">Tools</span>
          <div class="tools-list">
            <span
              v-for="tool in data.tools"
              :key="tool"
              class="tool-tag"
            >{{ tool }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-overview {
  background: var(--cs-bg);
  padding: 5rem 1.25rem 6rem;
}

@media (min-width: 768px) { .work-overview { padding: 6rem 2.5rem 7rem; } }
@media (min-width: 1024px) { .work-overview { padding: 7rem 4rem 8rem; } }

.overview-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .overview-inner { grid-template-columns: 55% 45%; gap: 6rem; }
}

/* ─── Left ── */
.overview-heading {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: var(--cs-text);
  margin-bottom: 1rem;
}

.overview-accent-line {
  height: 4px;
  background: var(--cs-accent);
  width: 100%;
  margin-bottom: 2rem;
}

.overview-body {
  font-family: 'General Sans', sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--cs-text);
  opacity: 0.85;
}

/* ContentRenderer prose styles */
.overview-body :deep(p) { margin-bottom: 1.25rem; }
.overview-body :deep(h2) {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--cs-text);
  opacity: 1;
  margin: 2rem 0 0.75rem;
}
.overview-body :deep(h2:first-child) { display: none; } /* hide H2 if same as section heading */

/* ─── Right ── */
.facts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.fact-card {
  border: 1px solid color-mix(in srgb, var(--cs-text) 20%, transparent);
  border-radius: 10px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.fact-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: var(--cs-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.fact-value {
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--cs-text);
}

/* ─── Tools ── */
.tools-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tools-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: var(--cs-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tool-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--cs-text);
  border: 1px solid color-mix(in srgb, var(--cs-text) 30%, transparent);
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  letter-spacing: 0.03em;
}
</style>
