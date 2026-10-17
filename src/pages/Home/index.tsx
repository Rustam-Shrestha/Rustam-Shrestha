import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '@/components/Hero'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { ProjectCard } from '@/components/ProjectCard'
import { Timeline } from '@/components/Timeline'
import { SkillCard } from '@/components/SkillCard'
import { Tabs } from '@/components/Tabs'
import { Gallery } from '@/components/Gallery'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { InputField, TextareaField } from '@/components/Input'
import { Seo } from '@/components/Seo'
import { PopMessage, SITE_CONFIG } from '@/utils'
import {
  ArrowRight,
  MailIcon,
  ExternalLinkIcon,
  CheckCircle2,
  QuoteIcon,
  PhoneIcon,
  ShieldCheck,
} from '@/assets/icons'
import {
  personalData,
  projectsData,
  experienceData,
  skillsData,
  certificationsData,
  testimonialsData,
} from '@/data'

export const HomePage: React.FC = () => {
  // Category tabs for projects
  const [activeCategory, setActiveCategory] = useState('All')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projectsData.map((p) => p.category)))
    return [
      { id: 'All', label: 'All Projects', count: projectsData.length },
      ...rawCategories.map((c) => ({
        id: c,
        label: c,
        count: projectsData.filter((p) => p.category === c).length,
      })),
    ]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      PopMessage.error('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      PopMessage.success('Thank you! Your message has been sent.')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    }, 600)
  }

  return (
    <div className="w-full flex-1">
      <Seo
        title="Full-Stack Developer & ML Engineer"
        description="Official portfolio of Santosh (Rustam) Shrestha. Exploring production ML systems, full-stack ERP architectures, and scalable web solutions."
        url={`${SITE_CONFIG.url}/`}
      />

      {/* 00. Hero Section */}
      <Hero />

      {/* 01. About Section */}
      <section id="about" className="py-20 sm:py-24 border-t border-[#E5E7EB]">
        <Container size="xl">
          <SectionTitle
            number="01"
            badge="ENGINEERING BACKGROUND"
            title="Building systems at the intersection of"
            highlight="web platforms & applied ML"
            description={personalData.bio}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Education & Core Competencies */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="p-6 sm:p-8 bg-white">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <span className="font-mono text-xs text-[#166534] font-semibold">
                      DEGREE //
                    </span>
                    <h3 className="font-heading text-xl font-bold text-[#111827] mt-0.5">
                      {personalData.education.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[#166534] mt-0.5">
                      {personalData.education.institution}
                    </p>
                  </div>
                  <Badge size="sm" variant="secondary">
                    {personalData.education.period}
                  </Badge>
                </div>

                <div className="mt-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-3">
                    Core Computer Science & Applied Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personalData.education.courses.map((course) => (
                      <Badge key={course} size="sm" variant="secondary">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Engineering Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-5 bg-white">
                  <Badge
                    size="sm"
                    variant="primary"
                    className="w-7 h-7 rounded-[6px] p-0 flex items-center justify-center font-mono font-bold mb-3"
                  >
                    01
                  </Badge>
                  <h4 className="font-heading font-bold text-base text-[#111827]">
                    Full-Stack Reliability
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                    Developing modular React frontends and Node.js/Python microservices that prioritize predictable data flow and query performance.
                  </p>
                </Card>

                <Card className="p-5 bg-white">
                  <Badge
                    size="sm"
                    variant="primary"
                    className="w-7 h-7 rounded-[6px] p-0 flex items-center justify-center font-mono font-bold mb-3"
                  >
                    02
                  </Badge>
                  <h4 className="font-heading font-bold text-base text-[#111827]">
                    Applied ML Exploration
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                    Building practical machine learning projects—from credit risk classification to PyTorch sequence models—to deepen applied AI knowledge alongside full-stack engineering.
                  </p>
                </Card>
              </div>
            </div>

            {/* Quick Specs Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 sm:p-8 bg-white">
                <h4 className="font-heading text-lg font-bold text-[#111827] pb-3 border-b border-[#E5E7EB]">
                  Contact & Coordinates
                </h4>

                <dl className="mt-4 space-y-4 text-sm divide-y divide-[#E5E7EB]/60">
                  <div className="flex justify-between items-center pt-2">
                    <dt className="text-xs font-mono text-[#6B7280]">Email</dt>
                    <dd className="font-mono text-xs text-[#166534] font-medium">
                      <a href={`mailto:${personalData.email}`} className="hover:underline">
                        {personalData.email}
                      </a>
                    </dd>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <dt className="text-xs font-mono text-[#6B7280]">Phone</dt>
                    <dd className="font-mono text-xs text-[#111827]">
                      {personalData.phone}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <dt className="text-xs font-mono text-[#6B7280]">Location</dt>
                    <dd className="text-xs font-medium text-[#111827]">
                      {personalData.location}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <dt className="text-xs font-mono text-[#6B7280]">GitHub</dt>
                    <dd className="text-xs font-mono text-[#166534]">
                      <a href={personalData.github} target="_blank" rel="noreferrer" className="hover:underline">
                        @Rustam-Shrestha
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                  <a href={personalData.resumeUrl} target="_blank" rel="noreferrer" className="w-full block">
                    <Button variant="secondary" fullWidth size="md">
                      Download Full Curriculum Vitae (PDF)
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 02. Experience Timeline */}
      <section id="experience" className="py-20 sm:py-24 bg-[#F5F7F6]/60 border-t border-[#E5E7EB]">
        <Container size="xl">
          <SectionTitle
            number="02"
            badge="CAREER MILESTONES"
            title="Work experience in"
            highlight="ERP systems & logistics"
            description="Professional software engineering roles focusing on scalable enterprise resource planning, database tuning, and full-stack development."
          />

          <div className="max-w-4xl">
            <Timeline items={experienceData} />
          </div>
        </Container>
      </section>

      {/* 03. Selected Projects */}
      <section id="projects" className="py-20 sm:py-24 border-t border-[#E5E7EB]">
        <Container size="xl">
          <div className="space-y-6 mb-10">
            <SectionTitle
              number="03"
              badge="PORTFOLIO"
              title="Selected engineering"
              highlight="projects & platforms"
              description="A curated catalog of production machine learning architectures, data intelligence systems, and full-stack web platforms."
              className="mb-0"
            />

            {/* Category Filter Tabs - clean self-contained horizontal scroll */}
            <div className="w-full max-w-full overflow-x-auto pb-1 scrollbar-none flex items-center">
              <Tabs
                tabs={categories}
                activeTab={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* 04. Moments & Travel Snapshots Carousel */}
      <section id="gallery" className="py-20 sm:py-24 bg-[#F5F7F6]/60 border-t border-[#E5E7EB]">
        <Container size="xl">
          <SectionTitle
            number="04"
            badge="SNAPSHOTS & TRAVEL"
            title="Travels, life &"
            highlight="personal moments"
            description="A casual collection of travel snapshots, everyday captures, and personal moments outside the codebase."
          />

          <Gallery />
        </Container>
      </section>

      {/* 05. Technical Skills */}
      <section id="skills" className="py-20 sm:py-24 border-t border-[#E5E7EB]">
        <Container size="xl">
          <SectionTitle
            number="05"
            badge="TECHNICAL STACK"
            title="Specialized competencies &"
            highlight="tooling matrix"
            description="Languages, frameworks, database systems, and machine learning toolkits tested across real-world workloads."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((group, index) => (
              <SkillCard
                key={group.category}
                skillGroup={group}
                number={`0${index + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 06. Certifications */}
      <section id="certifications" className="py-20 sm:py-24 bg-[#F5F7F6]/60 border-t border-[#E5E7EB]">
        <Container size="xl">
          <SectionTitle
            number="06"
            badge="INDEPENDENT RIGOR"
            title="Verified coursework &"
            highlight="professional certifications"
            description="Continuous self-directed study in machine learning mathematics, gradient boosted decision trees, deep neural networks, and MLOps."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationsData.map((cert) => (
              <Card key={cert.title} hoverEffect className="p-5 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#166534] uppercase">
                      {cert.issuer}
                    </span>
                    <CheckCircle2 className="size-4 text-[#16A34A]" />
                  </div>

                  <h4 className="font-heading text-sm font-bold text-[#111827] mt-2 leading-snug">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                    {cert.topics}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-mono font-medium text-[#166534] hover:text-[#22C55E] p-0 h-auto"
                      rightIcon={<ExternalLinkIcon className="size-3" />}
                    >
                      Verify Credential
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 07. Verified Testimonials & Endorsements */}
      <section id="testimonials" className="py-20 sm:py-24 border-t border-[#E5E7EB]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionTitle
              number="07"
              badge="VERIFIED ENDORSEMENTS"
              title="Recommendations from"
              highlight="academic & industry leaders"
              description="Direct feedback from university BCA leadership, technical mentors, project supervisors, and industry executives."
              className="mb-0"
            />

            <Link to="/testimonials">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="size-4" />}
                className="whitespace-nowrap"
              >
                View All {testimonialsData.length} References
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.slice(0, 3).map((item) => (
              <Card
                key={item.id}
                hoverEffect
                className="p-6 sm:p-7 bg-white flex flex-col justify-between border border-[#E5E7EB] hover:border-[#166534]/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]/80">
                    <Badge variant="primary" size="sm" className="font-mono text-[11px]">
                      {item.category}
                    </Badge>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#166534] font-semibold">
                      <ShieldCheck className="size-3.5 text-[#166534]" />
                      Verified
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <QuoteIcon className="size-8 text-[#166534]/15 absolute -top-3 -left-1 pointer-events-none" />
                    <p className="text-sm text-[#374151] leading-relaxed relative z-10 italic line-clamp-4">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#166534] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {item.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-sm text-[#111827] truncate">
                        {item.prefix ? `${item.prefix} ` : ''}{item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#166534] truncate">
                        {item.role}
                      </p>
                      <p className="text-xs text-[#6B7280] truncate">
                        {item.organization}
                      </p>
                    </div>
                  </div>

                  {item.phone && (
                    <div className="mt-3 pt-2.5 border-t border-dashed border-[#E5E7EB] flex items-center justify-between text-xs">
                      <span className="font-mono text-[#9CA3AF] text-[11px]">
                        Verification //
                      </span>
                      <a
                        href={`tel:${item.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 font-mono text-[#166534] hover:underline font-medium"
                      >
                        <PhoneIcon className="size-3 text-[#166534]" />
                        <span>{item.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 08. Contact Section */}
      <section id="contact" className="py-20 sm:py-24 bg-[#F5F7F6]/60 border-t border-[#E5E7EB]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left info column */}
            <div className="lg:col-span-5">
              <SectionTitle
                number="08"
                badge="INITIATE DIALOGUE"
                title="Let's discuss technical"
                highlight="systems & collaborations"
                description="Open for software engineering opportunities, applied machine learning projects, or technical consulting. Reach out directly or via the form."
              />

              <div className="space-y-4">
                <Card className="p-4 bg-white flex items-center gap-3.5">
                  <Badge
                    variant="primary"
                    size="md"
                    className="w-10 h-10 rounded-[8px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0]"
                  >
                    <MailIcon className="size-5" />
                  </Badge>
                  <div>
                    <p className="text-xs font-mono text-[#6B7280]">Direct Email</p>
                    <a
                      href={`mailto:${personalData.email}`}
                      className="text-sm font-semibold text-[#111827] hover:text-[#166534] transition-colors"
                    >
                      {personalData.email}
                    </a>
                  </div>
                </Card>

                <Card className="p-4 bg-white flex items-center gap-3.5">
                  <Badge
                    variant="secondary"
                    size="md"
                    className="w-10 h-10 rounded-[8px] p-0 flex items-center justify-center shrink-0 font-mono font-bold text-xs"
                  >
                    NP
                  </Badge>
                  <div>
                    <p className="text-xs font-mono text-[#6B7280]">Phone / Mobile</p>
                    <p className="text-sm font-semibold text-[#111827]">
                      {personalData.phone}
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right form column */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 bg-white">
                <h3 className="font-heading text-lg font-bold text-[#111827] pb-3 border-b border-[#E5E7EB]">
                  Send Message
                </h3>

                <form onSubmit={handleContactSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Your Name *"
                      placeholder="e.g. Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                    <InputField
                      label="Your Email *"
                      type="email"
                      placeholder="e.g. jane@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>

                  <TextareaField
                    label="Message *"
                    rows={4}
                    placeholder="Brief description of your project or inquiry..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      rightIcon={<ArrowRight className="size-4" />}
                    >
                      Transmit Message
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
