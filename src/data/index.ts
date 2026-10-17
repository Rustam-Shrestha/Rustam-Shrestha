import rawPersonalData from './personal.json'
import projectsData from './projects.json'
import experienceData from './experience.json'
import skillsData from './skills.json'
import certificationsData from './certifications.json'
import galleryData from './gallery.json'
import testimonialsData from './testimonials.json'
import { getAssetUrl } from '@/utils/routing'

export const personalData = {
  ...rawPersonalData,
  avatar: getAssetUrl(rawPersonalData.avatar),
  resumeUrl: getAssetUrl(rawPersonalData.resumeUrl),
}

export {
  projectsData,
  experienceData,
  skillsData,
  certificationsData,
  galleryData,
  testimonialsData,
}

export default {
  personal: personalData,
  projects: projectsData,
  experience: experienceData,
  skills: skillsData,
  certifications: certificationsData,
  gallery: galleryData,
  testimonials: testimonialsData,
}
