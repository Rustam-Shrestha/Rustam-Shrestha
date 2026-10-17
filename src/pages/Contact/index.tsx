import { useState } from 'react'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { InputField, TextareaField } from '@/components/Input'
import { Seo } from '@/components/Seo'
import { PopMessage } from '@/utils'
import {
  MailIcon,
  ArrowRight,
  ExternalLinkIcon,
  GlobeIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/assets/icons'
import { personalData } from '@/data'
import { SITE_CONFIG } from '@/utils'

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      PopMessage.error('Please complete all required fields.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      PopMessage.success('Thank you! Your message has been received.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 600)
  }

  return (
    <div className="w-full flex-1 py-16 sm:py-24">
      <Seo
        title="Contact & Inquiries"
        description="Get in touch with Santosh (Rustam) Shrestha for software engineering roles, applied machine learning projects, or technical consulting."
        url={`${SITE_CONFIG.url}/contact`}
      />
      <Container size="xl">
        <SectionTitle
          number="06"
          badge="GET IN TOUCH"
          title="Initiate direct dialogue for"
          highlight="projects & engineering roles"
          description="I am actively available for software engineering roles, full-stack platform architecture, and applied machine learning systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Coordinates Column */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-6 bg-white space-y-5">
              <h3 className="font-heading text-lg font-bold text-[#111827] pb-3 border-b border-[#E5E7EB]">
                Direct Coordinates
              </h3>

              <div className="flex items-center gap-3.5">
                <Badge
                  variant="primary"
                  size="md"
                  className="w-10 h-10 rounded-[8px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0]"
                >
                  <MailIcon className="size-5" />
                </Badge>
                <div>
                  <p className="text-xs font-mono uppercase text-[#6B7280]">Email Address</p>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-sm font-semibold text-[#111827] hover:text-[#166534] transition-colors"
                  >
                    {personalData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 border-t border-[#E5E7EB]">
                <Badge
                  variant="secondary"
                  size="md"
                  className="w-10 h-10 rounded-[8px] p-0 flex items-center justify-center shrink-0 font-mono font-bold text-xs"
                >
                  NP
                </Badge>
                <div>
                  <p className="text-xs font-mono uppercase text-[#6B7280]">Phone / Mobile</p>
                  <p className="text-sm font-semibold text-[#111827]">{personalData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 border-t border-[#E5E7EB]">
                <Badge
                  variant="secondary"
                  size="md"
                  className="w-10 h-10 rounded-[8px] p-0 flex items-center justify-center shrink-0"
                >
                  <GlobeIcon className="size-5 text-[#166534]" />
                </Badge>
                <div>
                  <p className="text-xs font-mono uppercase text-[#6B7280]">Base Location</p>
                  <p className="text-sm font-semibold text-[#111827]">{personalData.location}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h4 className="font-heading text-sm font-bold text-[#111827] mb-3">
                Professional Channels
              </h4>
              <div className="space-y-2">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="ghost"
                    fullWidth
                    size="sm"
                    className="justify-between text-xs font-mono text-[#374151] hover:text-[#166534] px-3 py-2.5 h-auto font-normal"
                    leftIcon={<GithubIcon className="size-4 text-[#111827]" />}
                    rightIcon={<ExternalLinkIcon className="size-3.5" />}
                  >
                    GitHub Repository
                  </Button>
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="ghost"
                    fullWidth
                    size="sm"
                    className="justify-between text-xs font-mono text-[#374151] hover:text-[#166534] px-3 py-2.5 h-auto font-normal"
                    leftIcon={<LinkedinIcon className="size-4 text-[#0A66C2]" />}
                    rightIcon={<ExternalLinkIcon className="size-3.5" />}
                  >
                    LinkedIn Network
                  </Button>
                </a>
                <a
                  href={personalData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="ghost"
                    fullWidth
                    size="sm"
                    className="justify-between text-xs font-mono text-[#374151] hover:text-[#166534] px-3 py-2.5 h-auto font-normal"
                    leftIcon={<GlobeIcon className="size-4 text-[#166534]" />}
                    rightIcon={<ExternalLinkIcon className="size-3.5" />}
                  >
                    santoshshrestha4.com.np
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white">
              <h3 className="font-heading text-lg font-bold text-[#111827] pb-3 border-b border-[#E5E7EB]">
                Dispatch Transmission
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Name *"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <InputField
                    label="Email Address *"
                    type="email"
                    placeholder="name@organization.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <InputField
                  label="Subject / Topic"
                  placeholder="Inquiry or Project Scope"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <TextareaField
                  label="Message Detail *"
                  rows={5}
                  placeholder="Provide brief details regarding requirements, timelines, or roles..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    Send Inquiry
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactPage
