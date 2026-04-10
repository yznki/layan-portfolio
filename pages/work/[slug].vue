<script setup lang="ts">
import type { CSSProperties } from 'vue'

const route = useRoute()
const slug = computed<string>(() => {
  const value = route.params.slug
  if (Array.isArray(value)) return value[0] ?? ''
  return value ? String(value) : ''
})

const { data } = await usePortfolioProject(slug)

watchEffect(() => {
  if (data.value === null) {
    throw createError({ statusCode: 404, message: `Project "${slug.value}" not found` })
  }
})

const caseStudyStyle = computed<CSSProperties>(() => {
  if (!data.value) return {}

  const { palette } = data.value

  return {
    '--cs-primary': palette.primary,
    '--cs-secondary': palette.secondary,
    '--cs-accent': palette.accent,
    '--cs-bg': palette.bg,
    '--cs-text': palette.text ?? '#FFFFFF',
    '--cs-text-muted': palette.textMuted ?? 'rgba(255,255,255,0.55)',
    background: palette.bg,
  }
})

useHead(() => ({
  title: data.value ? `${data.value.title} — Layan Altaher` : 'Work — Layan Altaher',
  meta: [
    {
      name: 'description',
      content: data.value
        ? `${data.value.title} — ${data.value.category} by Layan Altaher`
        : 'Case study by Layan Altaher',
    },
    {
      property: 'og:title',
      content: data.value ? `${data.value.title} — Layan Altaher` : 'Work — Layan Altaher',
    },
    { property: 'og:image', content: data.value?.heroImage ?? '' },
  ],
}))
</script>

<template>
  <div v-if="data" :key="data.slug" class="case-study" :style="caseStudyStyle">
    <!-- WorkHero always first -->
    <WorkHero :data="data" />

    <!-- Sections driven by frontmatter order -->
    <template v-for="section in data.sections" :key="section">
      <WorkOverview    v-if="section === 'overview'" :data="data" />
      <WorkGallery     v-if="section === 'gallery'"  :data="data" />
      <WorkProcess     v-if="section === 'process'"  :data="data" />
      <WorkResults     v-if="section === 'results'"  :data="data" />
      <WorkNextProject
        v-if="section === 'next'"
        :key="data.nextProject"
        :slug="data.nextProject"
      />
    </template>
  </div>
</template>
