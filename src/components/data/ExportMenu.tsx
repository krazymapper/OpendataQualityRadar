import React, { useState } from 'react'
import { Download, FileText, Code, Database, Copy, Check } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Select } from '../ui/select'
import { useToast } from '../feedback/ToastProvider'
import type { Issue, ExportFormat } from '@/types'
import { toCSV, toXML, MIME } from '@/lib/utils/exporters'

export interface ExportMenuProps {
  issues: Issue[]
  selectedIssues?: Issue[]
  onExport?: (format: ExportFormat, data: Issue[]) => void
}

/**
 * Export menu component for exporting data in various formats
 */
export const ExportMenu: React.FC<ExportMenuProps> = ({
  issues,
  selectedIssues,
  onExport,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [format, setFormat] = useState<ExportFormat>('csv')
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const dataToExport = selectedIssues && selectedIssues.length > 0 ? selectedIssues : issues

  const formatOptions = [
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
  ]

  const formatIcons = {
    csv: FileText,
    json: Code,
    xml: Database,
  }

  const exportData = () => {
    if (onExport) {
      onExport(format, dataToExport)
    } else {
      // Default export implementation
      const content = generateExportContent(format, dataToExport)
      downloadFile(content, format)
    }
    showToast({ type: 'success', message: 'Export réussi!' })
    setIsOpen(false)
  }

  const generateExportContent = (format: ExportFormat, data: Issue[]): string => {
    switch (format) {
      case 'csv':
        return toCSV(data)
      case 'json':
        return JSON.stringify(data, null, 2)
      case 'xml':
        return toXML(data)
      default:
        return ''
    }
  }

  const downloadFile = (content: string, format: ExportFormat) => {
    const blob = new Blob([content], { type: MIME[format] })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `issues.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    const content = generateExportContent(format, dataToExport)
    navigator.clipboard.writeText(content)
    setCopied(true)
    showToast({ type: 'success', message: 'Copié dans le presse-papiers!' })
    setTimeout(() => setCopied(false), 2000)
  }

  const Icon = formatIcons[format]

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" leftIcon={<Download size={18} />}>
        Exporter
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Exporter les données"
        description={`Exporter ${dataToExport.length} problème(s) dans le format sélectionné`}
        size="md"
      >
        <div className="space-y-4">
          <Select
            options={formatOptions}
            value={format}
            onChange={(value) => setFormat(value as ExportFormat)}
            placeholder="Sélectionner un format"
          />

          <div className="flex items-center gap-2">
            <Button onClick={exportData} variant="primary" className="flex-1" leftIcon={<Icon size={18} />}>
              Télécharger
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              leftIcon={copied ? <Check size={18} /> : <Copy size={18} />}
            >
              {copied ? 'Copié!' : 'Copier'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

