import type { NavItem, SocialLink } from '@/types'
import { getAssetUrl } from './routing'

export const SITE_CONFIG = {
  name: 'Santosh (Rustam) Shrestha',
  shortName: 'Rustam Shrestha',
  title: 'Santosh (Rustam) Shrestha | Full-Stack Developer (MERN Stack)',
  description:
    'Full-Stack Developer (MERN Stack) working in industry, specializing in responsive React frontends, Node.js APIs, and applied machine learning exploration.',
  author: 'Santosh (Rustam) Shrestha',
  url: 'https://santoshshrestha4.com.np',
  email: 'shrestharama65@gmail.com',
  phone: '(+977) 9861473522',
  resumeUrl: getAssetUrl('Santosh_Shrestha_CV.pdf'),
  avatar: getAssetUrl('images/profile.webp'),
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/Rustam-Shrestha',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/santoshshrestha4',
  },
  {
    platform: 'twitter',
    label: 'Twitter / X',
    url: 'https://x.com/44rustam',
  },
  {
    platform: 'linktree',
    label: 'Linktree',
    url: 'https://linktr.ee/santoshshrestha?utm_source=linktree_profile_share&ltsid=1bb96c52-cb1a-48bd-92d7-43840032d3d4',
  },
  {
    platform: 'email',
    label: 'Email',
    url: 'mailto:shrestharama65@gmail.com',
  },
  {
    platform: 'website',
    label: 'Website',
    url: 'https://santoshshrestha4.com.np',
  },
]
