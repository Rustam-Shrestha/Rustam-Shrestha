export type ProjectCategory = 'Full Stack' | 'Frontend' | 'Mobile' | 'UI/UX' | 'Open Source' | 'All'

export interface ProjectLink {
  label: string
  url: string
  type: 'live' | 'github' | 'docs' | 'demo'
}

export interface Project {
  id: string
  title: string
  slug: string
  tagline: string
  description: string
  coverImage: string
  tags: string[]
  category: ProjectCategory
  featured?: boolean
  liveUrl?: string
  githubUrl?: string
  stats?: {
    stars?: number
    downloads?: string
    version?: string
  }
}
