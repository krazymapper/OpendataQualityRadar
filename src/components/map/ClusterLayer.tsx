import React, { useMemo } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import type { Issue } from '@/types'
import { MAP_CONFIG } from '@/lib/constants/config'

export interface ClusterLayerProps {
  issues: Issue[]
  onClusterClick?: (issues: Issue[]) => void
}

/**
 * Cluster layer component for grouping nearby markers
 */
export const ClusterLayer: React.FC<ClusterLayerProps> = ({ issues, onClusterClick }) => {
  const map = useMap()

  // Simple clustering algorithm (can be improved with a proper clustering library)
  const clusters = useMemo(() => {
    const zoom = map.getZoom()
    if (zoom >= MAP_CONFIG.clusterMaxZoom) {
      return [] // Show individual markers at high zoom
    }

    const clusterRadius = MAP_CONFIG.clusterRadius / Math.pow(2, Math.max(0, zoom - 6))
    const clustered: Array<{ center: { lat: number; lng: number }; issues: Issue[] }> = []

    for (const issue of issues) {
      let addedToCluster = false
      for (const cluster of clustered) {
        // Calculate distance in degrees (simplified for clustering)
        const latDiff = issue.coordinates.lat - cluster.center.lat
        const lngDiff = issue.coordinates.lng - cluster.center.lng
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)

        if (distance < clusterRadius) {
          cluster.issues.push(issue)
          // Update cluster center
          cluster.center = {
            lat:
              cluster.issues.reduce((sum, i) => sum + i.coordinates.lat, 0) /
              cluster.issues.length,
            lng:
              cluster.issues.reduce((sum, i) => sum + i.coordinates.lng, 0) /
              cluster.issues.length,
          }
          addedToCluster = true
          break
        }
      }

      if (!addedToCluster) {
        clustered.push({
          center: { ...issue.coordinates },
          issues: [issue],
        })
      }
    }

    return clustered.filter((cluster) => cluster.issues.length > 1)
  }, [issues, map])

  return (
    <>
      {clusters.map((cluster, index) => {
        const iconHtml = renderToStaticMarkup(
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#0ea5e9',
              border: '3px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {cluster.issues.length}
          </div>
        )

        const icon = L.divIcon({
          html: iconHtml,
          className: 'cluster-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        })

        return (
          <Marker
            key={`cluster-${index}`}
            position={[cluster.center.lat, cluster.center.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onClusterClick?.(cluster.issues),
            }}
          />
        )
      })}
    </>
  )
}

