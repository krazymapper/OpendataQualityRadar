import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatNumber } from '@/lib/utils/formatters'
import type { DashboardStats } from '@/types'
import { cn } from '@/lib/utils/cn'

export interface StatsCardsProps {
  stats: DashboardStats
  className?: string
}

/**
 * Trend arrow component
 */
const TrendArrow: React.FC<{ value: number; direction: 'up' | 'down' | 'stable' }> = ({
  value,
  direction,
}) => {
  const icons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }

  const colors = {
    up: 'text-success-500',
    down: 'text-error-500',
    stable: 'text-gray-500',
  }

  const Icon = icons[direction]
  return (
    <div className={cn('flex items-center gap-1', colors[direction])}>
      <Icon size={16} />
      <span className="text-sm font-medium">{Math.abs(value).toFixed(1)}%</span>
    </div>
  )
}

/**
 * Stats cards component displaying key metrics
 */
export const StatsCards: React.FC<StatsCardsProps> = ({ stats, className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {/* Total Issues */}
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="primary">Total</Badge>
            <TrendArrow value={stats.trend.value} direction={stats.trend.direction} />
          </div>
          <CardTitle className="text-gray-900">Problèmes détectés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalIssues)}</div>
          <p className="text-sm text-gray-600 mt-1">
            {formatNumber(stats.totalChecked)} éléments vérifiés
          </p>
        </CardContent>
      </Card>

      {/* Accuracy Score */}
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-success-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="success">Score</Badge>
          </div>
          <CardTitle className="text-gray-900">Précision</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">{stats.accuracyScore}%</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-success-500 transition-all duration-500"
              style={{ width: `${stats.accuracyScore}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Issue Distribution */}
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Types</Badge>
          </div>
          <CardTitle className="text-gray-900">Types de problèmes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {Object.keys(stats.issueDistribution).length}
          </div>
          <p className="text-sm text-gray-600 mt-1">Types différents détectés</p>
        </CardContent>
      </Card>

      {/* Regions */}
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-warning-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="warning">Régions</Badge>
          </div>
          <CardTitle className="text-gray-900">Régions analysées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {Object.keys(stats.regionStats).length}
          </div>
          <p className="text-sm text-gray-600 mt-1">Régions couvertes</p>
        </CardContent>
      </Card>
    </div>
  )
}

