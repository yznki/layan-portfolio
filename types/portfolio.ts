export interface PortfolioPalette {
  primary: string
  secondary: string
  accent: string
  bg: string
  text: string
  textMuted: string
}

export interface PortfolioStat {
  label: string
  value: number
  suffix: string
}

export interface PortfolioGalleryImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface PortfolioProcessSection {
  heading?: string
  body: string
}

export interface PortfolioProject {
  title: string
  slug: string
  category: string
  year: number
  client: string
  role: string
  tools: string[]
  draft?: boolean
  featuredOrder?: number
  palette: PortfolioPalette
  cover: string
  coverImage: string
  coverAlt?: string
  heroImage: string
  heroAlt?: string
  galleryLayout: 'grid-2x2' | 'horizontal-scroll' | 'before-after' | 'large-first'
  gallery: PortfolioGalleryImage[]
  stats?: PortfolioStat[]
  sections: Array<'overview' | 'gallery' | 'process' | 'results' | 'next'>
  nextProject: string
  overview?: string
  challenge?: string
  process?: PortfolioProcessSection[]
  path?: string
  body?: unknown
  _source?: 'content'
}

export interface Reel {
  title: string
  thumbnail: string
  thumbnailAlt?: string
  url: string
  duration: string
  description: string
  featuredOrder?: number
  draft?: boolean
  _source?: 'json'
}
