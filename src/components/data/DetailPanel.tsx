import React from 'react'
import { X, ExternalLink, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { formatDateTime } from '@/lib/utils/formatters'
import { SEVERITY_LABELS, SEVERITY_COLORS } from '@/lib/constants/config'
import type { Issue, WikidataEntity, OSMEntity } from '@/types'

export interface DetailPanelProps {
  issue: Issue | null
  wikidataData?: WikidataEntity | null
  osmData?: OSMEntity | null
  isOpen: boolean
  onClose: () => void
}

/**
 * Detail panel component showing issue details with Wikidata and OSM data
 */
export const DetailPanel: React.FC<DetailPanelProps> = ({
  issue,
  wikidataData,
  osmData,
  isOpen,
  onClose,
}) => {
  if (!issue) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold text-gray-900">Détails du problème</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close panel"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Issue Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Informations</CardTitle>
                      <Badge variant={SEVERITY_COLORS[issue.severity] as any}>
                        {SEVERITY_LABELS[issue.severity]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Type</label>
                      <p className="text-sm text-gray-900">{issue.type}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Description</label>
                      <p className="text-sm text-gray-900">{issue.description}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Confiance</label>
                      <p className="text-sm text-gray-900">{issue.confidence}%</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Détecté le</label>
                      <p className="text-sm text-gray-900">{formatDateTime(issue.detectedAt)}</p>
                    </div>
                    {issue.suggestion && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">Suggestion</label>
                        <p className="text-sm text-gray-900">{issue.suggestion}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin size={18} />
                      Localisation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Latitude:</span>
                        <span className="text-gray-900 font-mono">{issue.coordinates.lat}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Longitude:</span>
                        <span className="text-gray-900 font-mono">{issue.coordinates.lng}</span>
                      </div>
                      {issue.region && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Région:</span>
                          <span className="text-gray-900">{issue.region}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Wikidata Data */}
                {wikidataData && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Wikidata</CardTitle>
                        {issue.wikidataId && (
                          <a
                            href={`https://www.wikidata.org/wiki/${issue.wikidataId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Label</label>
                        <p className="text-sm text-gray-900">{wikidataData.label}</p>
                      </div>
                      {wikidataData.description && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">Description</label>
                          <p className="text-sm text-gray-900">{wikidataData.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* OSM Data */}
                {osmData && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>OpenStreetMap</CardTitle>
                        {issue.osmId && (
                          <a
                            href={`https://www.openstreetmap.org/${issue.osmId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Type</label>
                        <p className="text-sm text-gray-900">{osmData.type}</p>
                      </div>
                      {Object.keys(osmData.tags).length > 0 && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">Tags</label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {Object.entries(osmData.tags).map(([key, value]) => (
                              <Badge key={key} variant="default" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 flex gap-2">
                <Button variant="primary" className="flex-1">
                  Corriger
                </Button>
                <Button variant="outline" className="flex-1">
                  Ignorer
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

