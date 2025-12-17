/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate coordinates
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

/**
 * Validate Wikidata ID format (Q followed by numbers)
 */
export function isValidWikidataId(id: string): boolean {
  return /^Q\d+$/.test(id)
}

/**
 * Validate OSM ID format
 */
export function isValidOSMId(id: string): boolean {
  return /^[nwr]\d+$/i.test(id)
}

