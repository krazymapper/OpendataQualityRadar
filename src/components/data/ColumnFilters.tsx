import React from 'react'
import { Filter } from 'lucide-react'
import { Button } from '../ui/button'
import { Select } from '../ui/select'
import { cn } from '@/lib/utils/cn'

export interface ColumnFilter {
  column: string
  value: string
  options: Array<{ value: string; label: string }>
}

export interface ColumnFiltersProps {
  filters: ColumnFilter[]
  onFilterChange: (column: string, value: string) => void
  className?: string
}

/**
 * Column filters component for table filtering
 */
export const ColumnFilters: React.FC<ColumnFiltersProps> = ({
  filters,
  onFilterChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Filter size={16} />
        <span>Filtres:</span>
      </div>
      {filters.map((filter) => (
        <Select
          key={filter.column}
          options={filter.options}
          value={filter.value}
          onChange={(value) => onFilterChange(filter.column, value)}
          placeholder={`Filtrer par ${filter.column}`}
          className="w-48"
        />
      ))}
    </div>
  )
}

