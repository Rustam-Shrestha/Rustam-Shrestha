import { useState, type ReactNode } from 'react'
import { Button, type ButtonVariant, type ButtonSize } from '@/components/Button'
import { Copy, Check } from '@/assets/icons'
import { cn } from '@/utils'

export interface CopyButtonProps {
  text: string
  label?: ReactNode
  copiedLabel?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
  showText?: boolean
  onCopy?: () => void
  title?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  size = 'sm',
  variant = 'outline',
  className = '',
  showText = true,
  onCopy,
  title = 'Copy to clipboard',
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const tooltipTitle = typeof (copied ? copiedLabel : title) === 'string'
    ? (copied ? (copiedLabel as string) : title)
    : title

  return (
    <Button
      type="button"
      size={size}
      variant={copied ? 'secondary' : variant}
      onClick={handleCopy}
      title={tooltipTitle}
      className={cn(
        'font-mono text-xs transition-all duration-200 shrink-0 cursor-pointer',
        copied && 'text-[#166534] border-[#166534]/30 bg-[#F0FDF4]',
        className
      )}
      leftIcon={
        copied ? (
          <Check className="size-3.5 text-[#166534] animate-in zoom-in-50" />
        ) : (
          <Copy className="size-3.5 text-current" />
        )
      }
    >
      {showText && (copied ? copiedLabel : label)}
    </Button>
  )
}

export default CopyButton

