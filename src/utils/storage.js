const STORAGE_KEY = 'travel-world.trip.v1'

export function loadTrip() {
  if (typeof window === 'undefined') {
    return { name: '', notes: '', destinationIds: [] }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { name: '', notes: '', destinationIds: [] }
    }

    const parsed = JSON.parse(raw)
    const destinationIds = Array.isArray(parsed.destinationIds)
      ? parsed.destinationIds.filter((id) => typeof id === 'string')
      : []

    return {
      name: typeof parsed.name === 'string' ? parsed.name : '',
      notes: typeof parsed.notes === 'string' ? parsed.notes : '',
      destinationIds,
    }
  } catch {
    return { name: '', notes: '', destinationIds: [] }
  }
}

export function saveTrip(trip) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      name: trip.name ?? '',
      notes: trip.notes ?? '',
      destinationIds: trip.destinationIds ?? [],
    }),
  )
}

export function clearStoredTrip() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
