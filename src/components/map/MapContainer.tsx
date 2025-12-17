import React, { useState } from 'react'
import { MapContainer as LeafletMapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { CustomTileLayer } from './CustomTileLayer'
import { IssueMarker } from './IssueMarker'
import { ClusterLayer } from './ClusterLayer'
import { MapControls } from './MapControls'
import { MAP_CONFIG } from '@/lib/constants/config'
import type { Issue } from '@/types'
import { cn } from '@/lib/utils/cn'

export interface MapContainerProps {
  issues: Issue[]
  onIssueClick?: (issue: Issue) => void
  className?: string
}

/**
 * Main map container component
 */
export const MapContainer: React.FC<MapContainerProps> = ({
  issues,
  onIssueClick,
  className,
}) => {
  const [showClusters] = useState(true)

  return (
    <div className={cn('relative w-full h-full rounded-xl overflow-hidden', className)}>
      <LeafletMapContainer
        center={MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <CustomTileLayer />
        {showClusters ? (
          <ClusterLayer issues={issues} />
        ) : (
          issues.map((issue) => (
            <IssueMarker key={issue.id} issue={issue} onClick={onIssueClick} />
          ))
        )}
        <MapControls />
      </LeafletMapContainer>
    </div>
  )
}

