import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUIStore } from '@/store'
import { NAV_ITEMS, SITE_CONFIG } from '@/utils'
import {
  X,
  HomeIcon,
  UserCircle,
  Briefcase,
  Sparkles,
  MessageSquare,
  MailIcon,
  Download,
} from '@/assets/icons'
import { Button } from '@/components/Button'
import { LanguageToggle } from '@/components/LanguageToggle'
import { cn } from '@/utils'

export interface SidebarProps {
  className?: string
}

const renderNavIcon = (iconKey?: string) => {
  switch (iconKey) {
    case 'home':
      return <HomeIcon className="size-5 shrink-0" />
    case 'about':
      return <UserCircle className="size-5 shrink-0" />
    case 'projects':
      return <Briefcase className="size-5 shrink-0" />
    case 'skills':
      return <Sparkles className="size-5 shrink-0" />
    case 'testimonials':
      return <MessageSquare className="size-5 shrink-0" />
    case 'contact':
      return <MailIcon className="size-5 shrink-0" />
    default:
      return <HomeIcon className="size-5 shrink-0" />
  }
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation()
  const { t } = useTranslation('common')
  const {
    sidebarExpanded,
    mobileSidebarOpen,
    closeMobileSidebar,
  } = useUIStore()

  return (
    <>
      {/* =================================================================== */}
      {/* 1. MOBILE BACKDROP OVERLAY (< lg) */}
      {/* =================================================================== */}
      {mobileSidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label={t('close', 'Close')}
          onClick={closeMobileSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') closeMobileSidebar()
          }}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity duration-200"
        />
      )}

      {/* =================================================================== */}
      {/* 2. MOBILE DRAWER SIDEBAR (< lg) */}
      {/* Slides out when hamburger is pressed; hidden completely otherwise */}
      {/* =================================================================== */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] flex flex-col transition-transform duration-300 ease-in-out lg:hidden shadow-2xl',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-[#E5E7EB]">
          <Link
            to="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#111827]"
          >
            <img
              src="./images/logo.png"
              alt="Logo"
              className="w-7 h-7 rounded-[6px] object-contain shrink-0"
              onError={(e) => {
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
            <span className="tracking-tight">{SITE_CONFIG.shortName}</span>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={closeMobileSidebar}
            className="p-1.5 h-8 w-8 text-[#6B7280]"
            title={t('close', 'Close')}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMobileSidebar}
                className={cn(
                  'flex items-center gap-3.5 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-[#DCFCE7] text-[#166534] font-semibold'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]'
                )}
              >
                <span className={isActive ? 'text-[#166534]' : 'text-[#6B7280]'}>
                  {renderNavIcon(item.icon)}
                </span>
                <span>{t(`nav.${item.key || item.label.toLowerCase()}`, item.label)}</span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Bottom Footer Section */}
        <div className="p-4 border-t border-[#E5E7EB] space-y-3 bg-[#F9FAFB]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6B7280]">{t('language', 'Language')}</span>
            <LanguageToggle />
          </div>
          <Button
            fullWidth
            variant="primary"
            size="sm"
            leftIcon={<Download className="size-3.5" />}
            onClick={() => {
              closeMobileSidebar()
              if (SITE_CONFIG.resumeUrl) {
                window.open(SITE_CONFIG.resumeUrl, '_blank')
              }
            }}
          >
            {t('actions.downloadCv', 'Download CV')}
          </Button>
        </div>
      </aside>

      {/* =================================================================== */}
      {/* 3. DESKTOP YOUTUBE-STYLE SIDEBAR (>= lg) */}
      {/* Under topbar: top-14 sm:top-16 bottom-0 */}
      {/* When expanded: w-60 (icons + labels). */}
      {/* When unexpanded: w-[72px] (icons only, labels beneath like YouTube). */}
      {/* On small screens: completely hidden for clean UI. */}
      {/* =================================================================== */}
      <aside
        className={cn(
          'hidden lg:flex fixed top-14 sm:top-16 left-0 bottom-0 z-30 bg-white border-r border-[#E5E7EB] flex-col transition-all duration-200 ease-in-out select-none',
          sidebarExpanded ? 'w-60' : 'w-[72px]',
          className
        )}
      >
        {/* Navigation Item List */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            const translatedLabel = t(`nav.${item.key || item.label.toLowerCase()}`, item.label)

            if (sidebarExpanded) {
              // EXPANDED MODE: Icon on left, label on right
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3.5 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-[#DCFCE7] text-[#166534] font-semibold'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]'
                  )}
                >
                  <span className={isActive ? 'text-[#166534]' : 'text-[#6B7280]'}>
                    {renderNavIcon(item.icon)}
                  </span>
                  <span className="truncate">{translatedLabel}</span>
                </Link>
              )
            }

            // UNEXPANDED / MINI YOUTUBE MODE: Centered Icon with small text label beneath
            return (
              <Link
                key={item.href}
                to={item.href}
                title={translatedLabel}
                className={cn(
                  'flex flex-col items-center justify-center py-2.5 px-1 rounded-[8px] transition-colors duration-150 group',
                  isActive
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]'
                )}
              >
                <span className={cn('transition-transform duration-150 group-hover:scale-105', isActive ? 'text-[#166534]' : 'text-[#6B7280]')}>
                  {renderNavIcon(item.icon)}
                </span>
                <span className={cn('text-[10px] mt-1 text-center font-medium leading-tight max-w-[64px] truncate', isActive ? 'text-[#166534] font-semibold' : 'text-[#4B5563]')}>
                  {translatedLabel}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Sidebar Footer */}
        {sidebarExpanded ? (
          <div className="p-3 border-t border-[#E5E7EB] bg-[#F9FAFB] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#6B7280]">{t('language', 'Language')}</span>
              <LanguageToggle variant="switch" />
            </div>
            <Button
              fullWidth
              variant="outline"
              size="sm"
              leftIcon={<Download className="size-3.5" />}
              onClick={() => {
                if (SITE_CONFIG.resumeUrl) {
                  window.open(SITE_CONFIG.resumeUrl, '_blank')
                }
              }}
              className="text-xs font-medium bg-white"
            >
              {t('actions.resume', 'Resume')}
            </Button>
          </div>
        ) : (
          <div className="p-2 border-t border-[#E5E7EB] flex flex-col items-center gap-2 bg-[#F9FAFB]">
            <LanguageToggle variant="compact" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (SITE_CONFIG.resumeUrl) {
                  window.open(SITE_CONFIG.resumeUrl, '_blank')
                }
              }}
              title={t('actions.resume', 'Resume')}
              className="p-2 h-8 w-8 text-[#4B5563] hover:text-[#166534]"
            >
              <Download className="size-4" />
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
