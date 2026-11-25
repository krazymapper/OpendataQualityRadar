import { test } from 'node:test'
import assert from 'node:assert/strict'
import { csvCell, toCSV, toXML, xmlEscape, cacheKey } from '../src/lib/utils/exporters.ts'

const issue = (over: Record<string, unknown> = {}) => ({
  id: 'issue-1', type: 'missing_property', severity: 'high', confidence: 80,
  description: 'Commune « Abomey » ; nom, population', detectedAt: new Date('2025-01-02T03:04:05Z'),
  coordinates: { lat: 7.18, lng: 1.99 }, region: 'Zou', metadata: {}, ...over,
}) as any

test('CSV : BOM, point-virgule, champs entre guillemets si nécessaire', () => {
  const csv = toCSV([issue()])
  assert.ok(csv.startsWith('﻿ID;Type;'))
  assert.match(csv, /"Commune « Abomey » ; nom, population"/)
  assert.equal(csv.trim().split('\r\n').length, 2)
})

test('CSV : protection contre l’injection de formules', () => {
  for (const v of ['=HYPERLINK("http://x")', '+1', '-1', '@SUM(A1)']) assert.ok(csvCell(v).replace(/^"/, '').startsWith("'"), v)
  assert.equal(csvCell('dit "oui"'), '"dit ""oui"""')
})

test('XML : caractères spéciaux échappés, document bien formé', () => {
  const xml = toXML([issue({ description: '<script>&"\'</script>', id: 'a"b' })])
  assert.ok(!xml.includes('<script>'))
  assert.match(xml, /&lt;script&gt;&amp;&quot;&apos;&lt;\/script&gt;/)
  assert.match(xml, /id="a&quot;b"/)
  assert.equal(xmlEscape(null), '')
})

test('clé de cache : Unicode accepté (btoa échouait), stable et discriminante', () => {
  const q = '[out:json];node["name"="Cotonou — Ganvié"];out;'
  assert.equal(cacheKey('overpass', q), cacheKey('overpass', q))
  assert.notEqual(cacheKey('overpass', q), cacheKey('overpass', q + ' '))
})
