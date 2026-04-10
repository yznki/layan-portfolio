<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()

const hasStats = computed(() => props.data.stats?.length > 0)
</script>

<template>
  <section v-if="hasStats" class="work-results" aria-labelledby="results-heading">
    <div class="results-inner">
      <h2 id="results-heading" class="results-heading">Impact</h2>

      <div class="stats-grid">
        <div
          v-for="stat in data.stats"
          :key="stat.label"
          class="stat-item"
        >
          <div class="stat-number">
            <CountUp :target="stat.value" :suffix="stat.suffix" :duration="2.2" />
          </div>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-results {
  background: var(--cs-primary);
  padding: 5rem 1.25rem 6rem;
}

@media (min-width: 768px) { .work-results { padding: 7rem 2.5rem 8rem; } }
@media (min-width: 1024px) { .work-results { padding: 9rem 4rem 10rem; } }

.results-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.results-heading {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3.5rem);
  color: var(--cs-secondary);
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-number {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(3rem, 6vw, 6rem);
  color: var(--cs-secondary);
  line-height: 1;
  letter-spacing: -0.03em;
}

.stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--cs-secondary);
  opacity: 0.6;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
