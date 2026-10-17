export type TestimonialCategory =
  | 'Academic Mentorship'
  | 'Industry Leadership'
  | 'System & Technical Evaluation'
  | 'Internship & Supervision'
  | string

export interface Testimonial {
  id: string
  name: string
  prefix?: string
  role: string
  organization: string
  phone?: string
  quote: string
  category: TestimonialCategory
  relationship: string
  initials: string
  featured?: boolean
}
