import { forwardRef } from 'react'
import { cn } from '@/utils'

export interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  id?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, label, description, disabled = false, className = '', id }, ref) => {
    const switchId = id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

    return (
      <div className={cn('inline-flex items-center gap-3 select-none', className)}>
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onCheckedChange(!checked)}
          className={cn(
            'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2',
            checked ? 'bg-[#166534]' : 'bg-[#E5E7EB]',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <span
            className={cn(
              'pointer-events-none block size-4 rounded-full bg-white shadow-xs ring-0 transition-transform duration-200',
              checked ? 'translate-x-4.5' : 'translate-x-0.5'
            )}
          />
        </button>

        {(label || description) && (
          <label
            htmlFor={switchId}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={cn('cursor-pointer text-xs', disabled && 'cursor-not-allowed opacity-50')}
          >
            {label && <span className="font-medium text-[#111827] block">{label}</span>}
            {description && <span className="text-[#6B7280] block text-[11px]">{description}</span>}
          </label>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch

