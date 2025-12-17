import React, { useState } from 'react'
import { Calendar, X } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils/cn'

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

/**
 * Date range picker component
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null
    onChange({ ...value, start: date })
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null
    onChange({ ...value, end: date })
  }

  const handleClear = () => {
    onChange({ start: null, end: null })
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return format(date, 'yyyy-MM-dd')
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-gray-700">Période</label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="date"
            value={formatDate(value.start)}
            onChange={handleStartDateChange}
            className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Date de début"
          />
        </div>
        <span className="text-gray-400">-</span>
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="date"
            value={formatDate(value.end)}
            onChange={handleEndDateChange}
            min={formatDate(value.start || undefined)}
            className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Date de fin"
          />
        </div>
        {(value.start || value.end) && (
          <button
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Clear date range"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )
}

