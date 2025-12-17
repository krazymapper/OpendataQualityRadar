import { create } from 'zustand'
import type { Issue, FilterState, DashboardStats } from '@/types'

interface IssueStore {
  // State
  issues: Issue[]
  selectedIssues: string[]
  filters: FilterState
  stats: DashboardStats | null
  isLoading: boolean
  error: string | null

  // Actions
  setIssues: (issues: Issue[]) => void
  addIssue: (issue: Issue) => void
  updateIssue: (id: string, updates: Partial<Issue>) => void
  removeIssue: (id: string) => void
  toggleIssueSelection: (id: string) => void
  selectAllIssues: () => void
  clearSelection: () => void
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
  setStats: (stats: DashboardStats | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const defaultFilters: FilterState = {
  searchQuery: '',
  issueTypes: [],
  severities: [],
  confidenceMin: 0,
}

export const useIssueStore = create<IssueStore>((set) => ({
  // Initial state
  issues: [],
  selectedIssues: [],
  filters: defaultFilters,
  stats: null,
  isLoading: false,
  error: null,

  // Actions
  setIssues: (issues) => set({ issues }),
  addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
  updateIssue: (id, updates) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id ? { ...issue, ...updates } : issue
      ),
    })),
  removeIssue: (id) =>
    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id),
      selectedIssues: state.selectedIssues.filter((selectedId) => selectedId !== id),
    })),
  toggleIssueSelection: (id) =>
    set((state) => ({
      selectedIssues: state.selectedIssues.includes(id)
        ? state.selectedIssues.filter((selectedId) => selectedId !== id)
        : [...state.selectedIssues, id],
    })),
  selectAllIssues: () =>
    set((state) => ({
      selectedIssues: state.issues.map((issue) => issue.id),
    })),
  clearSelection: () => set({ selectedIssues: [] }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  setStats: (stats) => set({ stats }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))

