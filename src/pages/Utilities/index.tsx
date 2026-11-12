import { useState, useMemo, useRef } from 'react'
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Tabs,
  TextareaField,
  SearchInput,
  Select,
  Switch,
  CopyButton,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Seo,
} from '@/components'
import { personaToolkitData } from '@/data'
import type { PersonaItem, UsefulPairItem } from '@/types'
import {
  RotateCcw,
  Sparkles,
  ChevronDown,
  CodeIcon,
} from '@/assets/icons'
import { cn } from '@/utils'

export const UtilitiesPage: React.FC = () => {
  const { universalHeader, categories, personas, quickRouter, combiningPersonas } =
    personaToolkitData

  // State
  const [activeTab, setActiveTab] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [prependHeader, setPrependHeader] = useState<boolean>(true)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState<boolean>(false)
  const [activePersonaJump, setActivePersonaJump] = useState<string>('')

  // Accordion open items state (controlled)
  const [openAccordionIds, setOpenAccordionIds] = useState<(string | number)[]>([])

  // User edited state (persists during page session)
  const [editedUniversalHeader, setEditedUniversalHeader] = useState<string>(universalHeader.prompt)
  const [editedPrompts, setEditedPrompts] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {}
    personas.forEach((p) => {
      initial[p.id] = p.prompt
    })
    return initial
  })

  // User custom tasks per persona
  const [customTasks, setCustomTasks] = useState<Record<number, string>>({})

  // References for scrolling
  const personaRefs = useRef<Record<number, HTMLDivElement | null>>({})

  // Format tab items
  const tabItems = useMemo(() => {
    const items = [
      { id: 'all', label: 'All Personas', count: personas.length },
      ...categories.map((cat) => ({
        id: cat,
        label: cat,
        count: personas.filter((p) => p.category === cat).length,
      })),
      { id: 'router', label: 'Quick Router', count: quickRouter.length },
      { id: 'combining', label: 'Combining Pairs', count: combiningPersonas.usefulPairs.length },
    ]
    return items
  }, [categories, personas, quickRouter, combiningPersonas])

  // Select options for jumping to any persona
  const selectOptions = useMemo(() => {
    return [
      { value: '', label: 'Jump to specific persona...' },
      ...personas.map((p) => ({
        value: String(p.id),
        label: `#${p.number.toString().padStart(2, '0')} - ${p.shortTitle}`,
        description: p.niche,
      })),
    ]
  }, [personas])

  // Filtered personas
  const filteredPersonas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return personas.filter((persona) => {
      // Category match
      if (activeTab !== 'all' && activeTab !== 'router' && activeTab !== 'combining') {
        if (persona.category !== activeTab) return false
      }

      // Search match
      if (!query) return true

      const titleMatch = persona.title.toLowerCase().includes(query)
      const shortTitleMatch = persona.shortTitle.toLowerCase().includes(query)
      const nicheMatch = persona.niche.toLowerCase().includes(query)
      const subjectMatch = persona.subject.toLowerCase().includes(query)
      const keywordMatch = persona.keywords.some((kw) => kw.toLowerCase().includes(query))
      const promptMatch = (editedPrompts[persona.id] || persona.prompt)
        .toLowerCase()
        .includes(query)

      return titleMatch || shortTitleMatch || nicheMatch || subjectMatch || keywordMatch || promptMatch
    })
  }, [personas, activeTab, searchQuery, editedPrompts])

  // Scroll to a specific persona card and expand it
  const scrollToPersona = (id: number) => {
    // Ensure the targeted persona accordion is opened
    setOpenAccordionIds((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id]
      }
      return prev
    })

    const el = personaRefs.current[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.classList.add('ring-2', 'ring-[#166534]', 'ring-offset-2')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#166534]', 'ring-offset-2')
      }, 1500)
    }
  }

  // Handle jump selection
  const handleJumpSelect = (val: string) => {
    setActivePersonaJump(val)
    if (!val) return
    const id = parseInt(val, 10)
    if (activeTab === 'router' || activeTab === 'combining') {
      setActiveTab('all')
    }
    setTimeout(() => scrollToPersona(id), 100)
  }

  // Expand all filtered personas
  const handleExpandAll = () => {
    const allIds = filteredPersonas.map((p) => p.id)
    setOpenAccordionIds(allIds)
  }

  // Collapse all personas
  const handleCollapseAll = () => {
    setOpenAccordionIds([])
  }

  // Reset a specific prompt to factory default
  const handleResetPrompt = (id: number) => {
    const original = personas.find((p) => p.id === id)
    if (original) {
      setEditedPrompts((prev) => ({ ...prev, [id]: original.prompt }))
    }
  }

  // Build complete prompt with Universal Header and optional Custom Task
  const getFullCompiledPrompt = (persona: PersonaItem): string => {
    const promptText = editedPrompts[persona.id] ?? persona.prompt
    const customTask = customTasks[persona.id]?.trim()

    let assembled = ''

    if (prependHeader) {
      assembled += `${editedUniversalHeader.trim()}\n\n---\n\n`
    }

    assembled += promptText.trim()

    if (customTask) {
      assembled += `\n\nMY SPECIFIC TASK / CONTEXT:\n${customTask}`
    }

    return assembled
  }

  // Build combined prompt for pair
  const getCombinedPrompt = (pair: UsefulPairItem): string => {
    const personaA = personas.find((p) => p.id === pair.personaIds[0])
    const personaB = personas.find((p) => p.id === pair.personaIds[1])

    if (!personaA || !personaB) return ''

    const pAText = editedPrompts[personaA.id] ?? personaA.prompt
    const pBText = editedPrompts[personaB.id] ?? personaB.prompt

    return `${editedUniversalHeader.trim()}

---

## PRIMARY PERSONA: ${personaA.title}
${pAText.trim()}

---

## AUDITING PERSONA: ${personaB.title}
${pBText.trim()}

---

## COMBINATION AUDIT DIRECTIVE:
${combiningPersonas.combinationPrompt.trim()}

---

MY TASK:
[paste task here]`
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <Seo
        title="Utilities & Persona Powerhouse Toolkit | Developer Resources"
        description="24 production-grade veteran personas with anti-generic operating rules, interactive accordion prompt editors, quick router, and section-wise instant copy."
      />

      <Container size="xl" className="space-y-8">
        {/* Top Header Card */}
        <Card variant="surface" className="p-6 sm:p-8 bg-white border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <Badge variant="primary" size="sm" icon={<CodeIcon className="size-3" />}>
                  ENGINEERING UTILITY
                </Badge>
                <Badge variant="secondary" size="sm">
                  {personas.length} PROMPT POWERHOUSES
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111827] tracking-tight">
                Persona Toolkit & Powerhouse Prompt Engine
              </h1>
              <p className="text-sm text-[#4B5563] max-w-2xl leading-relaxed">
                24 veteran niche personas engineered for high-stakes problem solving, deep domain execution,
                and zero-fluff output. Modular accordion cards with one-click copy, in-place prompt editing,
                and instant multi-agent combinations.
              </p>
            </div>

            {/* Quick Switch & Reset Toolbar */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-4 bg-[#F8FAFC] p-3.5 rounded-[8px] border border-[#E2E8F0]">
              <Switch
                checked={prependHeader}
                onCheckedChange={setPrependHeader}
                label="Auto-Prepend Universal Header"
                description="Include global anti-generic operating rules"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditedUniversalHeader(universalHeader.prompt)
                  const resetMap: Record<number, string> = {}
                  personas.forEach((p) => {
                    resetMap[p.id] = p.prompt
                  })
                  setEditedPrompts(resetMap)
                  setCustomTasks({})
                }}
                className="text-xs text-[#6B7280] hover:text-[#DC2626] font-mono h-8"
                leftIcon={<RotateCcw className="size-3.5" />}
              >
                Reset All Edits
              </Button>
            </div>
          </div>

          {/* Quick Universal Header Accordion Box */}
          <div className="mt-6 rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] overflow-hidden">
            <div
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className="p-4 cursor-pointer hover:bg-[#F3F4F6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start sm:items-center justify-between sm:justify-start gap-3 w-full sm:w-auto flex-1 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#166534] text-white text-xs font-mono font-bold">
                    UH
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-[#111827] flex flex-wrap items-center gap-2">
                      <span>{universalHeader.title}</span>
                      <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[10px]">
                        Non-Negotiable Operating Rules
                      </Badge>
                    </h2>
                    <p className="text-xs text-[#6B7280] truncate sm:whitespace-normal">
                      {universalHeader.subtitle}
                    </p>
                  </div>
                </div>

                {/* Mobile Chevron Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="sm:hidden p-1 h-7 w-7 text-[#6B7280] shrink-0"
                  title={isHeaderExpanded ? 'Collapse' : 'Expand'}
                >
                  <ChevronDown
                    className={cn(
                      'size-4 transition-transform duration-200',
                      isHeaderExpanded && 'rotate-180 text-[#166534]'
                    )}
                  />
                </Button>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-end sm:justify-start gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t border-[#E5E7EB]/70 sm:border-t-0 shrink-0"
              >
                <CopyButton
                  text={editedUniversalHeader}
                  label="Copy Universal Header"
                  copiedLabel="Header Copied!"
                  size="sm"
                  variant="outline"
                  className="bg-white flex-1 sm:flex-none justify-center"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                  className="hidden sm:inline-flex p-1 h-7 w-7 text-[#6B7280] shrink-0"
                  title={isHeaderExpanded ? 'Collapse' : 'Expand'}
                >
                  <ChevronDown
                    className={cn(
                      'size-4 transition-transform duration-200',
                      isHeaderExpanded && 'rotate-180 text-[#166534]'
                    )}
                  />
                </Button>
              </div>
            </div>

            {isHeaderExpanded && (
              <div className="p-4 pt-0 border-t border-[#E5E7EB] bg-white space-y-3">
                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs font-mono text-[#6B7280]">
                    Editable Universal Header Template (Affects all exports):
                  </span>
                  {editedUniversalHeader !== universalHeader.prompt && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditedUniversalHeader(universalHeader.prompt)}
                      className="text-xs text-[#166534] h-6 px-2"
                      leftIcon={<RotateCcw className="size-3" />}
                    >
                      Restore Default Header
                    </Button>
                  )}
                </div>
                <TextareaField
                  value={editedUniversalHeader}
                  onChange={(e) => setEditedUniversalHeader(e.target.value)}
                  rows={8}
                  className="font-mono text-xs leading-relaxed bg-[#F8FAFC]"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Filter Bar, Tabs & Quick Jump Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Topicwise Tabs with concise PC custom scrollbar */}
            <div className="overflow-x-auto pb-2 pt-0.5 -mx-2 px-2 custom-tabs-scroll">
              <Tabs
                tabs={tabItems}
                activeTab={activeTab}
                onChange={(id) => {
                  setActiveTab(id)
                }}
              />
            </div>

            {/* Quick Persona Jump Select */}
            <div className="w-full lg:w-72 shrink-0">
              <Select
                options={selectOptions}
                value={activePersonaJump}
                onChange={handleJumpSelect}
                placeholder="Jump to Persona..."
              />
            </div>
          </div>

          {/* Search Filter Bar & Accordion View Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-[8px] border border-[#E5E7EB]">
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
                placeholder="Search by persona name, keywords, niche, or prompt text..."
              />
            </div>

            {/* Accordion Expand / Collapse All Controls */}
            {activeTab !== 'router' && activeTab !== 'combining' && (
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleExpandAll}
                  className="text-xs font-mono h-9 px-2.5"
                  title="Expand all persona accordions"
                >
                  Expand All
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCollapseAll}
                  className="text-xs font-mono h-9 px-2.5 text-[#6B7280] hover:text-[#111827]"
                  title="Collapse all persona accordions"
                >
                  Collapse All
                </Button>
              </div>
            )}

            {/* Current Status Badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B7280] px-1 shrink-0">
              <span>Showing:</span>
              <Badge variant="secondary" size="sm">
                {activeTab === 'router'
                  ? `${quickRouter.length} routing paths`
                  : activeTab === 'combining'
                  ? `${combiningPersonas.usefulPairs.length} pairing recipes`
                  : `${filteredPersonas.length} of ${personas.length} personas`}
              </Badge>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: QUICK ROUTER TAB VIEW */}
        {/* ========================================================================= */}
        {activeTab === 'router' && (
          <Card variant="surface" className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl">Quick Router: Which Persona for What</CardTitle>
              <CardDescription>
                Direct indexing table mapping immediate operational needs to the highest-performing veteran persona.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto rounded-[8px] border border-[#E5E7EB]">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] font-mono text-xs uppercase text-[#4B5563]">
                      <th className="py-3 px-4 font-semibold">Immediate Need / Objective</th>
                      <th className="py-3 px-4 font-semibold">Recommended Persona</th>
                      <th className="py-3 px-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {quickRouter.map((route, idx) => {
                      const matched = personas.find((p) => p.id === route.personaId)
                      return (
                        <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3.5 px-4 font-medium text-[#111827]">
                            {route.need}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#E2E8F0] text-[#334155] font-semibold">
                                #{route.personaId.toString().padStart(2, '0')}
                              </span>
                              <span className="font-semibold text-[#166534]">
                                {matched ? matched.shortTitle : route.personaTitle}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {matched && (
                                <CopyButton
                                  text={getFullCompiledPrompt(matched)}
                                  label="Copy Prompt"
                                  size="sm"
                                  variant="outline"
                                />
                              )}
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                  setActiveTab('all')
                                  setTimeout(() => scrollToPersona(route.personaId), 100)
                                }}
                                className="text-xs font-mono"
                              >
                                View Persona →
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: COMBINING PERSONAS TAB VIEW */}
        {/* ========================================================================= */}
        {activeTab === 'combining' && (
          <div className="space-y-6">
            <Card variant="surface" className="p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl">{combiningPersonas.title}</CardTitle>
                <CardDescription>
                  {combiningPersonas.instructions}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] p-4">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
                    <span className="text-xs font-mono font-semibold text-[#475569]">
                      COMBINATION AUDIT RULE:
                    </span>
                    <CopyButton
                      text={combiningPersonas.combinationPrompt}
                      label="Copy Audit Rule"
                      size="sm"
                    />
                  </div>
                  <pre className="font-mono text-xs text-[#1E293B] whitespace-pre-wrap leading-relaxed">
                    {combiningPersonas.combinationPrompt}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {combiningPersonas.usefulPairs.map((pair, idx) => {
                const personaA = personas.find((p) => p.id === pair.personaIds[0])
                const personaB = personas.find((p) => p.id === pair.personaIds[1])

                return (
                  <Card key={idx} variant="surface" className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                        <span className="font-mono font-bold text-sm text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-[4px]">
                          PAIR: {pair.pair}
                        </span>
                        <Badge variant="outline" size="sm">
                          Multi-Agent
                        </Badge>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#111827] mt-3">
                        {pair.label}
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Primary: <strong>{personaA?.shortTitle}</strong> audits with{' '}
                        <strong>{personaB?.shortTitle}</strong>
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setActiveTab('all')
                          if (personaA) scrollToPersona(personaA.id)
                        }}
                        className="text-xs font-mono text-[#6B7280]"
                      >
                        Inspect #{pair.personaIds[0]}
                      </Button>

                      <CopyButton
                        text={getCombinedPrompt(pair)}
                        label="Copy Combined Prompt"
                        copiedLabel="Combined Copied!"
                        variant="primary"
                        size="sm"
                      />
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: MAIN PERSONA LIST AS VERSATILE ACCORDION */}
        {/* Clean, collapsible, uncluttered layout with quick-copy buttons on header */}
        {/* ========================================================================= */}
        {activeTab !== 'router' && activeTab !== 'combining' && (
          <div>
            {filteredPersonas.length === 0 ? (
              <Card variant="surface" className="p-12 text-center">
                <p className="text-sm text-[#6B7280]">
                  No personas matched your query &quot;{searchQuery}&quot;.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveTab('all')
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <Accordion
                openItems={openAccordionIds}
                onOpenItemsChange={setOpenAccordionIds}
                allowMultiple
                className="space-y-3"
              >
                {filteredPersonas.map((persona) => {
                  const currentPrompt = editedPrompts[persona.id] ?? persona.prompt
                  const isModified = currentPrompt !== persona.prompt
                  const fullExportText = getFullCompiledPrompt(persona)

                  return (
                    <div
                      key={persona.id}
                      ref={(el) => {
                        personaRefs.current[persona.id] = el
                      }}
                      className="scroll-mt-24 transition-all duration-300"
                    >
                      <AccordionItem id={persona.id}>
                        {/* Accordion Trigger (Header Row with Quick Actions) */}
                        <AccordionTrigger
                          actions={
                            <>
                              {isModified && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleResetPrompt(persona.id)
                                  }}
                                  className="text-xs text-[#6B7280] hover:text-[#DC2626] font-mono h-8 px-2 shrink-0"
                                  title="Reset prompt to original defaults"
                                  leftIcon={<RotateCcw className="size-3.5" />}
                                >
                                  Reset
                                </Button>
                              )}

                              {/* Direct Prompt-only Copy */}
                              <CopyButton
                                text={currentPrompt}
                                label="Copy Prompt"
                                copiedLabel="Prompt Copied!"
                                size="sm"
                                variant="outline"
                                className="bg-white flex-1 sm:flex-none justify-center text-xs"
                                title="Copy editable persona prompt only"
                              />

                              {/* Complete Full Prompt with Header & Task */}
                              <CopyButton
                                text={fullExportText}
                                label={
                                  <span>
                                    <span className="hidden sm:inline">
                                      {prependHeader ? 'Copy Complete (+Header)' : 'Copy Complete'}
                                    </span>
                                    <span className="inline sm:hidden">
                                      {prependHeader ? 'Copy (+Header)' : 'Copy All'}
                                    </span>
                                  </span>
                                }
                                copiedLabel="Complete Copied!"
                                size="sm"
                                variant="primary"
                                className="flex-1 sm:flex-none justify-center text-xs"
                                title="Copy prompt with Universal Header & your specific task"
                              />
                            </>
                          }
                        >
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="primary"
                                size="sm"
                                className="font-mono font-bold tracking-wider"
                              >
                                #{persona.number.toString().padStart(2, '0')}
                              </Badge>
                              <Badge variant="secondary" size="sm">
                                {persona.category}
                              </Badge>
                              <span className="text-xs font-mono text-[#64748B]">
                                {persona.niche}
                              </span>
                              {isModified && (
                                <Badge variant="warning" size="sm" dot>
                                  Modified
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-base sm:text-lg font-bold font-heading text-[#0F172A] leading-snug">
                              {persona.title}
                            </h3>

                            {/* Brief subject summary line visible even when collapsed */}
                            <p className="text-xs text-[#64748B] line-clamp-1 max-w-3xl">
                              {persona.subject}
                            </p>
                          </div>
                        </AccordionTrigger>

                        {/* Accordion Content (Expanded Details & In-Place Form) */}
                        <AccordionContent className="space-y-4">
                          {/* Target Operational Domain Detail */}
                          <div className="p-3.5 rounded-[6px] bg-[#F1F5F9]/60 border border-[#E2E8F0] space-y-1">
                            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#475569] block">
                              Target Operational Domain:
                            </span>
                            <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed font-medium">
                              {persona.subject}
                            </p>
                          </div>

                          {/* Keywords Tag Cloud */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#64748B] block">
                              Trigger Keywords:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {persona.keywords.map((kw, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0]"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Prefilled & Editable Form Area */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#374151] flex items-center gap-1.5">
                                <Sparkles className="size-3.5 text-[#166534]" />
                                Prefilled Prompt Editor (Fully Editable in Form):
                              </span>
                              <span className="text-[11px] font-mono text-[#94A3B8]">
                                {currentPrompt.length} chars · {currentPrompt.split('\n').length} lines
                              </span>
                            </div>

                            <TextareaField
                              value={currentPrompt}
                              onChange={(e) =>
                                setEditedPrompts((prev) => ({
                                  ...prev,
                                  [persona.id]: e.target.value,
                                }))
                              }
                              rows={10}
                              className="font-mono text-xs leading-relaxed bg-[#FFFFFF] border-[#CBD5E1]"
                            />
                          </div>

                          {/* Optional Custom Task / Situation Quick-Fill */}
                          <div className="p-3.5 rounded-[6px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-semibold text-[#334155]">
                                Custom Task Input (Appended to Copy Complete):
                              </span>
                              <span className="text-[11px] text-[#64748B]">
                                Optional: specify your scenario directly
                              </span>
                            </div>
                            <TextareaField
                              value={customTasks[persona.id] ?? ''}
                              onChange={(e) =>
                                setCustomTasks((prev) => ({
                                  ...prev,
                                  [persona.id]: e.target.value,
                                }))
                              }
                              placeholder={persona.defaultTask || 'Type or paste your exact scenario/task here...'}
                              rows={2}
                              className="font-mono text-xs bg-white"
                            />
                          </div>

                          {/* Quick Bottom Action Bar for Easy Mobile & In-Place Copy */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-[#E2E8F0]/80">
                            <span className="text-[11px] font-mono text-[#64748B]">
                              Ready to use:
                            </span>
                            <div className="flex items-center gap-2">
                              <CopyButton
                                text={currentPrompt}
                                label="Copy Prompt"
                                copiedLabel="Prompt Copied!"
                                size="sm"
                                variant="outline"
                                className="bg-white flex-1 sm:flex-none justify-center text-xs"
                                title="Copy editable persona prompt only"
                              />
                              <CopyButton
                                text={fullExportText}
                                label={
                                  <span>
                                    <span className="hidden sm:inline">
                                      {prependHeader ? 'Copy Complete (+Header)' : 'Copy Complete'}
                                    </span>
                                    <span className="inline sm:hidden">
                                      {prependHeader ? 'Copy (+Header)' : 'Copy All'}
                                    </span>
                                  </span>
                                }
                                copiedLabel="Complete Copied!"
                                size="sm"
                                variant="primary"
                                className="flex-1 sm:flex-none justify-center text-xs"
                                title="Copy prompt with Universal Header & your specific task"
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  )
                })}
              </Accordion>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default UtilitiesPage
