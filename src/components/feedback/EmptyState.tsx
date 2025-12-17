import React from 'react'
import { Search, Inbox } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils/cn'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * Empty state component for when no data is available
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  const defaultIcon = <Inbox className="text-gray-400" size={64} />

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 max-w-md mb-6">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  )
}

/**
 * No results found empty state
 */
export const NoResultsState: React.FC<{ query?: string }> = ({ query }) => {
  return (
    <EmptyState
      icon={<Search className="text-gray-400" size={64} />}
      title="Aucun résultat trouvé"
      description={
        query
          ? `Aucun résultat ne correspond à "${query}". Essayez de modifier vos critères de recherche.`
          : 'Aucun résultat ne correspond à vos critères de recherche.'
      }
    />
  )
}

