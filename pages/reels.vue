<script setup lang="ts">
useHead({
  title: 'Reels — Layan Altaher',
  meta: [
    { name: 'description', content: 'Motion and content reels by Layan Altaher — brand identity, social media, and design process videos.' },
  ],
})

interface Reel {
  title: string
  thumbnail: string
  thumbnailAlt?: string
  url: string
  duration: string
  description: string
}

const { data: reelsData } = await usePortfolioReels()
const reels = computed<Reel[]>(() => reelsData.value ?? [])

// Lightbox state
const activeReel = ref<Reel | null>(null)
const lightboxRef = ref<HTMLDivElement | null>(null)

const openReel = (reel: Reel) => {
  activeReel.value = reel
  const { gsap } = useGsap()
  const { $lenis } = useNuxtApp() as { $lenis?: { stop(): void } }
  $lenis?.stop()
  nextTick(() => {
    if (!gsap || !lightboxRef.value) return
    gsap.fromTo(lightboxRef.value,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
    )
  })
}

const closeReel = () => {
  const { gsap } = useGsap()
  const { $lenis } = useNuxtApp() as { $lenis?: { start(): void } }
  if (!gsap || !lightboxRef.value) {
    activeReel.value = null
    $lenis?.start()
    return
  }
  gsap.to(lightboxRef.value, {
    opacity: 0, scale: 0.95, duration: 0.3, ease: 'power3.in',
    onComplete: () => {
      activeReel.value = null
      $lenis?.start()
    },
  })
}

// Escape key closes lightbox
onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && activeReel.value) closeReel() }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))

  // Scroll reveal on cards
  const { gsap, ScrollTrigger } = useGsap()
  if (!gsap || !ScrollTrigger) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const cards = document.querySelectorAll<HTMLElement>('.reel-card')
  cards.forEach((card) => {
    gsap.fromTo(card,
      { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1, clipPath: 'inset(0% 0 0 0)',
        duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      },
    )
  })
})

const cursorState = inject<Ref<string>>('cursorState')
const onCardEnter = () => { if (cursorState) cursorState.value = 'view' }
const onCardLeave = () => { if (cursorState) cursorState.value = 'default' }
</script>

<template>
  <div class="reels-page">

    <!-- Page header -->
    <header class="reels-header">
      <h1 class="reels-title">
        <RevealText by="chars">REELS</RevealText>
      </h1>
      <p class="reels-sub">Motion &amp; Content</p>
    </header>

    <!-- Video grid -->
    <section class="reels-grid-wrap" aria-label="Video reels">
      <div class="reels-grid">
        <button
          v-for="reel in reels"
          :key="reel.title"
          class="reel-card"
          :aria-label="`Play ${reel.title}`"
          @click="openReel(reel)"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <div class="reel-thumb">
            <img
              v-if="reel.thumbnail && !reel.thumbnail.includes('placeholder-')"
              :src="reel.thumbnail"
              :alt="reel.thumbnailAlt || `${reel.title} thumbnail`"
              class="reel-thumb-image"
              loading="lazy"
            >
            <div v-else class="reel-thumb-placeholder">
              <span class="reel-thumb-title">{{ reel.title }}</span>
            </div>

            <!-- Hover overlay -->
            <div class="reel-overlay">
              <div class="play-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card info -->
          <div class="reel-info">
            <span class="reel-name">{{ reel.title }}</span>
            <span class="reel-duration">{{ reel.duration }}</span>
          </div>
        </button>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="activeReel"
        ref="lightboxRef"
        class="lightbox"
        role="dialog"
        :aria-label="`Playing: ${activeReel.title}`"
        @click.self="closeReel"
      >
        <div class="lightbox-inner">
          <button class="lightbox-close" aria-label="Close" @click="closeReel">✕</button>

          <!-- Video embed area -->
          <div class="lightbox-video-wrap">
            <template v-if="activeReel.url">
              <iframe
                :src="activeReel.url"
                class="lightbox-iframe"
                allowfullscreen
                :title="activeReel.title"
              />
            </template>
            <template v-else>
              <!-- TODO: replace with real video URL once Layan provides it -->
              <div class="lightbox-placeholder">
                <p class="placeholder-msg">Video coming soon</p>
                <p class="placeholder-sub">{{ activeReel.description }}</p>
              </div>
            </template>
          </div>

          <div class="lightbox-meta">
            <h2 class="lightbox-title">{{ activeReel.title }}</h2>
            <span class="lightbox-duration">{{ activeReel.duration }}</span>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
.reels-page {
  background: var(--navy);
  min-height: 100vh;
}

/* ─── Header ── */
.reels-header {
  padding: 9rem 1.25rem 3rem;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 768px) { .reels-header { padding: 10rem 2.5rem 4rem; } }
@media (min-width: 1024px) { .reels-header { padding: 11rem 4rem 5rem; } }

.reels-title {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(5rem, 12vw, 12rem);
  color: var(--blush);
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.reels-sub {
  font-family: 'Satoshi', sans-serif;
  font-size: 1.1rem;
  color: var(--cream);
  opacity: 0.6;
  letter-spacing: 0.02em;
}

/* ─── Grid ── */
.reels-grid-wrap {
  padding: 2rem 1.25rem 8rem;
}

@media (min-width: 768px) { .reels-grid-wrap { padding: 2rem 2.5rem 8rem; } }
@media (min-width: 1024px) { .reels-grid-wrap { padding: 2rem 4rem 10rem; } }

.reels-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) { .reels-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .reels-grid { grid-template-columns: repeat(3, 1fr); } }

/* ─── Card ── */
.reel-card {
  background: none;
  border: none;
  padding: 0;
  cursor: none;
  text-align: left;
}

.reel-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.reel-thumb-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--ink), rgba(245,160,192,0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reel-thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reel-card:hover .reel-thumb-placeholder,
.reel-card:hover .reel-thumb-image {
  transform: scale(1.04);
}

.reel-thumb-title {
  font-family: 'Clash Display', serif;
  font-size: 1rem;
  color: var(--blush);
  opacity: 0.25;
  letter-spacing: 0.1em;
  text-align: center;
  padding: 0 1rem;
}

/* Hover overlay */
.reel-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.reel-card:hover .reel-overlay { opacity: 1; }

.play-icon {
  color: white;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.reel-card:hover .play-icon { transform: scale(1); }

.reel-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.reel-name {
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--cream);
  min-width: 0;
  overflow-wrap: anywhere;
}

.reel-duration {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--cream);
  opacity: 0.4;
  flex-shrink: 0;
}

/* ─── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 800;
  background: rgba(15, 27, 76, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
}

.lightbox-inner {
  position: relative;
  width: 100%;
  max-width: 900px;
  padding-top: 3rem;
}

.lightbox-close {
  position: absolute;
  top: 0;
  right: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  color: var(--blush);
  background: none;
  border: none;
  cursor: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0.5rem;
}

.lightbox-close:hover { opacity: 1; }

.lightbox-video-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: var(--ink);
}

.lightbox-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.lightbox-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.placeholder-msg {
  font-family: 'Clash Display', serif;
  font-size: 1.5rem;
  color: var(--blush);
  opacity: 0.6;
}

.placeholder-sub {
  font-family: 'General Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--cream);
  opacity: 0.5;
  text-align: center;
  max-width: 42ch;
  line-height: 1.6;
}

.lightbox-meta {
  margin-top: 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.lightbox-title {
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--cream);
  min-width: 0;
  overflow-wrap: anywhere;
}

.lightbox-duration {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--cream);
  opacity: 0.4;
}
</style>
