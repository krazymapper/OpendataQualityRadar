import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { DashboardStats } from '@/types'
import { formatNumber } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'

export interface RegionHeatmapProps {
  stats: DashboardStats
}

/**
 * Region heatmap component showing issue distribution by region
 */
export const RegionHeatmap: React.FC<RegionHeatmapProps> = ({ stats }) => {
  const regions = Object.entries(stats.regionStats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const maxCount = Math.max(...regions.map((r) => r.count), 1)

  const getIntensity = (count: number) => {
    const percentage = (count / maxCount) * 100
    if (percentage >= 80) return 'bg-error-500'
    if (percentage >= 60) return 'bg-warning-500'
    if (percentage >= 40) return 'bg-primary-500'
    if (percentage >= 20) return 'bg-primary-300'
    return 'bg-primary-100'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition par région</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region.name} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{region.name}</span>
                  <span className="text-sm text-gray-600">{formatNumber(region.count)}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full transition-all duration-500', getIntensity(region.count))}
                    style={{ width: `${(region.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

