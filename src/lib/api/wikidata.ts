import { API_CONFIG } from '../constants/config'
import { apiCache } from './cache'
import type { WikidataEntity, Coordinates } from '@/types'

/**
 * Fetch Wikidata entity by ID
 */
export async function fetchWikidataEntity(id: string): Promise<WikidataEntity | null> {
  const cacheKey = `wikidata:${id}`
  const cached = apiCache.get<WikidataEntity>(cacheKey)
  if (cached) return cached

  try {
    const url = new URL(API_CONFIG.wikidata.baseUrl)
    url.searchParams.set('action', 'wbgetentities')
    url.searchParams.set('ids', id)
    url.searchParams.set('format', 'json')
    url.searchParams.set('origin', '*')

    const response = await fetch(url.toString())
    if (!response.ok) throw new Error('Failed to fetch Wikidata entity')

    const data = await response.json()
    const entity = data.entities?.[id]

    if (!entity) return null

    // Extract coordinates if available
    let coordinates: Coordinates | undefined
    if (entity.claims?.P625) {
      const coordClaim = entity.claims.P625[0]?.mainsnak?.datavalue?.value
      if (coordClaim) {
        coordinates = {
          lat: coordClaim.latitude,
          lng: coordClaim.longitude,
        }
      }
    }

    const result: WikidataEntity = {
      id: entity.id,
      label: entity.labels?.fr?.value || entity.labels?.en?.value || id,
      description: entity.descriptions?.fr?.value || entity.descriptions?.en?.value,
      properties: entity.claims || {},
      coordinates,
      aliases: Object.values(entity.aliases || {})
        .flat()
        .map((alias: unknown) => {
          if (typeof alias === 'object' && alias !== null && 'value' in alias) {
            return (alias as { value: string }).value
          }
          return String(alias)
        }),
    }

    apiCache.set(cacheKey, result, 10 * 60 * 1000) // Cache for 10 minutes
    return result
  } catch (error) {
    console.error('Error fetching Wikidata entity:', error)
    return null
  }
}

/**
 * Search Wikidata entities
 */
export async function searchWikidata(query: string, limit: number = 10): Promise<WikidataEntity[]> {
  const cacheKey = `wikidata:search:${query}:${limit}`
  const cached = apiCache.get<WikidataEntity[]>(cacheKey)
  if (cached) return cached

  try {
    const url = new URL(API_CONFIG.wikidata.baseUrl)
    url.searchParams.set('action', 'wbsearchentities')
    url.searchParams.set('search', query)
    url.searchParams.set('language', 'fr')
    url.searchParams.set('limit', limit.toString())
    url.searchParams.set('format', 'json')
    url.searchParams.set('origin', '*')

    const response = await fetch(url.toString())
    if (!response.ok) throw new Error('Failed to search Wikidata')

    const data = await response.json()
    const results: WikidataEntity[] = (data.search || []).map((item: {
      id: string
      label: string
      description?: string
    }) => ({
      id: item.id,
      label: item.label,
      description: item.description,
      properties: {},
    }))

    apiCache.set(cacheKey, results, 5 * 60 * 1000) // Cache for 5 minutes
    return results
  } catch (error) {
    console.error('Error searching Wikidata:', error)
    return []
  }
}

