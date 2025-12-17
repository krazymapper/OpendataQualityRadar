import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '../components/feedback/ErrorBoundary'
import { ToastProvider } from '../components/feedback/ToastProvider'
import { Header } from '../components/navigation/Header'
import { Sidebar, type ViewType } from '../components/navigation/Sidebar'
import '../styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

export interface LayoutProps {
  children: React.ReactNode
  activeView?: ViewType
  onViewChange?: (view: ViewType) => void
  onFiltersClick?: () => void
  issueCount?: number
}

/**
 * Main application layout
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  onViewChange,
  onFiltersClick,
  issueCount,
}) => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <Header
              activeView={activeView}
              onViewChange={onViewChange}
              onFiltersClick={onFiltersClick}
              issueCount={issueCount}
            />
            <div className="flex">
              <Sidebar
                activeView={activeView}
                onViewChange={onViewChange}
                onFiltersClick={onFiltersClick}
                issueCount={issueCount}
              />
              <main className="flex-1 lg:ml-64">
                <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

