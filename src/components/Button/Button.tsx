import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
  children?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#166534] hover:bg-[#15803D] active:bg-[#14532D] text-white shadow-xs',
  secondary:
    'bg-white hover:bg-[#F5F7F6] active:bg-[#E5E7EB] text-[#111827] border border-[#E5E7EB] shadow-xs',
  outline:
    'bg-transparent hover:bg-[#F5F7F6] text-[#166534] border border-[#166534]',
  ghost:
    'bg-transparent hover:bg-[#F5F7F6] text-[#111827]',
  danger:
    'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-xs',
  subtle:
    'bg-[#DCFCE7] text-[#166534] hover:bg-[#BBF7D0]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[6px] font-medium',
  md: 'h-10 px-4 text-sm gap-2 rounded-[8px] font-semibold',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-[8px] font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      disabled = false,
      fullWidth = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]/30 focus-visible:ring-offset-1 active:scale-[0.99]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-60 cursor-not-allowed active:scale-100 pointer-events-none',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export const PrimaryButton = (props: ButtonProps) => <Button variant="primary" {...props} />
export const SecondaryButton = (props: ButtonProps) => <Button variant="secondary" {...props} />
export const OutlineButton = (props: ButtonProps) => <Button variant="outline" {...props} />
export const DangerButton = (props: ButtonProps) => <Button variant="danger" {...props} />

export default Button
