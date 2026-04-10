<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    strength?: number
    tag?: string
    href?: string
    to?: string
  }>(),
  {
    strength: 0.4,
    tag: 'button',
  },
)

const btnRef = ref<HTMLElement | null>(null)
const cursorState = inject<Ref<string>>('cursorState')

onMounted(() => {
  if (!btnRef.value) return
  useMagnetic(btnRef, props.strength)
})

const onEnter = () => { if (cursorState) cursorState.value = 'hover' }
const onLeave = () => { if (cursorState) cursorState.value = 'default' }
</script>

<template>
  <NuxtLink
    v-if="to"
    ref="btnRef"
    :to="to"
    class="magnetic-btn"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    ref="btnRef"
    :href="href"
    class="magnetic-btn"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <slot />
  </a>
  <button
    v-else
    ref="btnRef"
    class="magnetic-btn"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <slot />
  </button>
</template>

<style scoped>
.magnetic-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: var(--blush);
  color: var(--navy);
  font-family: 'General Sans', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  border: none;
  text-decoration: none;
  cursor: none;
  will-change: transform;
  transition: background 0.25s ease;
}

.magnetic-btn:hover {
  background: var(--cream);
}
</style>
