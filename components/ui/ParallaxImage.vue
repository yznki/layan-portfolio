<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    speed?: number
    width?: number | string
    height?: number | string
    eager?: boolean
  }>(),
  {
    speed: 0.15,
    eager: false,
  },
)

const wrapRef = ref<HTMLDivElement | null>(null)
const imgRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!imgRef.value) return
  useParallax(imgRef, props.speed)
})
</script>

<template>
  <!-- Wrapper clips the parallax overflow -->
  <div ref="wrapRef" class="parallax-wrap">
    <!-- Scale image slightly so parallax edges don't show -->
    <div ref="imgRef" class="parallax-inner">
      <NuxtImg
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : undefined"
        class="parallax-img"
      />
    </div>
  </div>
</template>

<style scoped>
.parallax-wrap {
  overflow: hidden;
  display: block;
  width: 100%;
  height: 100%;
}

.parallax-inner {
  width: 100%;
  height: 130%; /* Extra height to allow vertical parallax travel */
  margin-top: -15%;
  will-change: transform;
}

.parallax-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
