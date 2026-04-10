<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : String(value)
})

const workKey = computed(() => `work:${slug.value}`)

// Nuxt Content v3: queryCollection by path.
// Keep the key reactive so navigating between /work/* routes refreshes this page instance.
const { data } = await useAsyncData(workKey, async () => {
  const project = await queryCollection('work').path(`/work/${slug.value}`).first()

  if (!project) {
    throw createError({ statusCode: 404, message: `Project "${slug.value}" not found` })
  }

  return project
})

// Inject per-project CSS variables on <main>.
// Pass a computed so it re-fires when the slug changes (component is reused by the router).
useCaseStudyTheme(computed(() => data.value?.palette))

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
  <div v-if="data" :key="data.slug" class="case-study" :style="{ background: 'var(--cs-bg)' }">
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
