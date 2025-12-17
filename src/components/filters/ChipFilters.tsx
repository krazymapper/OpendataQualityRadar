import React from 'react'
import { X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils/cn'

export interface ChipFilter {
  id: string
  label: string
  value: string
  onRemove: () => void
}

export interface ChipFiltersProps {
  filters: ChipFilter[]
  onClearAll?: () => void
  className?: string
}

/**
 * Chip filters component for displaying active filters
 */
export const ChipFilters: React.FC<ChipFiltersProps> = ({
  filters,
  onClearAll,
  className,
}) => {
  if (filters.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="primary"
          className="flex items-center gap-1.5 pr-1 py-1"
        >
          <span>{filter.label}</span>
          <button
            onClick={filter.onRemove}
            className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X size={14} />
          </button>
        </Badge>
      ))}
      {onClearAll && filters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Tout effacer
        </button>
      )}
    </div>
  )
}

