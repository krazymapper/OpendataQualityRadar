import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useIssueStore } from '@/lib/stores/issue.store'
import { cn } from '@/lib/utils/cn'

/**
 * Search bar component with debounced input
 */
export const SearchBar: React.FC = () => {
  const [localQuery, setLocalQuery] = useState('')
  const debouncedQuery = useDebounce(localQuery, 300)
  const { setFilters } = useIssueStore()

  React.useEffect(() => {
    setFilters({ searchQuery: debouncedQuery })
  }, [debouncedQuery, setFilters])

  const handleClear = () => {
    setLocalQuery('')
    setFilters({ searchQuery: '' })
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Rechercher des problèmes..."
        className={cn(
          'w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'placeholder:text-gray-400'
        )}
        aria-label="Search issues"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}

