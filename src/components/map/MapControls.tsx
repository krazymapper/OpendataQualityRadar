import React from 'react'
import { useMap } from 'react-leaflet'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { MAP_CONFIG } from '@/lib/constants/config'
import { cn } from '@/lib/utils/cn'

/**
 * Map controls component with zoom and reset buttons
 */
export const MapControls: React.FC<{ className?: string }> = ({ className }) => {
  const map = useMap()

  const handleZoomIn = () => {
    map.zoomIn()
  }

  const handleZoomOut = () => {
    map.zoomOut()
  }

  const handleReset = () => {
    map.setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom)
  }

  return (
    <div
      className={cn(
        'absolute top-4 right-4 z-[1000] flex flex-col gap-2',
        className
      )}
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1 flex flex-col">
        <Button
          onClick={handleZoomIn}
          variant="ghost"
          size="sm"
          className="rounded-lg"
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </Button>
        <Button
          onClick={handleZoomOut}
          variant="ghost"
          size="sm"
          className="rounded-lg"
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </Button>
        <div className="border-t border-gray-200 my-1" />
        <Button
          onClick={handleReset}
          variant="ghost"
          size="sm"
          className="rounded-lg"
          aria-label="Reset view"
        >
          <RotateCcw size={18} />
        </Button>
      </div>
    </div>
  )
}

