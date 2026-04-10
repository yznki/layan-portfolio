import type { PortfolioGalleryImage, PortfolioProcessSection, PortfolioProject, Reel } from '~/types/portfolio'

const splitMarkdownSections = (body: unknown) => {
  if (typeof body !== 'string') {
    return {
      overview: '',
      challenge: '',
      process: [] as PortfolioProcessSection[],
    }
  }

  const trimmed = body.trim()
  if (!trimmed) {
    return {
      overview: '',
      challenge: '',
      process: [] as PortfolioProcessSection[],
    }
  }

  const parts = trimmed.split(/\n##\s+/)
  const [first, ...rest] = parts
  const result = {
    overview: (first ?? '').replace(/^##\s+Overview\s*/i, '').trim(),
    challenge: '',
    process: [] as PortfolioProcessSection[],
  }

  for (const rawPart of rest) {
    const [rawHeading, ...bodyLines] = rawPart.split('\n')
    const heading = (rawHeading ?? '').trim()
    const sectionBody = bodyLines.join('\n').trim()
    if (!sectionBody) continue

    if (/^challenge$/i.test(heading)) {
      result.challenge = sectionBody
      continue
    }

    result.process.push({
      heading,
      body: sectionBody,
    })
  }

  return result
}

const normalizeGallery = (gallery?: PortfolioGalleryImage[]) =>
  (gallery ?? []).filter((item) => item?.src && item?.alt)

const sortProjects = (projects: PortfolioProject[]) =>
  projects.sort((a, b) => {
    const aOrder = a.featuredOrder ?? Number.MAX_SAFE_INTEGER
    const bOrder = b.featuredOrder ?? Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder
    return b.year - a.year
  })

const normalizeContentProject = (doc: any): PortfolioProject => {
  const parsed = splitMarkdownSections(doc?.body as string | undefined)

  return {
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    year: doc.year,
    client: doc.client,
    role: doc.role,
    tools: doc.tools ?? [],
    draft: doc.draft ?? false,
    palette: {
      primary: doc.palette.primary,
      secondary: doc.palette.secondary,
      accent: doc.palette.accent,
      bg: doc.palette.bg,
      text: doc.palette.text ?? '#FFFFFF',
      textMuted: doc.palette.textMuted ?? 'rgba(255,255,255,0.55)',
    },
    cover: doc.cover,
    coverImage: doc.cover,
    heroImage: doc.heroImage,
    galleryLayout: doc.galleryLayout ?? 'grid-2x2',
    gallery: normalizeGallery(doc.gallery),
    stats: doc.stats ?? [],
    sections: doc.sections ?? ['overview', 'gallery', 'process', 'results', 'next'],
    nextProject: doc.nextProject,
    overview: parsed.overview,
    challenge: parsed.challenge,
    process: parsed.process,
    path: doc.path,
    body: doc,
    _source: 'content',
  }
}

const normalizeJsonReel = (reel: any): Reel => ({
  title: reel.title,
  thumbnail: reel.thumbnail,
  thumbnailAlt: reel.thumbnailAlt,
  url: reel.url,
  duration: reel.duration,
  description: reel.description,
  featuredOrder: reel.featuredOrder,
  draft: reel.draft,
  _source: 'json',
})

export const usePortfolioProjects = async () => {
  return useAsyncData('portfolio-projects', async () => {
    const docs = await queryCollection('work').all()
    return sortProjects(
      docs
        .map(normalizeContentProject)
        .filter((project) => !project.draft),
    )
  })
}

export const usePortfolioProject = async (slug: MaybeRefOrGetter<string>) => {
  const slugValue = computed(() => toValue(slug))

  return useAsyncData(() => `portfolio-project:${slugValue.value}`, async () => {
    const doc = await queryCollection('work').path(`/work/${slugValue.value}`).first()
    if (!doc) return null
    return normalizeContentProject(doc)
  }, {
    watch: [slugValue],
  })
}

export const usePortfolioReels = async () => {
  return useAsyncData('portfolio-reels', async () => {
    const reelsFile = (await import('~/public/reels.json')).default as { reels?: Reel[] }
    const jsonReels = reelsFile.reels ?? []
    return jsonReels
      .map(normalizeJsonReel)
      .filter((reel) => !reel.draft)
      .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER))
  })
}
