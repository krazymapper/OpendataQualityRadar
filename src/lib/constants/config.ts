/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  name: 'OpenData Quality Radar',
  version: '0.1.0',
  maxContainerWidth: 1440,
  baseSpacing: 8,
} as const;

/**
 * API endpoints configuration
 */
export const API_CONFIG = {
  wikidata: {
    baseUrl: 'https://www.wikidata.org/w/api.php',
    sparqlEndpoint: 'https://query.wikidata.org/sparql',
  },
  overpass: {
    baseUrl: 'https://overpass-api.de/api/interpreter',
  },
  timeout: 30000, // 30 seconds
} as const;

/**
 * Map configuration
 */
export const MAP_CONFIG = {
  defaultCenter: [46.2276, 2.2137] as [number, number], // France center
  defaultZoom: 6,
  minZoom: 3,
  maxZoom: 18,
  tileLayer: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  clusterRadius: 50,
  clusterMaxZoom: 14,
} as const;

/**
 * Table configuration
 */
export const TABLE_CONFIG = {
  defaultPageSize: 50,
  pageSizeOptions: [25, 50, 100, 200],
  virtualScrollThreshold: 1000,
} as const;

/**
 * Issue type labels (French)
 */
export const ISSUE_TYPE_LABELS: Record<string, string> = {
  missing_property: 'Propriété manquante',
  incorrect_value: 'Valeur incorrecte',
  format_error: 'Erreur de format',
  duplicate: 'Doublon',
  outdated: 'Données obsolètes',
  geospatial_error: 'Erreur géospatiale',
  reference_error: 'Erreur de référence',
} as const;

/**
 * Severity labels (French)
 */
export const SEVERITY_LABELS: Record<string, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  critical: 'Critique',
} as const;

/**
 * Severity colors
 */
export const SEVERITY_COLORS: Record<string, string> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
  critical: 'error',
} as const;

/**
 * Date format strings
 */
export const DATE_FORMATS = {
  short: 'dd/MM/yyyy',
  medium: 'dd MMM yyyy',
  long: 'dd MMMM yyyy',
  datetime: 'dd/MM/yyyy HH:mm',
  time: 'HH:mm',
} as const;

