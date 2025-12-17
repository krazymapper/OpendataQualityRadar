/**
 * Core type definitions for OpenData Quality Radar
 */

/**
 * Issue severity levels
 */
export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Issue types
 */
export type IssueType =
  | 'missing_property'
  | 'incorrect_value'
  | 'format_error'
  | 'duplicate'
  | 'outdated'
  | 'geospatial_error'
  | 'reference_error';

/**
 * Geographic coordinates
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Geographic region/bounding box
 */
export interface Region {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

/**
 * Data quality issue
 */
export interface Issue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  confidence: number; // 0-100
  coordinates: Coordinates;
  region?: string;
  wikidataId?: string;
  osmId?: string;
  description: string;
  suggestion?: string;
  detectedAt: Date;
  resolvedAt?: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Wikidata entity data
 */
export interface WikidataEntity {
  id: string;
  label: string;
  description?: string;
  properties: Record<string, unknown>;
  coordinates?: Coordinates;
  aliases?: string[];
}

/**
 * OSM (OpenStreetMap) entity data
 */
export interface OSMEntity {
  id: string;
  type: 'node' | 'way' | 'relation';
  tags: Record<string, string>;
  coordinates?: Coordinates;
  version?: number;
  timestamp?: Date;
}

/**
 * Filter state
 */
export interface FilterState {
  searchQuery: string;
  issueTypes: IssueType[];
  severities: IssueSeverity[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  confidenceMin: number;
  region?: string;
  coordinates?: {
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  totalIssues: number;
  totalChecked: number;
  accuracyScore: number;
  issueDistribution: Record<IssueType, number>;
  severityDistribution: Record<IssueSeverity, number>;
  regionStats: Record<string, number>;
  trend: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
}

/**
 * Export format options
 */
export type ExportFormat = 'csv' | 'json' | 'xml' | 'quickstatements';

/**
 * Table column definition
 */
export interface TableColumn<T = unknown> {
  id: string;
  header: string;
  accessor?: keyof T | ((row: T) => unknown);
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

/**
 * Activity timeline event
 */
export interface ActivityEvent {
  id: string;
  type: 'issue_detected' | 'issue_resolved' | 'data_updated' | 'export_generated';
  timestamp: Date;
  description: string;
  metadata?: Record<string, unknown>;
}

