<script setup lang="ts">
const props = defineProps<{ visible: boolean }>()

const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)
const navRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLDivElement | null>(null)

const links = [
  { label: 'Work',    href: '/#work'  },
  { label: 'About',   href: '/about'  },
  { label: 'Reels',   href: '/reels'  },
  { label: 'Contact', href: 'mailto:Layan04ibrahim@gmail.com' },
]

// Scroll-based blur background
onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 80 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// Mobile menu GSAP toggle
const toggleMenu = () => {
  const { gsap } = useGsap()
  if (!gsap || !menuRef.value) return

  if (!menuOpen.value) {
    menuOpen.value = true
    gsap.fromTo(
      menuRef.value,
      { opacity: 0, yPercent: -4 },
      { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power3.out' },
    )
    gsap.fromTo(
      menuRef.value.querySelectorAll('.mobile-link'),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out', delay: 0.1 },
    )
  } else {
    gsap.to(menuRef.value, {
      opacity: 0,
      yPercent: -4,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => { menuOpen.value = false },
    })
  }
}

// Close menu on route change
watch(() => route.path, () => {
  if (menuOpen.value) toggleMenu()
})
</script>

<template>
  <header
    ref="navRef"
    class="app-nav"
    :class="{
      'nav-scrolled': scrolled,
      'nav-visible': visible,
    }"
  >
    <div class="nav-inner">
      <!-- Logo -->
      <NuxtLink to="/" class="nav-logo" aria-label="Layan Altaher — Home">
        LA
      </NuxtLink>

      <!-- Desktop links -->
      <nav class="nav-links" aria-label="Main navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="nav-link"
          :class="{ 'nav-link--active': route.path === link.href }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="nav-hamburger"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span class="hamburger-line" :class="{ open: menuOpen }" />
        <span class="hamburger-line" :class="{ open: menuOpen }" />
        <span class="hamburger-line" :class="{ open: menuOpen }" />
      </button>
    </div>

    <!-- Mobile fullscreen overlay -->
    <div v-show="menuOpen" ref="menuRef" class="mobile-menu">
      <nav aria-label="Mobile navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="mobile-link"
          @click="toggleMenu"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: background 0.3s ease, opacity 0.5s ease;
}

.nav-visible {
  opacity: 1;
  pointer-events: auto;
}

.nav-scrolled {
  background: rgba(15, 27, 76, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .nav-inner { padding: 1.25rem 2.5rem; }
}

.nav-logo {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--blush);
  text-decoration: none;
  letter-spacing: -0.02em;
  line-height: 1;
}

.nav-links {
  display: none;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .nav-links { display: flex; }
}

.nav-link {
  font-family: 'General Sans', sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--cream);
  text-decoration: none;
  opacity: 0.75;
  transition: color 0.2s ease, opacity 0.2s ease;
  position: relative;
}

.nav-link:hover,
.nav-link--active {
  color: var(--blush);
  opacity: 1;
}

.nav-link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--blush);
  border-radius: 50%;
}

/* ─── Hamburger ── */
.nav-hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  background: none;
  border: none;
  cursor: none;
}

@media (min-width: 768px) {
  .nav-hamburger { display: none; }
}

.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--cream);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

.hamburger-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ─── Mobile menu ── */
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--navy);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.mobile-link {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: var(--cream);
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
  opacity: 0;
}

.mobile-link:hover {
  color: var(--blush);
}
</style>
