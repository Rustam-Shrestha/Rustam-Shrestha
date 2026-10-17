import { useSyncExternalStore, useCallback } from 'react'

/**
 * Hook to evaluate responsive CSS media query using useSyncExternalStore (React 19)
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === 'undefined') return () => {}
      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener('change', callback)
      return () => mediaQueryList.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useMediaQuery
