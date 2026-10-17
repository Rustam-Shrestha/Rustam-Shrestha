import {
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { RouteErrorBoundary } from './RouteErrorBoundary'
import { getRouterBasename } from '@/utils'
import HomePage from '@/pages/Home'
import AboutPage from '@/pages/About'
import ProjectsPage from '@/pages/Projects'
import SkillsPage from '@/pages/Skills'
import TestimonialsPage from '@/pages/Testimonials'
import ContactPage from '@/pages/Contact'
import NotFoundPage from '@/pages/NotFound'

/**
 * Route definitions for the portfolio with error boundaries.
 */
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'skills',
        element: <SkillsPage />,
      },
      {
        path: 'testimonials',
        element: <TestimonialsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

/**
 * Resilient Router Selection:
 * 1. Primary: createBrowserRouter for clean, canonical, SEO-friendly HTML5 history URLs.
 * 2. Automated Fallback: If createBrowserRouter throws (e.g., file:// protocol, restricted sandboxes,
 *    unsupported legacy browser, or VITE_ROUTER_MODE=hash), smoothly falls back to createHashRouter.
 */
function createResilientRouter() {
  const forceHash = import.meta.env.VITE_ROUTER_MODE === 'hash'
  const isBrowserEnv = typeof window !== 'undefined'

  if (forceHash || !isBrowserEnv) {
    return createHashRouter(routes)
  }

  try {
    // Verify window.history availability
    if (!window.history || !window.history.pushState) {
      console.warn('[Router] History API not supported, falling back to hash router.')
      return createHashRouter(routes)
    }

    const basename = getRouterBasename()
    return createBrowserRouter(routes, {
      basename,
    })
  } catch (error) {
    console.warn('[Router] Failed to initialize browser router, falling back to hash router:', error)
    return createHashRouter(routes)
  }
}

export const router = createResilientRouter()

export default router
