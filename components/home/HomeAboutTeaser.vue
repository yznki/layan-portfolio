<script setup lang="ts">
  const headingRef = ref<HTMLElement | null>(null)
  const imageRef = ref<HTMLElement | null>(null)

  const {data: site} = await usePortfolioSiteSettings()

  const aboutContent = computed(() => site.value?.home)

  const aboutEyebrow = computed(() => aboutContent.value?.aboutEyebrow || "— About Me")
  const aboutTitle = computed(() => aboutContent.value?.aboutTitle || "GET TO KNOW ME")
  const aboutBody = computed(
    () =>
      aboutContent.value?.aboutBody ||
      "I'm Layan — a marketing student at the University of Jordan with a passion for turning ideas into bold visual identities. I work across graphic design, branding, and content creation.",
  )
  const aboutCtaUrl = computed(() => aboutContent.value?.aboutCtaUrl || "/about")
  const aboutCtaLabel = computed(() => aboutContent.value?.aboutCtaLabel || "More about me →")
  const aboutImage = computed(() => aboutContent.value?.aboutImage || "")
  const aboutImageAlt = computed(() => `${aboutTitle.value} portrait`)

  onMounted(() => {
    const {gsap} = useGsap()
    if (!gsap) return

    if (imageRef.value) {
      imageRef.value.addEventListener("mouseenter", () => {
        gsap.to(imageRef.value, {rotate: -1, scale: 1.02, duration: 0.4, ease: "power2.out"})
      })
      imageRef.value.addEventListener("mouseleave", () => {
        gsap.to(imageRef.value, {rotate: -3, scale: 1, duration: 0.4, ease: "power2.out"})
      })
    }
  })
</script>

<template>
  <section class="about-teaser" aria-labelledby="about-teaser-heading">
    <div class="teaser-inner">
      <div class="teaser-text">
        <p class="teaser-eyebrow">{{ aboutEyebrow }}</p>

        <h2 id="about-teaser-heading" ref="headingRef" class="teaser-heading">
          <RevealText by="lines">
            {{ aboutTitle }}
          </RevealText>
        </h2>

        <p class="teaser-body">
          {{ aboutBody }}
        </p>

        <MagneticButton :to="aboutCtaUrl" class="teaser-cta">
          {{ aboutCtaLabel }}
        </MagneticButton>
      </div>

      <div class="teaser-image-col">
        <div ref="imageRef" class="teaser-image-wrap">
          <img v-if="aboutImage" :src="aboutImage" :alt="aboutImageAlt" class="teaser-image" />

          <div v-else class="teaser-placeholder">
            <span class="placeholder-text">PHOTO<br />COMING<br />SOON</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .about-teaser {
    background: var(--ink);
    padding: 5rem 1.25rem 6rem;
  }

  @media (min-width: 768px) {
    .about-teaser {
      padding: 7rem 2.5rem 8rem;
    }
  }
  @media (min-width: 1024px) {
    .about-teaser {
      padding: 9rem 4rem 10rem;
    }
  }

  .teaser-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
    align-items: center;
  }

  @media (min-width: 1024px) {
    .teaser-inner {
      grid-template-columns: 55% 45%;
      gap: 6rem;
    }
  }

  .teaser-eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--blush);
    letter-spacing: 0.25em;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .teaser-heading {
    font-family: "Clash Display", serif;
    font-weight: 700;
    font-size: clamp(2.5rem, 5vw, 5rem);
    color: var(--blush);
    line-height: 1;
    letter-spacing: -0.02em;
    margin-bottom: 1.75rem;
  }

  .teaser-body {
    font-family: "General Sans", sans-serif;
    font-size: 1.05rem;
    color: var(--cream);
    opacity: 0.75;
    line-height: 1.8;
    margin-bottom: 2.5rem;
    max-width: 520px;
  }

  .teaser-image-col {
    display: none;
  }

  @media (min-width: 1024px) {
    .teaser-image-col {
      display: flex;
      justify-content: center;
    }
  }

  .teaser-image-wrap {
    width: 100%;
    max-width: 420px;
    aspect-ratio: 3 / 4;
    border-radius: 20px;
    border: 2px solid var(--blush);
    overflow: hidden;
    transform: rotate(-3deg);
    will-change: transform;
  }

  .teaser-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .teaser-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--navy), rgba(245, 160, 192, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placeholder-text {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    color: var(--blush);
    opacity: 0.35;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-align: center;
    line-height: 2;
  }
</style>
