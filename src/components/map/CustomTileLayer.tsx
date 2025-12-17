import React from 'react'
import { TileLayer } from 'react-leaflet'
import { MAP_CONFIG } from '@/lib/constants/config'

/**
 * Custom tile layer component with CartoDB Positron style
 */
export const CustomTileLayer: React.FC = () => {
  return (
    <TileLayer
      url={MAP_CONFIG.tileLayer}
      attribution={MAP_CONFIG.attribution}
      maxZoom={MAP_CONFIG.maxZoom}
      minZoom={MAP_CONFIG.minZoom}
    />
  )
}

