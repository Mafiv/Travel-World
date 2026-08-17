import { useCallback, useMemo, useState } from 'react'

const EMPTY_FILTERS = {
  query: '',
  region: 'all',
  budget: 'all',
  activity: 'all',
}

export default function useFilters() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const updateFilters = useCallback((next) => {
    setFilters((current) => ({ ...current, ...next }))
  }, [])

  const setQuery = useCallback((query) => {
    setFilters((current) => ({ ...current, query }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS)
  }, [])

  return useMemo(
    () => ({
      filters,
      setQuery,
      updateFilters,
      resetFilters,
    }),
    [filters, setQuery, updateFilters, resetFilters],
  )
}
