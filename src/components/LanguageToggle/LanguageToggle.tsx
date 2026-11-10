import { useTranslation } from 'react-i18next'
import { GlobeIcon } from '@/assets/icons'
import { cn } from '@/utils'

export interface LanguageToggleProps {
  className?: string
  variant?: 'pill' | 'switch' | 'compact'
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  variant = 'switch',
}) => {
  const { i18n } = useTranslation()
  const isNepali = i18n.language?.startsWith('ne')

  const toggleLanguage = () => {
    const nextLang = isNepali ? 'en' : 'ne'
    i18n.changeLanguage(nextLang)
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-[6px] text-xs font-medium border border-[#E5E7EB] bg-white text-[#374151] hover:text-[#166534] hover:border-[#166534] transition-colors cursor-pointer',
          className
        )}
        title={isNepali ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}
      >
        <GlobeIcon className="size-3.5 text-[#166534]" />
        <span className="font-mono">{isNepali ? 'नेपाली' : 'EN'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isNepali}
      onClick={toggleLanguage}
      title={isNepali ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}
      className={cn(
        'relative inline-flex items-center gap-1.5 p-1 rounded-full border border-[#E5E7EB] bg-[#F5F7F6] text-xs font-medium transition-all duration-200 select-none cursor-pointer hover:border-[#CBD5E1]',
        className
      )}
    >
      {/* English label */}
      <span
        className={cn(
          'px-2.5 py-0.5 rounded-full text-xs transition-all duration-200 font-mono',
          !isNepali
            ? 'bg-white text-[#166534] font-bold shadow-xs'
            : 'text-[#6B7280] hover:text-[#111827]'
        )}
      >
        EN
      </span>

      {/* Nepali Devanagari label */}
      <span
        className={cn(
          'px-2.5 py-0.5 rounded-full text-xs transition-all duration-200 font-semibold',
          isNepali
            ? 'bg-[#166534] text-white shadow-xs'
            : 'text-[#6B7280] hover:text-[#111827]'
        )}
      >
        नेपाली
      </span>
    </button>
  )
}

export default LanguageToggle

