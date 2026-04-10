<script setup lang="ts">
const ctaLetters = "LET'S WORK TOGETHER".split('')

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'mdi:instagram' },
  { label: 'LinkedIn',  href: '#', icon: 'mdi:linkedin'  },
  { label: 'Behance',   href: '#', icon: 'mdi:behance'   },
]

onMounted(() => {
  const { gsap } = useGsap()
  if (!gsap) return

  // Per-letter hover shift
  document.querySelectorAll<HTMLSpanElement>('.footer-letter').forEach((letter) => {
    letter.addEventListener('mouseenter', () => {
      gsap.to(letter, { y: -8, duration: 0.2, ease: 'power2.out' })
    })
    letter.addEventListener('mouseleave', () => {
      gsap.to(letter, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
    })
  })
})
</script>

<template>
  <footer class="app-footer">
    <!-- Radial glow behind CTA -->
    <div class="footer-glow" aria-hidden="true" />

    <div class="footer-inner">
      <!-- CTA Heading -->
      <div class="footer-cta-wrap" aria-label="Let's work together">
        <h2 class="footer-cta" aria-hidden="true">
          <span
            v-for="(letter, i) in ctaLetters"
            :key="i"
            class="footer-letter"
          >{{ letter === ' ' ? '\u00A0' : letter }}</span>
        </h2>
        <p class="sr-only">Let's work together</p>
      </div>

      <!-- Contact info -->
      <div class="footer-contact">
        <a href="mailto:Layan04ibrahim@gmail.com" class="footer-email">
          Layan04ibrahim@gmail.com
        </a>
        <!-- TODO: replace with real phone number from Layan -->
        <span class="footer-phone">+962 — —</span>
      </div>

      <!-- Social links -->
      <div class="footer-social">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          :aria-label="link.label"
          class="social-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :name="link.icon" size="20" />
        </a>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <span class="footer-copy">
          © {{ new Date().getFullYear() }} Layan Altaher. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  background: linear-gradient(to bottom, var(--ink), var(--navy));
  overflow: hidden;
  padding: 5rem 1.25rem 2.5rem;
}

@media (min-width: 768px) {
  .app-footer { padding: 7rem 2.5rem 3rem; }
}

.footer-glow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse at center, rgba(245,160,192,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-cta-wrap {
  margin-bottom: 3rem;
}

.footer-cta {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 6vw, 7rem);
  color: var(--blush);
  line-height: 0.95;
  letter-spacing: -0.02em;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}

.footer-letter {
  display: inline-block;
  cursor: default;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 640px) {
  .footer-contact {
    flex-direction: row;
    gap: 3rem;
  }
}

.footer-email,
.footer-phone {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--cream);
  opacity: 0.6;
  text-decoration: none;
  transition: opacity 0.2s ease;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.footer-email:hover {
  opacity: 1;
  color: var(--blush);
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--blush);
  color: var(--blush);
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease;
}

.social-icon:hover {
  background: var(--blush);
  color: var(--navy);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 245, 240, 0.08);
  padding-top: 1.5rem;
}

.footer-copy {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--cream);
  opacity: 0.3;
  letter-spacing: 0.05em;
  overflow-wrap: anywhere;
}
</style>
