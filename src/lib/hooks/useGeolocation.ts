import { useState, useEffect } from 'react'
import type { Coordinates } from '@/types'

interface GeolocationState {
  coordinates: Coordinates | null
  error: Error | null
  loading: boolean
}

/**
 * Hook to get user's geolocation
 */
export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        error: new Error('Geolocation is not supported'),
        loading: false,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          loading: false,
        })
      },
      (error) => {
        setState({
          coordinates: null,
          error: new Error(error.message),
          loading: false,
        })
      }
    )
  }, [])

  return state
}

