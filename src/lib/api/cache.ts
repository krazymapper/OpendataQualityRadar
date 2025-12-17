/**
 * Simple in-memory cache for API responses
 */
class ApiCache {
  private cache: Map<string, { data: unknown; timestamp: number; ttl: number }> = new Map()

  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    // Check if expired
    if (Date.now() > cached.timestamp + cached.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data as T
  }

  /**
   * Set cache data
   */
  set(key: string, data: unknown, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Remove specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key)
  }
}

export const apiCache = new ApiCache()

