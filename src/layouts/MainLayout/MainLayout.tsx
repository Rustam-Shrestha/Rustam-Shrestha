import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'
import { useScrollToTop } from '@/hooks'
import { useUIStore } from '@/store'
import { cn } from '@/utils'

export const MainLayout: React.FC = () => {
  // Automatically scroll to top on route change
  useScrollToTop(true)
  const { sidebarExpanded } = useUIStore()

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#111827] selection:bg-[#DCFCE7] selection:text-[#166534] transition-colors">
      <ScrollProgress />
      <Navbar />
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out',
          sidebarExpanded ? 'lg:pl-60' : 'lg:pl-[72px]',
          'pl-0'
        )}
      >
        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  )
}

export default MainLayout
