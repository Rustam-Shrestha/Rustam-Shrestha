export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar'

export type SkillCategoryName =
  | 'Frontend'
  | 'Backend & Database'
  | 'DevOps & Cloud'
  | 'Tools & Architecture'
  | 'Core Competencies'

export interface Skill {
  name: string
  category: SkillCategoryName
  level?: SkillLevel
  proficiencyPercentage?: number
  iconName?: string
  color?: string
  description?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  location?: string
  type?: 'Full-time' | 'Contract' | 'Part-time' | 'Freelance'
  startDate: string
  endDate: string | 'Present'
  description: string
  highlights: string[]
  technologies: string[]
}
