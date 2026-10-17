import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Automatically scrolls to top on route change, and exposes a manual scrollToTop trigger.
 */
export function useScrollToTop(autoScrollOnChange = true) {
  const location = useLocation()

  useEffect(() => {
    if (autoScrollOnChange) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [location.pathname, autoScrollOnChange])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return { scrollToTop }
}

export default useScrollToTop
