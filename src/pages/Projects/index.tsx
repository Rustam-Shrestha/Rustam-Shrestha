import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { ProjectCard } from '@/components/ProjectCard'
import { Tabs } from '@/components/Tabs'
import { Gallery } from '@/components/Gallery'
import { Seo } from '@/components/Seo'
import { projectsData } from '@/data'
import { SITE_CONFIG } from '@/utils'

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All')

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

  return (
    <div className="w-full flex-1 py-16 sm:py-24">
      <Seo
        title="Projects & Platforms"
        description="Machine learning credit-risk models, structured data intelligence systems, and full-stack web platforms by Santosh (Rustam) Shrestha."
        url={`${SITE_CONFIG.url}/projects`}
      />
      <Container size="xl">
        <div className="space-y-6 mb-10">
          <SectionTitle
            number="03"
            badge="PROJECT DIRECTORY"
            title="Production systems &"
            highlight="applied platforms"
            description="Explore my work spanning machine learning credit evaluation, computer vision biometric pipelines, and enterprise-grade full-stack web platforms."
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

        {/* Visual Glimpses Showcase Carousel */}
        <div className="mt-20 pt-16 border-t border-[#E5E7EB]">
          <SectionTitle
            number="04"
            badge="VISUAL CAPTURES"
            title="Interface & platform"
            highlight="screenshot gallery"
            description="High-resolution interface captures, architecture dashboards, and pipeline glimpses from deployed systems."
          />
          <Gallery />
        </div>
      </Container>
    </div>
  )
}

export default ProjectsPage
