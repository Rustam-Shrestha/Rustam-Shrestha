/**
 * Utilities for dynamic, environment-aware routing and static asset resolution.
 * Supports:
 * - Custom Domains (e.g. https://santoshshrestha4.com.np)
 * - Free GitHub Pages project URLs (e.g. https://<user>.github.io/<repo>/)
 * - Standard cloud static hosts (Netlify, Vercel, Cloudflare Pages, Firebase)
 * - Local development and preview environments
 */

/**
 * Returns the correct base path for React Router based on runtime environment.
 * On GitHub Pages project sites (username.github.io/repo-name), it returns '/repo-name'.
 * On custom domains, user pages, or standard hosts, it returns '/'.
 */
export function getRouterBasename(): string {
  // If explicitly specified in Vite build via BASE_URL (and not relative './')
  const envBase = import.meta.env.BASE_URL
  if (envBase && envBase.startsWith('/') && envBase !== '/') {
    return envBase.replace(/\/+$/, '')
  }

  // At runtime in the browser, check if hosted on GitHub Pages project
  if (typeof window !== 'undefined') {
    const { hostname, pathname } = window.location
    if (hostname.endsWith('github.io')) {
      const segments = pathname.split('/').filter(Boolean)
      // If there's a repository segment that isn't the root user domain
      if (segments.length > 0 && !hostname.startsWith(segments[0] + '.')) {
        return `/${segments[0]}`
      }
    }
  }

  return '/'
}

/**
 * Resolves static public assets to their full root-safe path.
 * Guarantees that links like '/Santosh_Shrestha_CV.pdf' or '/cv.html' work properly
 * whether on custom domain (/) or GitHub Pages project (/<repo>/).
 */
export function getAssetUrl(path: string): string {
  if (!path) return ''
  // Return absolute HTTP(S) URLs as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return path
  }

  const cleanPath = path.replace(/^\.\//, '').replace(/^\//, '')
  const basename = getRouterBasename()

  if (basename === '/') {
    return `/${cleanPath}`
  }

  return `${basename}/${cleanPath}`
}
