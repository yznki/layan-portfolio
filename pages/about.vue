<script setup lang="ts">
  const {data: about} = await usePortfolioAboutPage()
  const {data: site} = await usePortfolioSiteSettings()

  useHead(() => ({
    title: site.value?.seo?.aboutTitle || "About — Layan Altaher",
    meta: [
      {
        name: "description",
        content:
          site.value?.seo?.aboutDescription ||
          "About Layan Altaher — graphic designer, brand identity, and content creator based in Amman, Jordan.",
      },
      {
        property: "og:title",
        content: site.value?.seo?.aboutTitle || "About — Layan Altaher",
      },
      {
        property: "og:description",
        content: site.value?.seo?.aboutDescription || "Marketing student and graphic designer from Amman, Jordan.",
      },
    ],
  }))

  const heroHeadingRef = ref<HTMLElement | null>(null)
  const timelineRef = ref<HTMLElement | null>(null)
  const skillsRef = ref<HTMLElement | null>(null)

  const aboutPage = computed(() => about.value)

  const bioParagraphs = computed(() =>
    aboutPage.value?.bioParagraphs?.length ?
      aboutPage.value.bioParagraphs
    : [
        "I'm Layan — a marketing student at the University of Jordan with a deep passion for turning ideas into bold visual identities. Design, to me, is the art of making ideas impossible to ignore.",
        "Over the past few years I've worked across graphic design, brand identity, and content creation — helping organisations like KPMG Jordan and TEDxJU communicate with purpose and visual precision.",
        "Whether I'm building an identity system from scratch or redesigning a social media presence, I bring the same obsessive attention to detail and love of storytelling to every project.",
      ],
  )

  const timeline = computed(() =>
    aboutPage.value?.timeline?.length ?
      aboutPage.value.timeline
    : [
        {org: "TEDxJU 2025", role: "Graphic Designer", year: "2025", slug: "tedxju-2025"},
        {org: "KPMG Jordan", role: "Content Creator Intern", year: "2024", slug: "kpmg"},
        {org: "Kalmntina", role: "Social Media Intern", year: "2024", slug: "kalmntina"},
      ],
  )

  const toolIconMap: Record<string, string> = {
    Illustrator: "mdi:adobe",
    Photoshop: "mdi:adobe",
    Premiere: "mdi:adobe",
    "Premiere Pro": "mdi:adobe",
    "After Effects": "mdi:adobe",
    Canva: "mdi:brush",
    Figma: "mdi:pencil-ruler",
    InDesign: "mdi:adobe",
    Lightroom: "mdi:adobe",
  }

  const tools = computed(() =>
    (aboutPage.value?.tools?.length ?
      aboutPage.value.tools
    : ["Illustrator", "Photoshop", "Premiere Pro", "After Effects", "Canva", "Figma"]
    ).map((label) => ({
      label,
      icon: toolIconMap[label] || "mdi:toolbox-outline",
    })),
  )

  const headingText = computed(() => aboutPage.value?.title || "Hi! I'm Layan")
  const headingChars = computed(() =>
    headingText.value.split("").map((c, i) => ({
      char: c === " " ? "\u00A0" : c,
      key: i,
    })),
  )

  const heroImage = computed(() => aboutPage.value?.portrait || "")
  const heroIntro = computed(
    () => aboutPage.value?.intro || "Marketing student, graphic designer, and content creator based in Amman, Jordan.",
  )
  const contactEmail = computed(
    () => site.value?.contact?.email || site.value?.footer?.email || "Layan04ibrahim@gmail.com",
  )
  const cvUrl = computed(() => site.value?.contact?.cvUrl || "/cv.pdf")
  const educationTitle = computed(() => "University of Jordan")
  const educationDetail = computed(() => "Bachelor of Marketing · 2021–2025")

  onMounted(() => {
    const {gsap, ScrollTrigger} = useGsap()
    if (!gsap || !ScrollTrigger) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const chars = heroHeadingRef.value?.querySelectorAll<HTMLSpanElement>(".about-char")
    if (chars?.length) {
      gsap.set(chars, {yPercent: 110})
      gsap.to(chars, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.2,
      })
    }

    const paras = document.querySelectorAll<HTMLElement>(".bio-para")
    paras.forEach((p, i) => {
      gsap.fromTo(
        p,
        {opacity: 0, y: 20},
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {trigger: p, start: "top 85%", once: true},
          delay: i * 0.1,
        },
      )
    })

    const line = timelineRef.value?.querySelector<HTMLElement>(".timeline-line")
    if (line) {
      gsap.fromTo(
        line,
        {clipPath: "inset(0 0 100% 0)"},
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: {trigger: timelineRef.value, start: "top 70%", end: "bottom 60%", scrub: 1},
        },
      )
    }

    const dots = timelineRef.value?.querySelectorAll<HTMLElement>(".timeline-dot")
    dots?.forEach((dot) => {
      gsap.fromTo(
        dot,
        {scale: 0},
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {trigger: dot, start: "top 85%", once: true},
        },
      )
    })

    const cards = skillsRef.value?.querySelectorAll<HTMLElement>(".skill-card")
    if (cards?.length) {
      gsap.fromTo(
        cards,
        {opacity: 0, y: 24},
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {trigger: skillsRef.value, start: "top 80%", once: true},
        },
      )
    }
  })
</script>

<template>
  <div class="about-page">
    <section class="about-hero grain" aria-label="About hero">
      <div class="about-hero-image">
        <img v-if="heroImage" :src="heroImage" :alt="headingText" class="about-hero-photo" />
        <div v-else class="about-hero-placeholder" />
      </div>

      <div class="about-hero-text">
        <h1 ref="heroHeadingRef" class="about-heading" :aria-label="headingText">
          <span v-for="item in headingChars" :key="item.key" class="about-char">{{ item.char }}</span>
        </h1>

        <p class="about-intro">
          {{ heroIntro }}
        </p>
      </div>
    </section>

    <section class="about-bio" aria-label="Biography">
      <div class="bio-inner">
        <p v-for="(para, i) in bioParagraphs" :key="i" class="bio-para" style="opacity: 0">
          {{ para }}
        </p>
      </div>
    </section>

    <section ref="timelineRef" class="about-timeline" aria-label="Experience">
      <div class="timeline-inner">
        <h2 class="section-heading">Experience</h2>

        <div class="timeline-track">
          <div class="timeline-line" aria-hidden="true" />

          <div class="timeline-entries">
            <article v-for="entry in timeline" :key="`${entry.org}-${entry.year}`" class="timeline-entry">
              <div class="timeline-dot" aria-hidden="true" />
              <div class="timeline-content">
                <NuxtLink v-if="entry.slug" :to="`/work/${entry.slug}`" class="timeline-org">
                  {{ entry.org }}
                </NuxtLink>
                <span v-else class="timeline-org">
                  {{ entry.org }}
                </span>

                <p class="timeline-role">{{ entry.role }}</p>
                <span class="timeline-year">{{ entry.year }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section ref="skillsRef" class="about-skills" aria-labelledby="skills-heading">
      <div class="skills-inner">
        <h2 id="skills-heading" class="section-heading">Tools &amp; Skills</h2>

        <div class="skills-grid">
          <div v-for="tool in tools" :key="tool.label" class="skill-card" style="opacity: 0">
            <Icon :name="tool.icon" size="24" class="skill-icon" aria-hidden="true" />
            <span class="skill-label">{{ tool.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="about-edu" aria-label="Education and contact">
      <div class="edu-inner">
        <div class="edu-block">
          <p class="edu-eyebrow">Education</p>
          <h3 class="edu-title">{{ educationTitle }}</h3>
          <p class="edu-detail">{{ educationDetail }}</p>
        </div>

        <div class="cta-row">
          <MagneticButton :href="cvUrl" class="cv-btn"> Download CV </MagneticButton>
          <a :href="`mailto:${contactEmail}`" class="contact-link">
            {{ contactEmail }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .about-page {
    background: var(--navy);
  }

  /* ─── Hero ── */
  .about-hero {
    position: relative;
    background: var(--navy);
    overflow: hidden;
  }

  .about-hero-image {
    width: 100%;
    height: 60vh;
    overflow: hidden;
  }

  .about-hero-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* existing placeholder kept as fallback */
  .about-hero-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(160deg, var(--ink) 0%, rgba(245, 160, 192, 0.12) 100%);
  }

  .about-hero-text {
    max-width: 1280px;
    margin: -2rem auto 0;
    padding: 0 1.25rem 4rem;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .about-hero-text {
      padding: 0 2.5rem 5rem;
      margin-top: -3rem;
    }
  }
  @media (min-width: 1024px) {
    .about-hero-text {
      padding: 0 4rem 6rem;
      margin-top: -4rem;
    }
  }

  .about-heading {
    font-family: "Clash Display", serif;
    font-weight: 700;
    font-size: clamp(3rem, 7vw, 8rem);
    color: var(--blush);
    line-height: 0.95;
    letter-spacing: -0.02em;
    display: block;
    overflow-wrap: anywhere;
  }

  .about-char {
    display: inline-block;
  }

  .about-intro {
    max-width: 48rem;
    margin-top: 1.25rem;
    font-family: "General Sans", sans-serif;
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    color: var(--cream);
    opacity: 0.76;
    line-height: 1.8;
  }

  /* ─── Bio ── */
  .about-bio {
    background: var(--navy);
    padding: 3rem 1.25rem 5rem;
  }

  @media (min-width: 768px) {
    .about-bio {
      padding: 4rem 2.5rem 6rem;
    }
  }
  @media (min-width: 1024px) {
    .about-bio {
      padding: 5rem 4rem 7rem;
    }
  }

  .bio-inner {
    max-width: 65ch;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .bio-para {
    font-family: "General Sans", sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    color: var(--cream);
    opacity: 0.8;
    line-height: 1.9;
  }

  /* ─── Timeline ── */
  .about-timeline {
    background: var(--ink);
    padding: 5rem 1.25rem 6rem;
  }

  @media (min-width: 768px) {
    .about-timeline {
      padding: 7rem 2.5rem 8rem;
    }
  }
  @media (min-width: 1024px) {
    .about-timeline {
      padding: 9rem 4rem 10rem;
    }
  }

  .timeline-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-heading {
    font-family: "Clash Display", serif;
    font-weight: 700;
    font-size: clamp(2rem, 4vw, 3.5rem);
    color: var(--cream);
    letter-spacing: -0.02em;
    margin-bottom: 3.5rem;
  }

  .timeline-track {
    position: relative;
    padding-left: 2rem;
  }

  .timeline-line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(245, 160, 192, 0.3);
    clip-path: inset(0 0 100% 0);
  }

  .timeline-entries {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .timeline-entry {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .timeline-dot {
    position: absolute;
    left: -2.4rem;
    top: 0.35rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--blush);
    flex-shrink: 0;
    transform: scale(0);
  }

  .timeline-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .timeline-org {
    font-family: "Satoshi", sans-serif;
    font-weight: 600;
    font-size: 1.15rem;
    color: var(--cream);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .timeline-org:hover {
    color: var(--blush);
  }

  .timeline-role {
    font-family: "General Sans", sans-serif;
    font-style: italic;
    font-size: 0.95rem;
    color: var(--cream);
    opacity: 0.6;
  }

  .timeline-year {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--blush);
    opacity: 0.7;
    letter-spacing: 0.08em;
  }

  /* ─── Skills ── */
  .about-skills {
    background: var(--navy);
    padding: 5rem 1.25rem 6rem;
  }

  @media (min-width: 768px) {
    .about-skills {
      padding: 7rem 2.5rem 8rem;
    }
  }
  @media (min-width: 1024px) {
    .about-skills {
      padding: 9rem 4rem 10rem;
    }
  }

  .skills-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .skills-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .skills-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .skill-card {
    background: var(--cream);
    border-radius: 12px;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
    cursor: default;
  }

  .skill-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }

  .skill-icon {
    color: var(--navy);
    font-size: 1.5rem;
  }

  .skill-label {
    font-family: "General Sans", sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--navy);
    text-align: center;
    letter-spacing: 0.02em;
  }

  /* ─── Education + CTA ── */
  .about-edu {
    background: var(--ink);
    padding: 5rem 1.25rem 7rem;
  }

  @media (min-width: 768px) {
    .about-edu {
      padding: 7rem 2.5rem 9rem;
    }
  }
  @media (min-width: 1024px) {
    .about-edu {
      padding: 9rem 4rem 11rem;
    }
  }

  .edu-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .edu-inner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
    }
  }

  .edu-eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    color: var(--blush);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.7;
  }

  .edu-title {
    font-family: "Satoshi", sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--cream);
    margin-bottom: 0.4rem;
  }

  .edu-detail {
    font-family: "General Sans", sans-serif;
    font-size: 0.95rem;
    color: var(--cream);
    opacity: 0.55;
    font-style: italic;
  }

  .cta-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  @media (min-width: 640px) {
    .cta-row {
      flex-direction: row;
      align-items: center;
    }
  }

  .contact-link {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    color: var(--cream);
    opacity: 0.6;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition:
      opacity 0.2s,
      color 0.2s;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .contact-link:hover {
    opacity: 1;
    color: var(--blush);
  }
</style>
