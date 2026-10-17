import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Seo } from '@/components/Seo'
import { ArrowLeft } from '@/assets/icons'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center py-24 sm:py-32 bg-grid-pattern">
      <Seo title="404 - Page Not Found" description="The requested route could not be resolved." />
      <Container size="md" className="text-center">
        <span className="font-mono text-xs font-bold text-[#166534] tracking-widest uppercase">
          [ERROR 404 // UNRESOLVED ROUTE]
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold font-heading text-[#111827]">
          Page Not Located
        </h1>
        <p className="mt-3 text-base text-[#6B7280] max-w-md mx-auto leading-relaxed">
          The requested system route does not exist or has been relocated to another path.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button variant="primary" leftIcon={<ArrowLeft className="size-4" />}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NotFoundPage
