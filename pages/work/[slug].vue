<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Nuxt Content v3: queryCollection by path
const { data } = await useAsyncData(`work:${slug}`, () =>
  queryCollection('work').path(`/work/${slug}`).first(),
)

if (!data.value) {
  throw createError({ statusCode: 404, message: `Project "${slug}" not found` })
}

// Inject per-project CSS variables on <main>.
// Pass a computed so it re-fires when the slug changes (component is reused by the router).
useCaseStudyTheme(computed(() => data.value?.palette))

useHead({
  title: `${data.value.title} — Layan Altaher`,
  meta: [
    { name: 'description', content: `${data.value.title} — ${data.value.category} by Layan Altaher` },
    { property: 'og:title', content: `${data.value.title} — Layan Altaher` },
    { property: 'og:image', content: data.value.heroImage },
  ],
})
</script>

<template>
  <div class="case-study" :style="{ background: 'var(--cs-bg)' }">
    <!-- WorkHero always first -->
    <WorkHero :data="data" />

    <!-- Sections driven by frontmatter order -->
    <template v-for="section in data.sections" :key="section">
      <WorkOverview    v-if="section === 'overview'" :data="data" />
      <WorkGallery     v-if="section === 'gallery'"  :data="data" />
      <WorkProcess     v-if="section === 'process'"  :data="data" />
      <WorkResults     v-if="section === 'results'"  :data="data" />
      <WorkNextProject v-if="section === 'next'"     :slug="data.nextProject" />
    </template>
  </div>
</template>
