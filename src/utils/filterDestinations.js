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

export function matchesClimate(destination, climate) {
  return climate === 'all' || destination.climate === climate
}

export function matchesMonth(destination, month) {
  return month === 'all' || (destination.bestMonths ?? []).includes(month)
}

const BUDGET_RANK = {
  modest: 0,
  comfortable: 1,
  luxury: 2,
}

export function sortDestinations(destinations, sort) {
  const next = [...destinations]
  if (sort === 'name') {
    next.sort((left, right) => left.name.localeCompare(right.name))
  } else if (sort === 'stay') {
    next.sort((left, right) => left.stayDays - right.stayDays)
  } else if (sort === 'budget') {
    next.sort((left, right) => BUDGET_RANK[left.budget] - BUDGET_RANK[right.budget])
  } else if (sort === 'region') {
    next.sort(
      (left, right) =>
        left.region.localeCompare(right.region) || left.name.localeCompare(right.name),
    )
  }
  return next
}

export function filterDestinations(destinations, filters) {
  const {
    query = '',
    region = 'all',
    budget = 'all',
    activity = 'all',
    climate = 'all',
    month = 'all',
    sort = 'featured',
  } = filters

  const visible = destinations.filter(
    (destination) =>
      matchesQuery(destination, query) &&
      matchesRegion(destination, region) &&
      matchesBudget(destination, budget) &&
      matchesActivity(destination, activity) &&
      matchesClimate(destination, climate) &&
      matchesMonth(destination, month),
  )

  return sortDestinations(visible, sort)
}

export function countHiddenSelected(selectedIds, visibleDestinations) {
  const visibleIds = new Set(visibleDestinations.map((destination) => destination.id))
  return selectedIds.filter((id) => !visibleIds.has(id)).length
}
