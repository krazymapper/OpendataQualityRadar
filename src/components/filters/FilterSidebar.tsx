import React, { useState } from 'react'
import { X, Filter } from 'lucide-react'
import { Button } from '../ui/button'
import { Toggle } from '../ui/toggle'
import { Select } from '../ui/select'
import { DateRangePicker, type DateRange } from './DateRangePicker'
import { Progress } from '../ui/progress'
import { useIssueStore } from '@/lib/stores/issue.store'
import { ISSUE_TYPE_LABELS, SEVERITY_LABELS } from '@/lib/constants/config'
import type { IssueType, IssueSeverity } from '@/types'
import { cn } from '@/lib/utils/cn'

export interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

/**
 * Filter sidebar component with all filter options
 */
export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const { filters, setFilters, resetFilters } = useIssueStore()
  const [localFilters, setLocalFilters] = useState(filters)

  const handleIssueTypeToggle = (type: IssueType) => {
    const currentTypes = localFilters.issueTypes || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type]
    setLocalFilters({ ...localFilters, issueTypes: newTypes })
  }

  const handleSeverityToggle = (severity: IssueSeverity) => {
    const currentSeverities = localFilters.severities || []
    const newSeverities = currentSeverities.includes(severity)
      ? currentSeverities.filter((s) => s !== severity)
      : [...currentSeverities, severity]
    setLocalFilters({ ...localFilters, severities: newSeverities })
  }

  const handleApply = () => {
    setFilters(localFilters)
    onClose()
  }

  const handleReset = () => {
    resetFilters()
    setLocalFilters({
      searchQuery: '',
      issueTypes: [],
      severities: [],
      confidenceMin: 0,
    })
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {/* Issue Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Types de problèmes</h3>
            <div className="space-y-2">
              {Object.entries(ISSUE_TYPE_LABELS).map(([type, label]) => (
                <Toggle
                  key={type}
                  enabled={localFilters.issueTypes?.includes(type as IssueType) || false}
                  onChange={() => handleIssueTypeToggle(type as IssueType)}
                  label={label}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Severities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Sévérité</h3>
            <div className="space-y-2">
              {Object.entries(SEVERITY_LABELS).map(([severity, label]) => (
                <Toggle
                  key={severity}
                  enabled={localFilters.severities?.includes(severity as IssueSeverity) || false}
                  onChange={() => handleSeverityToggle(severity as IssueSeverity)}
                  label={label}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Confiance minimale: {localFilters.confidenceMin}%
            </h3>
            <Progress
              value={localFilters.confidenceMin}
              variant="primary"
              showLabel={false}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={localFilters.confidenceMin}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, confidenceMin: parseInt(e.target.value) })
              }
              className="w-full mt-2"
            />
          </div>

          {/* Date Range */}
          <DateRangePicker
            value={{
              start: localFilters.dateRange?.start || null,
              end: localFilters.dateRange?.end || null,
            }}
            onChange={(range) =>
              setLocalFilters({
                ...localFilters,
                dateRange: range.start && range.end ? range : undefined,
              })
            }
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button onClick={handleApply} variant="primary" className="w-full">
            Appliquer les filtres
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full">
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  )
}

