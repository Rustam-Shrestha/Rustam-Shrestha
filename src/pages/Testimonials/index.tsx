import React, { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Tabs } from '@/components/Tabs'
import { Seo } from '@/components/Seo'
import { testimonialsData } from '@/data'
import { QuoteIcon, PhoneIcon, ShieldCheck, MailIcon, ArrowRight } from '@/assets/icons'
import { SITE_CONFIG } from '@/utils'

export const TestimonialsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(testimonialsData.map((t) => t.category)))
    return [
      { id: 'All', label: 'All Recommendations', count: testimonialsData.length },
      ...unique.map((cat) => ({
        id: cat,
        label: cat,
        count: testimonialsData.filter((t) => t.category === cat).length,
      })),
    ]
  }, [])

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'All') return testimonialsData
    return testimonialsData.filter((t) => t.category === activeCategory)
  }, [activeCategory])

  // JSON-LD Review & Endorsement Schema for Google Rich Snippets
  const testimonialSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: testimonialsData.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: `${item.prefix ? `${item.prefix} ` : ''}${item.name}`,
            jobTitle: item.role,
            worksFor: {
              '@type': 'Organization',
              name: item.organization,
            },
          },
          reviewBody: item.quote,
          itemReviewed: {
            '@type': 'Person',
            name: SITE_CONFIG.name,
            jobTitle: 'Full-Stack Developer (MERN Stack)',
          },
        },
      })),
    }
  }, [])

  return (
    <div className="w-full flex-1 py-16 sm:py-24">
      <Seo
        title="Testimonials & Professional Recommendations"
        description="Verified recommendations, academic mentorship endorsements, and enterprise feedback for Santosh (Rustam) Shrestha from university leadership, supervisors, and industry executives."
        url={`${SITE_CONFIG.url}/testimonials`}
        schema={testimonialSchema}
      />

      <Container size="xl">
        {/* Main Heading Section with Strict H1 / H2 Hierarchy */}
        <header className="mb-12">
          <SectionTitle
            number="06"
            badge="ENDORSEMENTS & REFERENCES"
            title="Professional testimonials &"
            highlight="verified recommendations"
            description="Direct endorsements from academic heads, engineering mentors, industry leadership, and system evaluators reflecting technical competency, discipline, and execution quality."
            className="mb-8"
          />

          {/* Category Filter Tabs - self contained horizontal scroll */}
          <div className="w-full max-w-full overflow-x-auto pb-1 scrollbar-none flex items-center">
            <Tabs
              tabs={categories}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </header>

        {/* Testimonials Grid with Semantic H3 Headings and Rich Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <Card
              key={item.id}
              hoverEffect
              className="p-6 sm:p-7 bg-white flex flex-col justify-between border border-[#E5E7EB] hover:border-[#166534]/50 transition-all duration-200"
            >
              <div>
                {/* Header Strip: Category Badge & Verified Stamp */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]/80">
                  <Badge variant="primary" size="sm" className="font-mono text-[11px]">
                    {item.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#166534] font-semibold">
                    <ShieldCheck className="size-3.5 text-[#166534]" />
                    Verified Reference
                  </span>
                </div>

                {/* Quote Block with SVG Quote Icon */}
                <div className="relative mt-5">
                  <QuoteIcon className="size-8 text-[#166534]/15 absolute -top-3 -left-1 pointer-events-none" />
                  <p className="text-sm sm:text-[15px] text-[#374151] leading-relaxed relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Author & Coordinates Block */}
              <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                <div className="flex items-start gap-3.5">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                    {item.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#111827] truncate">
                      {item.prefix ? `${item.prefix} ` : ''}{item.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#166534] mt-0.5 truncate">
                      {item.role}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-1">
                      {item.organization}
                    </p>
                  </div>
                </div>

                {/* Contact Verification Phone Link */}
                {item.phone && (
                  <div className="mt-4 pt-3 border-t border-dashed border-[#E5E7EB] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#9CA3AF] text-[11px] uppercase tracking-wider">
                      Direct Verification
                    </span>
                    <a
                      href={`tel:${item.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[#166534] hover:text-[#15803D] hover:underline font-medium transition-colors"
                      title={`Call ${item.name} to verify recommendation`}
                    >
                      <PhoneIcon className="size-3.5 text-[#166534]" />
                      <span>{item.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Reference Verification & Collaboration Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-[12px] bg-[#F5F7F6] border border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#111827]">
              Need formal reference checks or verification?
            </h2>
            <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
              All references listed above have supervised my university coursework, evaluated deployed software modules, or mentored my engineering tenure. Official recommendation letters and contact checks are readily accommodated.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a href="mailto:shrestharama65@gmail.com?subject=Reference%20Verification%20Inquiry">
              <Button variant="primary" size="lg" leftIcon={<MailIcon className="size-4" />}>
                Contact for Inquiries
              </Button>
            </a>
            <a href={SITE_CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="size-4" />}>
                View Resume
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TestimonialsPage
