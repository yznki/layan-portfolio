<script setup lang="ts">
const headingRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap } = useGsap()
  if (!gsap) return

  // Image hover: slight straighten
  if (imageRef.value) {
    imageRef.value.addEventListener('mouseenter', () => {
      gsap.to(imageRef.value, { rotate: -1, scale: 1.02, duration: 0.4, ease: 'power2.out' })
    })
    imageRef.value.addEventListener('mouseleave', () => {
      gsap.to(imageRef.value, { rotate: -3, scale: 1, duration: 0.4, ease: 'power2.out' })
    })
  }
})
</script>

<template>
  <section class="about-teaser" aria-labelledby="about-teaser-heading">
    <div class="teaser-inner">
      <!-- Text column -->
      <div class="teaser-text">
        <p class="teaser-eyebrow">— About Me</p>

        <h2 id="about-teaser-heading" ref="headingRef" class="teaser-heading">
          <RevealText by="lines">
            GET TO KNOW ME
          </RevealText>
        </h2>

        <p class="teaser-body">
          I'm Layan — a marketing student at the University of Jordan with a passion for
          turning ideas into bold visual identities. I work across graphic design, branding,
          and content creation.
          <!-- TODO: replace with bio text from Layan -->
        </p>

        <MagneticButton to="/about" class="teaser-cta">
          More about me →
        </MagneticButton>
      </div>

      <!-- Image column (desktop only) -->
      <div class="teaser-image-col">
        <!-- TODO: replace with real portrait photo from Layan -->
        <div ref="imageRef" class="teaser-image-wrap">
          <div class="teaser-placeholder">
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
  .about-teaser { padding: 7rem 2.5rem 8rem; }
}
@media (min-width: 1024px) {
  .about-teaser { padding: 9rem 4rem 10rem; }
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

/* ─── Text ── */
.teaser-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--blush);
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.teaser-heading {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 5rem);
  color: var(--blush);
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1.75rem;
}

.teaser-body {
  font-family: 'General Sans', sans-serif;
  font-size: 1.05rem;
  color: var(--cream);
  opacity: 0.75;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 520px;
}

.teaser-cta {
  /* MagneticButton handles pill styling */
}

/* ─── Image ── */
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

.teaser-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--navy), rgba(245, 160, 192, 0.12));
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--blush);
  opacity: 0.35;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-align: center;
  line-height: 2;
}
</style>
