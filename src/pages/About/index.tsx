import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Timeline } from '@/components/Timeline'
import { Seo } from '@/components/Seo'
import { Download, CheckCircle2, ExternalLinkIcon } from '@/assets/icons'
import { personalData, experienceData, certificationsData } from '@/data'
import { SITE_CONFIG } from '@/utils'

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex-1 py-16 sm:py-24">
      <Seo
        title="About Me"
        description="Engineering background, university education, career milestones, and certifications of Santosh (Rustam) Shrestha."
        url={`${SITE_CONFIG.url}/about`}
      />
      <Container size="xl">
        <SectionTitle
          number="01"
          badge="ABOUT ME"
          title="Background, academic training &"
          highlight="career journey"
          description="An honest overview of my academic foundation, industrial experience with the MERN stack, and hands-on projects exploring applied machine learning."
        />

        {/* Section 1: Bio & Academics with Profile Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Info (Bio & Degree) */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-6 sm:p-8 bg-white">
              <h3 className="font-heading text-xl font-bold text-[#111827] pb-3 border-b border-[#E5E7EB]">
                Bio & Professional Focus
              </h3>
              <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
                {personalData.bio}
              </p>
              <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
                Experienced in building responsive React frontends, robust Node.js and Express APIs, and relational database systems, with a strong commitment to clean architecture, maintainability, and continuous self-directed learning in machine learning.
              </p>
            </Card>

            {/* University Degree */}
            <Card className="p-6 sm:p-8 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <span className="font-mono text-xs text-[#166534] font-bold">
                    FORMAL ACADEMICS //
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#111827] mt-1">
                    {personalData.education.degree}
                  </h3>
                  <p className="text-sm font-semibold text-[#166534]">
                    {personalData.education.institution}
                  </p>
                </div>
                <Badge size="sm" variant="secondary" className="self-start sm:self-center">
                  {personalData.education.period}
                </Badge>
              </div>

              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-3">
                  Key Curriculum Coursework
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
          </div>

          {/* Profile Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 bg-white">
              <div className="w-full aspect-square rounded-[8px] overflow-hidden bg-[#F5F7F6] border border-[#E5E7EB] mb-4">
                <img
                  src={personalData.avatar}
                  alt={personalData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none'
                  }}
                />
              </div>

              <h4 className="font-heading text-lg font-bold text-[#111827]">
                {personalData.name}
              </h4>
              <p className="text-xs font-mono text-[#166534] font-medium mt-0.5">
                {personalData.title}
              </p>

              <dl className="mt-4 pt-3 border-t border-[#E5E7EB] space-y-3 text-xs">
                <div className="flex justify-between">
                  <dt className="text-[#6B7280] font-mono">Location</dt>
                  <dd className="font-medium text-[#111827]">{personalData.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#6B7280] font-mono">Email</dt>
                  <dd className="font-mono text-[#166534]">{personalData.email}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-[#6B7280] font-mono">Status</dt>
                  <dd>
                    <Badge variant="success" size="sm" dot>
                      Available
                    </Badge>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                <a href={personalData.resumeUrl} target="_blank" rel="noreferrer" className="w-full block">
                  <Button variant="primary" fullWidth size="md" leftIcon={<Download className="size-4" />}>
                    Download CV (PDF)
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Section 2: Work Experience & Contributions (Full Width) */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#E5E7EB]">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs text-[#166534] font-bold tracking-wider uppercase">
              CAREER PATHWAY //
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827] mt-1.5">
              Work Experience & Contributions
            </h3>
            <p className="text-sm text-[#6B7280] mt-2">
              Chronological track record across enterprise ERP development, industrial backend systems, and high-frequency digital media.
            </p>
          </div>
          <Timeline items={experienceData} className="w-full" />
        </div>

        {/* Section 3: Verified Certifications & Credentials (Full Width Grid) */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#E5E7EB]">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs text-[#166534] font-bold tracking-wider uppercase">
              VERIFIED KNOWLEDGE //
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827] mt-1.5">
              Verified Certifications & Credentials
            </h3>
            <p className="text-sm text-[#6B7280] mt-2">
              Formal credentials and continuous learning tracks in deep learning, explainable AI, MLOps, and full-stack software development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            {certificationsData.map((cert) => (
              <Card key={cert.title} hoverEffect className="p-5 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#166534] uppercase">
                      {cert.issuer}
                    </span>
                    <CheckCircle2 className="size-4 text-[#16A34A]" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-[#111827] mt-2 line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed line-clamp-3">
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
                      View Certificate
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AboutPage
