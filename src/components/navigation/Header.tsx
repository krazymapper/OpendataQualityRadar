import React, { useState } from 'react'
import { Search, Menu, Settings, Bell } from 'lucide-react'
import { SearchBar } from '../filters/SearchBar'
import { MobileMenu } from './MobileMenu'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

/**
 * Main header component with navigation and search
 */
export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">QR</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 hidden sm:inline">
                OpenData Quality Radar
              </span>
            </div>
          </div>

          {/* Search Bar */}
          {!isMobile && (
            <div className="flex-1 max-w-xl mx-8">
              <SearchBar />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-error-500 rounded-full" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

