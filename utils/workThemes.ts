export const DEFAULT_TRANSITION_BG = '#0F1B4C'

export const WORK_THEME_BG: Record<string, string> = {
  'tedxju-2025': '#0A0A0A',
  kpmg: '#E8EAF0',
  kalmntina: '#FFF3E0',
}

export function getRouteTransitionBg(path: string) {
  const [, section, slug] = path.split('/')

  if (section !== 'work' || !slug) {
    return DEFAULT_TRANSITION_BG
  }

  return WORK_THEME_BG[slug] ?? DEFAULT_TRANSITION_BG
}
