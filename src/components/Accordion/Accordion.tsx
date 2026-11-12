import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react'
import { ChevronDown } from '@/assets/icons'
import { cn } from '@/utils'

// ============================================================================
// CONTEXT
// ============================================================================

interface AccordionContextType {
  openItems: Set<string | number>
  toggleItem: (id: string | number) => void
  isItemOpen: (id: string | number) => boolean
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion subcomponents must be used within an <Accordion>')
  }
  return context
}

// ============================================================================
// ACCORDION ROOT
// ============================================================================

export interface AccordionProps {
  children: ReactNode
  openItems?: (string | number)[]
  onOpenItemsChange?: (openItems: (string | number)[]) => void
  defaultOpenItems?: (string | number)[]
  allowMultiple?: boolean
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  openItems: controlledOpenItems,
  onOpenItemsChange,
  defaultOpenItems = [],
  allowMultiple = true,
  className = '',
}) => {
  const [internalOpenItems, setInternalOpenItems] = useState<Set<string | number>>(
    () => new Set(defaultOpenItems)
  )

  const isControlled = controlledOpenItems !== undefined
  const currentOpenItems = isControlled
    ? new Set(controlledOpenItems)
    : internalOpenItems

  const toggleItem = (id: string | number) => {
    const nextSet = new Set(currentOpenItems)
    if (nextSet.has(id)) {
      nextSet.delete(id)
    } else {
      if (!allowMultiple) {
        nextSet.clear()
      }
      nextSet.add(id)
    }

    if (!isControlled) {
      setInternalOpenItems(nextSet)
    }
    onOpenItemsChange?.(Array.from(nextSet))
  }

  const isItemOpen = (id: string | number) => currentOpenItems.has(id)

  return (
    <AccordionContext.Provider
      value={{
        openItems: currentOpenItems,
        toggleItem,
        isItemOpen,
      }}
    >
      <div className={cn('space-y-3', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

// ============================================================================
// ACCORDION ITEM
// ============================================================================

interface AccordionItemContextType {
  id: string | number
  isOpen: boolean
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null)

export const useAccordionItem = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be within an <AccordionItem>')
  }
  return context
}

export interface AccordionItemProps {
  id: string | number
  children: ReactNode
  className?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className = '',
}) => {
  const { isItemOpen } = useAccordion()
  const isOpen = isItemOpen(id)

  return (
    <AccordionItemContext.Provider value={{ id, isOpen }}>
      <div
        className={cn(
          'rounded-[10px] border border-[#E5E7EB] bg-white transition-all duration-200 overflow-hidden shadow-2xs',
          isOpen && 'border-[#CBD5E1] shadow-xs ring-1 ring-black/5',
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

// ============================================================================
// ACCORDION TRIGGER (HEADER)
// ============================================================================

export interface AccordionTriggerProps {
  children: ReactNode
  actions?: ReactNode
  className?: string
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  actions,
  className = '',
}) => {
  const { toggleItem } = useAccordion()
  const { id, isOpen } = useAccordionItem()

  const handleHeaderClick = () => {
    toggleItem(id)
  }

  const handleActionsClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleHeaderClick}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleItem(id)
        }
      }}
      className={cn(
        'w-full p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left cursor-pointer select-none transition-colors duration-150',
        isOpen ? 'bg-[#F8FAFC]' : 'hover:bg-[#F9FAFB]',
        className
      )}
    >
      {/* Top Header Row on mobile / Left info on desktop */}
      <div className="flex items-start justify-between gap-3 w-full md:w-auto md:flex-1 md:min-w-0">
        <div className="flex-1 min-w-0 pr-1 md:pr-2">{children}</div>

        {/* Mobile-only Chevron Indicator (Top-Right, aligned with header title) */}
        <div
          className={cn(
            'md:hidden flex size-8 shrink-0 items-center justify-center rounded-full text-[#64748B] transition-transform duration-200 mt-0.5',
            isOpen ? 'rotate-180 text-[#166534] bg-[#DCFCE7]' : 'bg-[#F1F5F9]/80'
          )}
          aria-hidden="true"
        >
          <ChevronDown className="size-4" />
        </div>
      </div>

      {/* Actions and Desktop Chevron */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-row items-stretch sm:items-center md:items-center justify-between md:justify-end gap-2.5 shrink-0 pt-2.5 md:pt-0 border-t border-[#F1F5F9] md:border-t-0">
        {actions && (
          <div
            onClick={handleActionsClick}
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto justify-end"
          >
            {actions}
          </div>
        )}

        {/* Desktop-only Chevron */}
        <div
          className={cn(
            'hidden md:flex size-8 items-center justify-center rounded-full text-[#64748B] transition-transform duration-200 shrink-0',
            isOpen ? 'rotate-180 text-[#166534] bg-[#DCFCE7]' : 'hover:bg-[#F1F5F9]'
          )}
          aria-hidden="true"
        >
          <ChevronDown className="size-4" />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// ACCORDION CONTENT (COLLAPSIBLE BODY)
// ============================================================================

export interface AccordionContentProps {
  children: ReactNode
  className?: string
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = '',
}) => {
  const { isOpen } = useAccordionItem()

  if (!isOpen) return null

  return (
    <div
      role="region"
      className={cn(
        'p-4 sm:p-6 border-t border-[#E5E7EB] bg-white animate-in fade-in-50 duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Accordion

