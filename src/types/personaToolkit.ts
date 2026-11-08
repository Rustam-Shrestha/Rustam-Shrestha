export interface PersonaItem {
  id: number
  number: number
  slug: string
  title: string
  shortTitle: string
  niche: string
  subject: string
  category: string
  keywords: string[]
  prompt: string
  defaultTask: string
  part: number
}

export interface QuickRouterItem {
  need: string
  personaId: number
  personaTitle: string
}

export interface UsefulPairItem {
  pair: string
  label: string
  personaIds: number[]
}

export interface CombiningPersonas {
  title: string
  instructions: string
  combinationPrompt: string
  usefulPairs: UsefulPairItem[]
}

export interface UniversalHeader {
  title: string
  subtitle: string
  prompt: string
}

export interface PersonaToolkitData {
  metadata: {
    title: string
    description: string
    totalPersonas: number
    usage: string
    categories: string[]
  }
  universalHeader: UniversalHeader
  categories: string[]
  personas: PersonaItem[]
  quickRouter: QuickRouterItem[]
  combiningPersonas: CombiningPersonas
}

