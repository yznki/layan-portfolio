<script setup lang="ts">
const preloaderDone = ref(false)
const navVisible = ref(false)

// Cursor state — provided here so ALL descendants (including work cards) can inject it
const cursorState = ref<'default' | 'hover' | 'view' | 'drag'>('default')

// Expose to all descendants
provide('navVisible', navVisible)
provide('cursorState', cursorState)

const onPreloaderDone = () => {
  preloaderDone.value = true

  // Start Lenis after preloader exits
  const { $lenis } = useNuxtApp() as { $lenis?: { start(): void } }
  $lenis?.start()

  // Short delay then show nav
  setTimeout(() => {
    navVisible.value = true
  }, 100)
}

// Stop Lenis scroll while preloader is running
onMounted(() => {
  const { $lenis } = useNuxtApp() as { $lenis?: { stop(): void } }
  $lenis?.stop()
})

// Reset scroll to top and refresh ScrollTrigger positions on every navigation
const router = useRouter()
router.afterEach(() => {
  const nuxtApp = useNuxtApp() as any
  nuxtApp.$lenis?.scrollTo(0, { immediate: true })

  // Re-calculate all ScrollTrigger positions after the new page renders
  nextTick(() => {
    nuxtApp.$ScrollTrigger?.refresh()
  })
})

// Page transition overlay ref
const pageTransitionOverlay = ref<HTMLDivElement | null>(null)
provide('pageTransitionOverlay', pageTransitionOverlay)
</script>

<template>
  <div>
    <!-- Preloader — shown until done -->
    <AppPreloader v-if="!preloaderDone" @done="onPreloaderDone" />

    <!-- Custom cursor (client-only to avoid SSR mismatch) -->
    <ClientOnly>
      <AppCursor />
    </ClientOnly>

    <!-- Page transition overlay -->
    <div
      ref="pageTransitionOverlay"
      class="page-overlay"
      aria-hidden="true"
    />

    <!-- Main app -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-overlay {
  position: fixed;
  inset: 0;
  background: var(--navy);
  z-index: 500;
  pointer-events: none;
  opacity: 0;
}
</style>
