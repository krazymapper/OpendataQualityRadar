import { API_CONFIG } from '../constants/config'
import { apiCache } from './cache'
import type { OSMEntity, Coordinates } from '@/types'

/**
 * Overpass QL query interface
 */
interface OverpassQuery {
  query: string
  timeout?: number
}

/**
 * Execute Overpass API query
 */
export async function executeOverpassQuery(query: OverpassQuery): Promise<OSMEntity[]> {
  const cacheKey = `overpass:${btoa(query.query)}`
  const cached = apiCache.get<OSMEntity[]>(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch(API_CONFIG.overpass.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query.query)}`,
    })

    if (!response.ok) throw new Error('Failed to execute Overpass query')

    const data = await response.json()
    const elements = data.elements || []

    const results: OSMEntity[] = elements.map((element: {
      id: number
      type: 'node' | 'way' | 'relation'
      tags?: Record<string, string>
      lat?: number
      lon?: number
      timestamp?: string
      version?: number
    }) => {
      let coordinates: Coordinates | undefined
      if (element.lat !== undefined && element.lon !== undefined) {
        coordinates = {
          lat: element.lat,
          lng: element.lon,
        }
      }

      return {
        id: `${element.type[0]}${element.id}`,
        type: element.type,
        tags: element.tags || {},
        coordinates,
        version: element.version,
        timestamp: element.timestamp ? new Date(element.timestamp) : undefined,
      }
    })

    apiCache.set(cacheKey, results, 10 * 60 * 1000) // Cache for 10 minutes
    return results
  } catch (error) {
    console.error('Error executing Overpass query:', error)
    return []
  }
}

/**
 * Query OSM entities by bounding box
 */
export async function queryOSMByBounds(
  bounds: { north: number; south: number; east: number; west: number },
  tags?: Record<string, string>
): Promise<OSMEntity[]> {
  const tagFilters = tags
    ? Object.entries(tags)
        .map(([key, value]) => `["${key}"="${value}"]`)
        .join('')
    : ''

  const query = `
    [out:json][timeout:25];
    (
      node${tagFilters}(${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      way${tagFilters}(${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      relation${tagFilters}(${bounds.south},${bounds.west},${bounds.north},${bounds.east});
    );
    out body;
    >;
    out skel qt;
  `

  return executeOverpassQuery({ query })
}

