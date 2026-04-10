<script setup lang="ts">
useHead({
  title: 'Layan Altaher — Graphic Designer & Content Creator',
  meta: [
    {
      name: 'description',
      content:
        'Portfolio of Layan Altaher — graphic designer, brand identity, and content creator based in Amman, Jordan.',
    },
    { property: 'og:title', content: 'Layan Altaher — Graphic Designer & Content Creator' },
    {
      property: 'og:description',
      content: 'Brand identity, social media design, and content creation from Amman, Jordan.',
    },
  ],
})

// Receive preloader state from app.vue via provide/inject
// app.vue provides 'navVisible' which doubles as preloaderDone signal
const navVisible = inject<Ref<boolean>>('navVisible', ref(false))
</script>

<template>
  <div class="home">
    <!-- 1. Hero -->
    <HomeHero :preloader-done="navVisible" />

    <!-- 2. Marquee ribbon -->
    <div class="marquee-ribbon">
      <AppMarquee />
    </div>

    <!-- 3. Selected work grid -->
    <HomeWorkGrid />

    <!-- 4. About teaser -->
    <HomeAboutTeaser />

    <!-- 5. Services horizontal scroll -->
    <HomeServicesScroll />
  </div>
</template>

<style scoped>
.home {
  background: var(--navy);
}

.marquee-ribbon {
  transform: rotate(-2deg) scaleX(1.05);
  overflow: hidden;
  margin: -1rem 0;
  position: relative;
  z-index: 1;
}
</style>
