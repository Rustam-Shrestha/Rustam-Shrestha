import { create } from 'zustand'

interface UIState {
  // Mobile / drawer state
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openMobileMenu: () => void

  // YouTube-style responsive sidebar state
  sidebarExpanded: boolean
  toggleSidebar: () => void
  setSidebarExpanded: (expanded: boolean) => void
  mobileSidebarOpen: boolean
  toggleMobileSidebar: () => void
  closeMobileSidebar: () => void
  openMobileSidebar: () => void

  // Content state
  activeSection: string
  contactModalOpen: boolean
  selectedProjectCategory: string
  searchQuery: string
  setActiveSection: (section: string) => void
  setContactModalOpen: (open: boolean) => void
  setSelectedProjectCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openMobileMenu: () => set({ mobileMenuOpen: true }),

  // Desktop sidebar expanded by default, can collapse to mini icon-only
  sidebarExpanded: true,
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
  setSidebarExpanded: (expanded: boolean) => set({ sidebarExpanded: expanded }),

  // Mobile sidebar drawer
  mobileSidebarOpen: false,
  toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
  openMobileSidebar: () => set({ mobileSidebarOpen: true }),

  activeSection: 'home',
  contactModalOpen: false,
  selectedProjectCategory: 'All',
  searchQuery: '',
  setActiveSection: (section: string) => set({ activeSection: section }),
  setContactModalOpen: (open: boolean) => set({ contactModalOpen: open }),
  setSelectedProjectCategory: (category: string) => set({ selectedProjectCategory: category }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  resetFilters: () => set({ selectedProjectCategory: 'All', searchQuery: '' }),
}))

export default useUIStore
