import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { SkillCard } from '@/components/SkillCard'
import { Card } from '@/components/Card'
import { Seo } from '@/components/Seo'
import { skillsData, certificationsData } from '@/data'
import { CheckCircle2, ExternalLinkIcon } from '@/assets/icons'
import { SITE_CONFIG } from '@/utils'

export const SkillsPage: React.FC = () => {
  return (
    <div className="w-full flex-1 py-16 sm:py-24">
      <Seo
        title="Technical Skills & Competencies"
        description="Comprehensive technical skill matrix, languages, frameworks, database systems, and ML tooling mastered by Santosh (Rustam) Shrestha."
        url={`${SITE_CONFIG.url}/skills`}
      />
      <Container size="xl">
        <SectionTitle
          number="04"
          badge="TECHNICAL MATRIX"
          title="Engineering competencies &"
          highlight="technology stack"
          description="Languages, frameworks, data stores, and machine learning toolkits applied across production systems, ERP modules, and independent research."
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

        {/* Certifications Section */}
        <div className="mt-20 pt-16 border-t border-[#E5E7EB]">
          <SectionTitle
            number="05"
            badge="INDEPENDENT RIGOR"
            title="Verified certifications &"
            highlight="coursework credentials"
            description="Completed coursework in machine learning mathematics, deep learning with PyTorch, XGBoost, and MLOps fundamentals."
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
                  <h4 className="font-heading text-sm font-bold text-[#111827] mt-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                    {cert.topics}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#166534] hover:text-[#22C55E]"
                  >
                    <span>Verify Credential</span>
                    <ExternalLinkIcon className="size-3" />
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

export default SkillsPage
