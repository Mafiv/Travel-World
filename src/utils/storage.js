const STORAGE_KEY = 'travel-world.trip.v1'

export function emptyTrip() {
  return {
    name: '',
    notes: '',
    destinationIds: [],
    journal: [],
    packingChecked: [],
    compareIds: [],
  }
}

function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []
}

function asJournal(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((entry) => entry && typeof entry === 'object')
    .map((entry) => ({
      id: typeof entry.id === 'string' ? entry.id : `journal-${Math.random()}`,
      title: typeof entry.title === 'string' ? entry.title : '',
      body: typeof entry.body === 'string' ? entry.body : '',
      destinationId: typeof entry.destinationId === 'string' ? entry.destinationId : '',
      placeLabel: typeof entry.placeLabel === 'string' ? entry.placeLabel : 'General',
      createdAt: typeof entry.createdAt === 'string' ? entry.createdAt : '',
    }))
}

export function loadTrip() {
  if (typeof window === 'undefined') {
    return emptyTrip()
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return emptyTrip()
    }

    const parsed = JSON.parse(raw)
    return {
      name: typeof parsed.name === 'string' ? parsed.name : '',
      notes: typeof parsed.notes === 'string' ? parsed.notes : '',
      destinationIds: asStringArray(parsed.destinationIds),
      journal: asJournal(parsed.journal),
      packingChecked: asStringArray(parsed.packingChecked),
      compareIds: asStringArray(parsed.compareIds),
    }
  } catch {
    return emptyTrip()
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
      journal: trip.journal ?? [],
      packingChecked: trip.packingChecked ?? [],
      compareIds: trip.compareIds ?? [],
    }),
  )
}

export function clearStoredTrip() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
