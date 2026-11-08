import { forwardRef } from 'react'
import { InputField, type InputFieldProps } from '@/components/Input'
import { SearchIcon, X } from '@/assets/icons'
import { Button } from '@/components/Button'

export interface SearchInputProps extends Omit<InputFieldProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void
  showClear?: boolean
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear, showClear = true, placeholder = 'Search...', className = '', ...props }, ref) => {
    const hasValue = Boolean(value && String(value).length > 0)

    return (
      <InputField
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        leftIcon={<SearchIcon styles="text-[#9CA3AF] size-4" />}
        rightIcon={
          hasValue && showClear ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="p-0.5 h-6 w-6 text-[#9CA3AF] hover:text-[#111827] pointer-events-auto"
              title="Clear search"
            >
              <X className="size-3.5" />
            </Button>
          ) : undefined
        }
        {...props}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput

