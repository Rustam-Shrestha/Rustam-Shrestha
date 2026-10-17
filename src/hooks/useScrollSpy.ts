import { useState, useEffect } from 'react'

/**
 * Tracks the currently active section in the viewport based on section IDs.
 */
export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section) {
          const top = section.offsetTop
          if (scrollPosition >= top) {
            setActiveId(sectionIds[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}

export default useScrollSpy
