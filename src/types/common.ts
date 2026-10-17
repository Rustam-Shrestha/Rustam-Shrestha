import type { ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
  badge?: string
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'website' | 'youtube' | string
  label: string
  url: string
  icon?: ReactNode
}

export interface SectionMeta {
  id: string
  title: string
  subtitle?: string
  description?: string
}
