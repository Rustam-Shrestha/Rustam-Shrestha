import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'
import { useScrollToTop } from '@/hooks'

export const MainLayout: React.FC = () => {
  // Automatically scroll to top on route change
  useScrollToTop(true)

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#111827] selection:bg-[#DCFCE7] selection:text-[#166534] transition-colors">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default MainLayout
