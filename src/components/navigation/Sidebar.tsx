import React from 'react'
import { Home, Map, Table, BarChart3, Settings, Filter } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

export interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
  badge?: number
}

export interface SidebarProps {
  items?: SidebarItem[]
  className?: string
}

const defaultItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <Home size={20} />, active: true },
  { id: 'map', label: 'Carte', icon: <Map size={20} /> },
  { id: 'table', label: 'Tableau', icon: <Table size={20} /> },
  { id: 'analytics', label: 'Analyses', icon: <BarChart3 size={20} /> },
  { id: 'filters', label: 'Filtres', icon: <Filter size={20} /> },
  { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> },
]

/**
 * Sidebar navigation component
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items = defaultItems,
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return null // Mobile uses bottom navigation or drawer
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white',
        className
      )}
    >
      <nav className="p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={item.onClick}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold bg-primary-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

