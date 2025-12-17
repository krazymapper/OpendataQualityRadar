import React, { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { Layout } from './layout'
import type { ViewType } from '../components/navigation/Sidebar'
import { StatsCards } from '../components/dashboard/StatsCards'
import { IssueDistribution } from '../components/dashboard/IssueDistribution'
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline'
import { RegionHeatmap } from '../components/dashboard/RegionHeatmap'
import { MapContainer } from '../components/map/MapContainer'
import { DataTable } from '../components/data/DataTable'
import { ExportMenu } from '../components/data/ExportMenu'
import { DetailPanel } from '../components/data/DetailPanel'
import { FilterSidebar } from '../components/filters/FilterSidebar'
import { ChipFilters } from '../components/filters/ChipFilters'
import { Button } from '../components/ui/button'
import { LoadingState } from '../components/feedback/LoadingState'
import { useIssueStore } from '../lib/stores/issue.store'
import { fetchWikidataEntity } from '../lib/api/wikidata'
import type { Issue, DashboardStats, ActivityEvent, WikidataEntity, OSMEntity } from '../types'

/**
 * Generate mock data for demonstration
 */
const generateMockData = (): {
  issues: Issue[]
  stats: DashboardStats
  events: ActivityEvent[]
} => {
  const issues: Issue[] = Array.from({ length: 50 }, (_, i) => ({
    id: `issue-${i + 1}`,
    type: ['missing_property', 'incorrect_value', 'format_error', 'duplicate', 'outdated'][
      i % 5
    ] as any,
    severity: ['low', 'medium', 'high', 'critical'][i % 4] as any,
    confidence: 60 + (i % 40),
    coordinates: {
      lat: 46.2276 + (Math.random() - 0.5) * 5,
      lng: 2.2137 + (Math.random() - 0.5) * 5,
    },
    region: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur'][i % 3],
    wikidataId: i % 3 === 0 ? `Q${1000 + i}` : undefined,
    osmId: i % 2 === 0 ? `n${2000 + i}` : undefined,
    description: `Problème détecté #${i + 1}: Description du problème de qualité des données`,
    suggestion: i % 2 === 0 ? 'Suggestion de correction' : undefined,
    detectedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    metadata: {},
  }))

  const stats: DashboardStats = {
    totalIssues: issues.length,
    totalChecked: 1250,
    accuracyScore: 87,
    issueDistribution: {
      missing_property: 15,
      incorrect_value: 12,
      format_error: 8,
      duplicate: 10,
      outdated: 5,
      geospatial_error: 0,
      reference_error: 0,
    },
    severityDistribution: {
      low: 20,
      medium: 18,
      high: 10,
      critical: 2,
    },
    regionStats: {
      'Île-de-France': 18,
      'Auvergne-Rhône-Alpes': 15,
      'Provence-Alpes-Côte d\'Azur': 17,
    },
    trend: {
      value: 12.5,
      direction: 'up',
    },
  }

  const events: ActivityEvent[] = Array.from({ length: 10 }, (_, i) => ({
    id: `event-${i + 1}`,
    type: ['issue_detected', 'issue_resolved', 'data_updated', 'export_generated'][i % 4] as any,
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
    description: `Événement ${i + 1}: Description de l'activité`,
  }))

  return { issues, stats, events }
}

/**
 * Main application page
 */
const AppPage: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard')
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [wikidataData, setWikidataData] = useState<WikidataEntity | null>(null)
  const [osmData, setOsmData] = useState<OSMEntity | null>(null)
  const [loading, setLoading] = useState(true)

  const { issues, stats, setIssues, setStats } = useIssueStore()

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const mockData = generateMockData()
      setIssues(mockData.issues)
      setStats(mockData.stats)
      setLoading(false)
    }, 1000)
  }, [setIssues, setStats])

  useEffect(() => {
    if (selectedIssue?.wikidataId) {
      fetchWikidataEntity(selectedIssue.wikidataId).then(setWikidataData)
    }
  }, [selectedIssue])

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue)
  }

  const handleCloseDetail = () => {
    setSelectedIssue(null)
    setWikidataData(null)
    setOsmData(null)
  }

  const mockEvents: ActivityEvent[] = Array.from({ length: 10 }, (_, i) => ({
    id: `event-${i + 1}`,
    type: ['issue_detected', 'issue_resolved', 'data_updated', 'export_generated'][i % 4] as any,
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
    description: `Événement ${i + 1}: Description de l'activité`,
  }))

  if (loading) {
    return (
      <Layout>
        <LoadingState fullScreen message="Chargement des données..." />
      </Layout>
    )
  }

  const handleViewChange = (newView: ViewType) => {
    setView(newView)
    // Si on clique sur "Filtres" dans la sidebar, ouvrir le FilterSidebar
    if (newView === 'filters') {
      setFilterSidebarOpen(true)
    }
  }

  const handleFiltersClick = () => {
    setFilterSidebarOpen(true)
  }

  return (
    <Layout
      activeView={view}
      onViewChange={handleViewChange}
      onFiltersClick={handleFiltersClick}
      issueCount={issues.length}
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-end gap-2">
          <ExportMenu issues={issues} />
        </div>

        {/* Active Filters */}
        <ChipFilters
          filters={[]}
          onClearAll={() => {}}
        />

        {/* Content */}
        {view === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {stats && <StatsCards stats={stats} />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stats && <IssueDistribution stats={stats} />}
              {stats && <RegionHeatmap stats={stats} />}
            </div>
            {stats && <ActivityTimeline events={mockEvents} />}
          </motion.div>
        )}

        {view === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(100vh-12rem)]"
          >
            <MapContainer issues={issues} onIssueClick={handleIssueClick} />
          </motion.div>
        )}

        {view === 'table' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DataTable data={issues} onRowClick={handleIssueClick} />
          </motion.div>
        )}

        {view === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stats && <IssueDistribution stats={stats} />}
              {stats && <RegionHeatmap stats={stats} />}
            </div>
            {stats && <ActivityTimeline events={mockEvents} />}
          </motion.div>
        )}

        {view === 'filters' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filtres</h2>
              <p className="text-gray-600 mb-6">
                Utilisez le panneau de filtres à droite pour affiner vos résultats de recherche.
              </p>
              <Button
                onClick={() => setFilterSidebarOpen(true)}
                variant="primary"
                leftIcon={<Filter size={18} />}
              >
                Ouvrir les filtres
              </Button>
            </div>
          </motion.div>
        )}

        {view === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Paramètres</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Langue
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Français</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Thème
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Clair</option>
                      <option>Sombre</option>
                      <option>Système</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Notifications par email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Alertes de nouveaux problèmes</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Sidebar */}
        <FilterSidebar isOpen={filterSidebarOpen} onClose={() => setFilterSidebarOpen(false)} />

        {/* Detail Panel */}
        <DetailPanel
          issue={selectedIssue}
          wikidataData={wikidataData}
          osmData={osmData}
          isOpen={!!selectedIssue}
          onClose={handleCloseDetail}
        />
      </div>
    </Layout>
  )
}

export default AppPage

