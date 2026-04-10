<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items?: string[]
    speed?: number
    direction?: 'left' | 'right'
  }>(),
  {
    items: () => [
      'GRAPHIC DESIGN',
      'BRANDING',
      'CONTENT CREATION',
      'SOCIAL MEDIA',
      'LOGO DESIGN',
      'VISUAL IDENTITY',
    ],
    speed: 60,
    direction: 'left',
  },
)

// Duplicate items for seamless loop
const doubled = computed(() => [...props.items, ...props.items])

const duration = computed(() => `${props.items.length * (120 / props.speed)}s`)
const animDir = computed(() => props.direction === 'left' ? 'marquee-left' : 'marquee-right')
</script>

<template>
  <div class="marquee-wrapper">
    <div
      class="marquee-track"
      :style="{ '--duration': duration }"
      :class="animDir"
    >
      <span
        v-for="(item, i) in doubled"
        :key="i"
        class="marquee-item"
      >
        {{ item }}
        <span class="marquee-dot" aria-hidden="true">·</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrapper {
  overflow: hidden;
  padding: 1rem 0;
  border-top: 1px solid rgba(245, 160, 192, 0.15);
  border-bottom: 1px solid rgba(245, 160, 192, 0.15);
  background: var(--ink);
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.marquee-left  { animation: marquee-left  var(--duration) linear infinite; }
.marquee-right { animation: marquee-right var(--duration) linear infinite; }

.marquee-item {
  font-family: 'Clash Display', serif;
  font-weight: 600;
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  color: var(--cream);
  opacity: 0.7;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0 1.25rem;
  flex-shrink: 0;
}

.marquee-dot {
  color: var(--blush);
  margin-left: 1.25rem;
  opacity: 0.6;
}
</style>
