import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useUIStore } from '@/store'
import { SITE_CONFIG } from '@/utils'
import { Menu, Download } from '@/assets/icons'
import { cn } from '@/utils'

export interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const { t } = useTranslation('common')
  const { toggleSidebar, toggleMobileSidebar } = useUIStore()

  const handleHamburgerClick = () => {
    // If desktop (window width >= 1024), toggle expanded/unexpanded
    // If mobile (< 1024), toggle slide-over drawer
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      toggleSidebar()
    } else {
      toggleMobileSidebar()
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full h-14 sm:h-16 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md transition-colors',
        className
      )}
    >
      <div className="w-full h-full px-3 sm:px-4 lg:px-6 flex items-center justify-between">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleHamburgerClick}
            aria-label="Toggle navigation sidebar"
            className="p-2 h-9 w-9 text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-full shrink-0"
          >
            <Menu className="size-5" />
          </Button>

          <Link
            to="/"
            className="flex items-center gap-2.5 font-heading font-extrabold text-base sm:text-lg text-[#111827] group"
          >
            <img
              src="./images/logo.png"
              alt="Santosh Shrestha Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] object-contain shrink-0"
              onError={(e) => {
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
            <span className="tracking-tight group-hover:text-[#166534] transition-colors truncate hidden xs:inline">
              {SITE_CONFIG.name}
            </span>
            <span className="tracking-tight group-hover:text-[#166534] transition-colors truncate xs:hidden">
              {SITE_CONFIG.shortName}
            </span>
          </Link>
        </div>

        {/* Right: Language Switcher & Resume */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Devanagari / English Language Switcher */}
          <LanguageToggle variant="switch" />

          {/* Download Resume / CV */}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="size-3.5" />}
            onClick={() => {
              if (SITE_CONFIG.resumeUrl) {
                window.open(SITE_CONFIG.resumeUrl, '_blank')
              }
            }}
            className="hidden sm:inline-flex text-xs font-medium"
          >
            {t('actions.resume', 'Resume')}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
