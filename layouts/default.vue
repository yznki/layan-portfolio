<script setup lang="ts">
// NavVisible state is injected from app.vue after preloader completes
const navVisible = inject<Ref<boolean>>('navVisible', ref(false))
</script>

<template>
  <div class="layout-root">
    <AppNav :visible="navVisible" />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
