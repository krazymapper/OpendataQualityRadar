import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ISSUE_TYPE_LABELS } from '@/lib/constants/config'
import type { DashboardStats } from '@/types'

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899']

export interface IssueDistributionProps {
  stats: DashboardStats
}

/**
 * Issue distribution pie chart component
 */
export const IssueDistribution: React.FC<IssueDistributionProps> = ({ stats }) => {
  const data = Object.entries(stats.issueDistribution).map(([type, count]) => ({
    name: ISSUE_TYPE_LABELS[type] || type,
    value: count,
    type,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des problèmes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

