<script setup lang="ts">
  const props = defineProps<{preloaderDone: boolean}>()

  const {data: site} = await usePortfolioSiteSettings()

  const home = computed(() => site.value?.home)
  const contact = computed(() => site.value?.contact)

  const headingRef = ref<HTMLElement | null>(null)
  const eyebrowRef = ref<HTMLElement | null>(null)
  const taglineRef = ref<HTMLElement | null>(null)
  const scrollRef = ref<HTMLElement | null>(null)

  const heroEyebrow = computed(() => home.value?.heroEyebrow || "— Portfolio")
  const heroTitleLine1 = computed(() => home.value?.heroTitleLine1 || "CREATIVE")
  const heroTitleLine2 = computed(() => home.value?.heroTitleLine2 || "DESIGNER")
  const heroTagline = computed(
    () =>
      home.value?.heroTagline || "Turning brands into experiences — through design, storytelling, and visual identity.",
  )
  const scrollLabel = computed(() => home.value?.scrollLabel || "SCROLL")
  const heroImage = computed(() => home.value?.aboutImage || "")
  const heroImageAlt = computed(() => `${heroTitleLine1.value} ${heroTitleLine2.value}`.trim() || "Hero portrait")
  const locationLabel = computed(() => contact.value?.location || "Based in Amman, Jordan")

  async function playHeroEntrance() {
    const {gsap} = useGsap()
    if (!gsap) return

    const tl = gsap.timeline({delay: 0.1})

    tl.fromTo(eyebrowRef.value, {opacity: 0, y: 16}, {opacity: 1, y: 0, duration: 0.6, ease: "power3.out"})

    const lines = headingRef.value?.querySelectorAll<HTMLElement>(".hero-line-inner")
    if (lines?.length) {
      tl.fromTo(lines, {yPercent: 110}, {yPercent: 0, duration: 1, stagger: 0.15, ease: "power4.out"}, "-=0.3")
    }

    tl.fromTo(taglineRef.value, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.6, ease: "power3.out"}, "-=0.4")

    tl.fromTo(scrollRef.value, {opacity: 0}, {opacity: 1, duration: 0.5, ease: "power2.out"}, "-=0.2")
  }

  watch(
    () => props.preloaderDone,
    (done) => {
      if (done) playHeroEntrance()
    },
  )

  onMounted(() => {
    const {gsap} = useGsap()
    if (!gsap) return

    if (props.preloaderDone) {
      gsap.set(eyebrowRef.value, {opacity: 0, y: 16})
      gsap.set(taglineRef.value, {opacity: 0, y: 20})
      gsap.set(scrollRef.value, {opacity: 0})
      const lines = headingRef.value?.querySelectorAll<HTMLElement>(".hero-line-inner")
      if (lines?.length) gsap.set(lines, {yPercent: 110})
      playHeroEntrance()
    }

    gsap.to(".hero-image-inner", {
      scale: 1.08,
      duration: 8,
      ease: "none",
      yoyo: true,
      repeat: -1,
    })
  })
</script>

<template>
  <section class="hero grain" aria-label="Hero">
    <div class="hero-grid">
      <div class="hero-text">
        <p ref="eyebrowRef" class="hero-eyebrow" style="opacity: 0">
          {{ heroEyebrow }}
        </p>

        <h1 ref="headingRef" class="hero-heading" :aria-label="`${heroTitleLine1} ${heroTitleLine2}`">
          <span class="hero-line">
            <span class="hero-line-inner">{{ heroTitleLine1 }}</span>
          </span>
          <span class="hero-line">
            <span class="hero-line-inner">{{ heroTitleLine2 }}</span>
          </span>
        </h1>

        <p ref="taglineRef" class="hero-tagline" style="opacity: 0">
          {{ heroTagline }}
        </p>

        <div ref="scrollRef" class="scroll-indicator" style="opacity: 0" aria-hidden="true">
          <span class="scroll-line">
            <span class="scroll-line-highlight" />
          </span>
          <span class="scroll-label">{{ scrollLabel }}</span>
        </div>
      </div>

      <div class="hero-image-col">
        <div class="hero-blob-wrap">
          <svg width="0" height="0" class="absolute">
            <defs>
              <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0 C0.78,0,1,0.22,1,0.5 C1,0.78,0.78,1,0.5,1 C0.22,1,0,0.78,0,0.5 C0,0.22,0.22,0,0.5,0Z" />
              </clipPath>
            </defs>
          </svg>

          <div class="hero-blob">
            <img v-if="heroImage" :src="heroImage" :alt="heroImageAlt" class="hero-image-inner hero-photo" />
            <div v-else class="hero-image-inner hero-placeholder">
              <span class="placeholder-label">LAYAN</span>
            </div>
          </div>

          <div class="location-pill">
            <span class="location-dot" aria-hidden="true">📍</span>
            {{ locationLabel }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .hero {
    min-height: 100svh;
    background: var(--navy);
    display: flex;
    align-items: center;
    padding: 7rem 1.25rem 4rem;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .hero {
      padding: 7rem 2.5rem 5rem;
    }
  }
  @media (min-width: 1024px) {
    .hero {
      padding: 7rem 4rem 5rem;
    }
  }

  .hero-grid {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
  }

  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: 60% 40%;
      gap: 2rem;
    }
  }

  /* ─── Text column ── */
  .hero-eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--blush);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 1.75rem;
  }

  .hero-heading {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    margin: 0 0 1.75rem;
    width: min(100%, 46rem);
  }

  .hero-line {
    overflow: hidden;
    display: block;
    margin-inline: -1.25rem;
    padding-inline: 1.25rem;
  }

  .hero-line-inner {
    display: block;
    font-family: "Clash Display", serif;
    font-weight: 700;
    font-size: clamp(3.75rem, 16cqw, 8rem);
    color: var(--blush);
    line-height: 0.92;
    letter-spacing: 0;
  }

  @supports not (font-size: 1cqw) {
    .hero-line-inner {
      font-size: clamp(3.75rem, 7.6vw, 8.5rem);
    }
  }

  .hero-tagline {
    font-family: "General Sans", sans-serif;
    font-style: italic;
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    color: var(--cream);
    opacity: 0.7;
    line-height: 1.7;
    margin-bottom: 3.5rem;
    max-width: 520px;
  }

  /* ─── Scroll indicator ── */
  .scroll-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: absolute;
    bottom: 2.5rem;
    left: 1.25rem;
  }

  @media (min-width: 768px) {
    .scroll-indicator {
      left: 2.5rem;
    }
  }
  @media (min-width: 1024px) {
    .scroll-indicator {
      left: 4rem;
    }
  }

  .scroll-line {
    position: relative;
    display: block;
    width: 40px;
    height: 2px;
    background: rgba(245, 160, 192, 0.3);
    overflow: hidden;
  }

  .scroll-line-highlight {
    position: absolute;
    inset: 0;
    background: var(--blush);
    animation: scan 1.8s ease-in-out infinite;
  }

  @keyframes scan {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }

  .scroll-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7rem;
    color: var(--cream);
    opacity: 0.5;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  /* ─── Image blob ── */
  .hero-image-col {
    display: none;
  }

  @media (min-width: 1024px) {
    .hero-image-col {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .hero-blob-wrap {
    position: relative;
    width: 100%;
    max-width: 460px;
  }

  .hero-blob {
    width: 100%;
    aspect-ratio: 4 / 5;
    clip-path: url(#blob-clip);
    overflow: hidden;
    border-radius: 50%;
  }

  .hero-image-inner {
    width: 100%;
    height: 100%;
    will-change: transform;
  }

  .hero-photo {
    object-fit: cover;
    display: block;
  }

  .hero-placeholder {
    background: linear-gradient(135deg, var(--ink), rgba(245, 160, 192, 0.15));
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(245, 160, 192, 0.2);
  }

  .placeholder-label {
    font-family: "Clash Display", serif;
    font-weight: 700;
    font-size: 2rem;
    color: var(--blush);
    opacity: 0.3;
    letter-spacing: 0.4em;
  }

  /* ─── Location pill ── */
  .location-pill {
    position: absolute;
    bottom: -1rem;
    left: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    background: var(--navy);
    border: 1.5px solid var(--blush);
    border-radius: 9999px;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7rem;
    color: var(--cream);
    white-space: nowrap;
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
</style>
