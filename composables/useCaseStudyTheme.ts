import { type MaybeRefOrGetter, toValue, watchEffect, onUnmounted } from 'vue'

interface CaseStudyPalette {
  primary: string
  secondary: string
  accent: string
  bg: string
  text?: string
  textMuted?: string
}

/**
 * Reactively injects per-case-study CSS variables onto the <main> element.
 * Accepts a plain palette OR a computed/ref so it re-applies when the slug
 * changes without unmounting the page component.
 */
export function useCaseStudyTheme(palette: MaybeRefOrGetter<CaseStudyPalette | null | undefined>) {
  watchEffect(() => {
    if (!import.meta.client) return
    const p = toValue(palette)
    if (!p) return
    const main = document.querySelector('main')
    if (!main) return
    main.style.setProperty('--cs-primary',    p.primary)
    main.style.setProperty('--cs-secondary',  p.secondary)
    main.style.setProperty('--cs-accent',     p.accent)
    main.style.setProperty('--cs-bg',         p.bg)
    main.style.setProperty('--cs-text',       p.text       ?? '#FFFFFF')
    main.style.setProperty('--cs-text-muted', p.textMuted  ?? 'rgba(255,255,255,0.55)')
  })

  onUnmounted(() => {
    if (!import.meta.client) return
    const main = document.querySelector('main')
    if (!main) return
    main.style.removeProperty('--cs-primary')
    main.style.removeProperty('--cs-secondary')
    main.style.removeProperty('--cs-accent')
    main.style.removeProperty('--cs-bg')
    main.style.removeProperty('--cs-text')
    main.style.removeProperty('--cs-text-muted')
  })
}
