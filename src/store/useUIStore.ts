import { create } from 'zustand'

interface UIState {
  mobileMenuOpen: boolean
  activeSection: string
  contactModalOpen: boolean
  selectedProjectCategory: string
  searchQuery: string
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openMobileMenu: () => void
  setActiveSection: (section: string) => void
  setContactModalOpen: (open: boolean) => void
  setSelectedProjectCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  activeSection: 'home',
  contactModalOpen: false,
  selectedProjectCategory: 'All',
  searchQuery: '',
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  setActiveSection: (section: string) => set({ activeSection: section }),
  setContactModalOpen: (open: boolean) => set({ contactModalOpen: open }),
  setSelectedProjectCategory: (category: string) => set({ selectedProjectCategory: category }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  resetFilters: () => set({ selectedProjectCategory: 'All', searchQuery: '' }),
}))

export default useUIStore
