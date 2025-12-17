import React, { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { LoadingState } from '../feedback/LoadingState'
import { EmptyState } from '../feedback/EmptyState'
import { formatDateTime, formatPercentage } from '@/lib/utils/formatters'
import { ISSUE_TYPE_LABELS, SEVERITY_LABELS, SEVERITY_COLORS } from '@/lib/constants/config'
import type { Issue } from '@/types'
import { cn } from '@/lib/utils/cn'

export interface DataTableProps {
  data: Issue[]
  loading?: boolean
  onRowClick?: (issue: Issue) => void
  className?: string
}

/**
 * Data table component with sorting, filtering, and pagination
 */
export const DataTable: React.FC<DataTableProps> = ({
  data,
  loading = false,
  onRowClick,
  className,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = useMemo<ColumnDef<Issue>[]>(
    () => [
      {
        accessorKey: 'type',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-2 hover:text-gray-900"
          >
            Type
            <ArrowUpDown size={14} />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-sm">{ISSUE_TYPE_LABELS[row.original.type] || row.original.type}</span>
        ),
      },
      {
        accessorKey: 'severity',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-2 hover:text-gray-900"
          >
            Sévérité
            <ArrowUpDown size={14} />
          </button>
        ),
        cell: ({ row }) => (
          <Badge variant={SEVERITY_COLORS[row.original.severity] as any}>
            {SEVERITY_LABELS[row.original.severity]}
          </Badge>
        ),
      },
      {
        accessorKey: 'confidence',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-2 hover:text-gray-900"
          >
            Confiance
            <ArrowUpDown size={14} />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-sm">{formatPercentage(row.original.confidence, 0)}</span>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <span className="text-sm text-gray-600 line-clamp-1">{row.original.description}</span>
        ),
      },
      {
        accessorKey: 'detectedAt',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-2 hover:text-gray-900"
          >
            Détecté le
            <ArrowUpDown size={14} />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">{formatDateTime(row.original.detectedAt)}</span>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  })

  if (loading) {
    return <LoadingState message="Chargement des données..." />
  }

  if (data.length === 0) {
    return <EmptyState title="Aucune donnée disponible" />
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    'hover:bg-gray-50 transition-colors cursor-pointer',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Affichage de {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} à{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            data.length
          )}{' '}
          sur {data.length} résultats
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            size="sm"
          >
            <ChevronLeft size={16} />
            Précédent
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="sm"
          >
            Suivant
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

