import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import type { Issue } from '@/types'
import { Badge } from '../ui/badge'
import { SEVERITY_COLORS } from '@/lib/constants/config'
import { formatDateTime } from '@/lib/utils/formatters'

export interface IssueMarkerProps {
  issue: Issue
  onClick?: (issue: Issue) => void
}

/**
 * Custom marker component for issues on the map
 */
export const IssueMarker: React.FC<IssueMarkerProps> = ({ issue, onClick }) => {
  const severityColor = SEVERITY_COLORS[issue.severity] || 'gray'
  const colorMap = {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gray: '#6b7280',
  }

  const color = colorMap[severityColor as keyof typeof colorMap] || colorMap.gray

  // Create custom icon
  const iconHtml = renderToStaticMarkup(
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: color,
        border: '3px solid white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
    />
  )

  const icon = L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  return (
    <Marker
      position={[issue.coordinates.lat, issue.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onClick?.(issue),
      }}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm text-gray-900">{issue.type}</h3>
            <Badge variant={severityColor as any}>{issue.severity}</Badge>
          </div>
          <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
          <div className="text-xs text-gray-500">
            <div>Confiance: {issue.confidence}%</div>
            <div>Détecté: {formatDateTime(issue.detectedAt)}</div>
            {issue.region && <div>Région: {issue.region}</div>}
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

