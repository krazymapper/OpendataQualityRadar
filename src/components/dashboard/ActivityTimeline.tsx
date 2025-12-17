import React from 'react'
import { Clock, CheckCircle, AlertCircle, Download, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { formatRelativeTime } from '@/lib/utils/formatters'
import type { ActivityEvent } from '@/types'
import { cn } from '@/lib/utils/cn'

export interface ActivityTimelineProps {
  events: ActivityEvent[]
  className?: string
}

const eventIcons = {
  issue_detected: AlertCircle,
  issue_resolved: CheckCircle,
  data_updated: RefreshCw,
  export_generated: Download,
}

const eventColors = {
  issue_detected: 'text-error-500 bg-error-50',
  issue_resolved: 'text-success-500 bg-success-50',
  data_updated: 'text-primary-500 bg-primary-50',
  export_generated: 'text-secondary-500 bg-secondary-50',
}

/**
 * Activity timeline component
 */
export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  events,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.slice(0, 10).map((event, index) => {
            const Icon = eventIcons[event.type]
            const colorClass = eventColors[event.type]

            return (
              <div key={event.id} className="relative flex items-start gap-3">
                <div
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative z-10',
                    colorClass
                  )}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{event.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(event.timestamp)}
                    </span>
                  </div>
                </div>
                {index < events.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200 z-0" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

