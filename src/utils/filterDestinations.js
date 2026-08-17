export function normalizeQuery(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
}

export function matchesQuery(destination, query) {
  const needle = normalizeQuery(query)
  if (!needle) {
    return true
  }

  const haystack = [destination.name, destination.country, destination.blurb]
    .join(' ')
    .toLowerCase()

  return haystack.includes(needle)
}

export function matchesRegion(destination, region) {
  return region === 'all' || destination.region === region
}

export function matchesBudget(destination, budget) {
  return budget === 'all' || destination.budget === budget
}

export function matchesActivity(destination, activity) {
  return activity === 'all' || destination.activities.includes(activity)
}

export function filterDestinations(destinations, filters) {
  const { query = '', region = 'all', budget = 'all', activity = 'all' } = filters

  return destinations.filter(
    (destination) =>
      matchesQuery(destination, query) &&
      matchesRegion(destination, region) &&
      matchesBudget(destination, budget) &&
      matchesActivity(destination, activity),
  )
}

export function countHiddenSelected(selectedIds, visibleDestinations) {
  const visibleIds = new Set(visibleDestinations.map((destination) => destination.id))
  return selectedIds.filter((id) => !visibleIds.has(id)).length
}
