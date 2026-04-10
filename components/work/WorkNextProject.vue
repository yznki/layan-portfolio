<script setup lang="ts">
const props = defineProps<{ slug: string }>()

const nextSlug = computed(() => props.slug)
const nextKey = computed(() => `next:${nextSlug.value}`)

const { data: next } = await useAsyncData(nextKey, () =>
  queryCollection('work').path(`/work/${nextSlug.value}`).first(),
)

const wrapRef    = ref<HTMLElement | null>(null)
const imageRef   = ref<HTMLDivElement | null>(null)
const cursorState = inject<Ref<string>>('cursorState')

const onEnter = () => {
  if (cursorState) cursorState.value = 'view'
  const { gsap } = useGsap()
  if (!gsap || !imageRef.value) return
  gsap.to(imageRef.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.7,
    ease: 'power3.out',
  })
}

const onLeave = () => {
  if (cursorState) cursorState.value = 'default'
  const { gsap } = useGsap()
  if (!gsap || !imageRef.value) return
  gsap.to(imageRef.value, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.5,
    ease: 'power3.in',
  })
}
</script>

<template>
  <section v-if="next" class="next-project" aria-label="Next project">
    <NuxtLink
      :to="`/work/${next.slug}`"
      class="next-link"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div ref="wrapRef" class="next-inner">
        <p class="next-eyebrow">NEXT PROJECT</p>

        <div class="next-title-wrap">
          <h2 class="next-title">{{ next.title }}</h2>

          <!-- Image sweeps in from right on hover -->
          <div
            ref="imageRef"
            class="next-image"
            :style="{
              clipPath: 'inset(0 100% 0 0)',
              background: `linear-gradient(135deg, ${next.palette.bg}, ${next.palette.primary}66)`,
            }"
          >
            <!-- TODO: replace with real next-project cover image -->
            <span class="next-image-placeholder">{{ next.title }}</span>
          </div>
        </div>

        <p class="next-category">{{ next.category }}</p>

        <span class="next-arrow" aria-hidden="true">→</span>
      </div>
    </NuxtLink>
  </section>
</template>

<style scoped>
.next-project {
  background: var(--navy);
  border-top: 1px solid rgba(255, 245, 240, 0.08);
}

.next-link {
  display: block;
  text-decoration: none;
  cursor: none;
  padding: 5rem 1.25rem 6rem;
}

@media (min-width: 768px) { .next-link { padding: 6rem 2.5rem 7rem; } }
@media (min-width: 1024px) { .next-link { padding: 7rem 4rem 8rem; } }

.next-inner {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
}

.next-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--blush);
  letter-spacing: 0.25em;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.next-title-wrap {
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}

.next-title {
  font-family: 'Clash Display', serif;
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 9rem);
  color: var(--cream);
  line-height: 0.9;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.next-link:hover .next-title {
  color: var(--blush);
}

/* Image overlay that sweeps in from right on hover */
.next-image {
  position: absolute;
  inset: -10% 0;
  z-index: 0;
  border-radius: 8px;
  overflow: hidden;
  will-change: clip-path;
}

.next-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Clash Display', serif;
  font-size: 2rem;
  color: white;
  opacity: 0.2;
  letter-spacing: 0.1em;
}

.next-category {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--cream);
  opacity: 0.4;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.next-arrow {
  display: inline-block;
  font-size: 2rem;
  color: var(--blush);
  transition: transform 0.3s ease;
}

.next-link:hover .next-arrow {
  transform: translateX(12px);
}

/* Mobile: always show a bit of the image */
@media (max-width: 1023px) {
  .next-image {
    clip-path: inset(0 60% 0 0) !important;
  }
}
</style>
