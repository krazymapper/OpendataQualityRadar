import type { Issue } from '@/types'

/**
 * Exports sûrs (sans dépendance au DOM, testés dans tests/exporters.test.ts).
 * - CSV : séparateur « ; », BOM UTF-8, guillemets RFC 4180, protection contre
 *   l'injection de formules (=, +, -, @).
 * - XML : échappement des caractères spéciaux.
 * L'ancien export QuickStatements a été retiré : il produisait des
 * déclarations « Qxxx|P1|"…" » sur de vrais éléments Wikidata à partir de
 * données fictives (voir CHANGELOG).
 */

export function csvCell(value: unknown): string {
  let s = value === null || value === undefined ? '' : String(value)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCSV(data: Issue[]): string {
  const headers = ['ID', 'Type', 'Sévérité', 'Confiance', 'Description', 'Date']
  const rows = data.map((issue) => [
    issue.id,
    issue.type,
    issue.severity,
    String(issue.confidence),
    issue.description,
    issue.detectedAt instanceof Date ? issue.detectedAt.toISOString() : String(issue.detectedAt ?? ''),
  ])
  return '﻿' + [headers, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n') + '\r\n'
}

export function xmlEscape(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function toXML(data: Issue[]): string {
  const items = data.map((issue) => `  <issue id="${xmlEscape(issue.id)}">
    <type>${xmlEscape(issue.type)}</type>
    <severity>${xmlEscape(issue.severity)}</severity>
    <confidence>${xmlEscape(issue.confidence)}</confidence>
    <description>${xmlEscape(issue.description)}</description>
    <detectedAt>${xmlEscape(issue.detectedAt instanceof Date ? issue.detectedAt.toISOString() : issue.detectedAt)}</detectedAt>
  </issue>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<issues>\n${items.join('\n')}\n</issues>\n`
}

export const MIME: Record<'csv' | 'json' | 'xml', string> = {
  csv: 'text/csv;charset=utf-8',
  json: 'application/json;charset=utf-8',
  xml: 'application/xml;charset=utf-8',
}

/** Clé de cache stable pour une requête, compatible Unicode (btoa échoue hors Latin-1). */
export function cacheKey(prefix: string, query: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < query.length; i++) {
    h ^= query.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return `${prefix}:${query.length}:${h.toString(16)}`
}
