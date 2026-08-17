import { useCallback, useEffect, useMemo, useState } from 'react'
import { DESTINATIONS } from '../data/destinations'
import { loadTrip, saveTrip } from '../utils/storage'

function moveId(ids, id, offset) {
  const index = ids.indexOf(id)
  if (index < 0) {
    return ids
  }

  const nextIndex = index + offset
  if (nextIndex < 0 || nextIndex >= ids.length) {
    return ids
  }

  const next = [...ids]
  const [item] = next.splice(index, 1)
  next.splice(nextIndex, 0, item)
  return next
}

function createEntry(draft, items) {
  const place = items.find((item) => item.id === draft.destinationId)
  return {
    id: `journal-${Date.now()}`,
    title: draft.title.trim(),
    body: draft.body.trim(),
    destinationId: draft.destinationId,
    placeLabel: place ? place.name : 'General',
    createdAt: new Date().toISOString().slice(0, 10),
  }
}

export default function useTrip() {
  const [trip, setTrip] = useState(() => loadTrip())

  useEffect(() => {
    saveTrip(trip)
  }, [trip])

  const selectedIds = useMemo(() => new Set(trip.destinationIds), [trip.destinationIds])
  const compareIds = useMemo(() => new Set(trip.compareIds), [trip.compareIds])
  const packingChecked = useMemo(() => new Set(trip.packingChecked), [trip.packingChecked])

  const items = useMemo(
    () =>
      trip.destinationIds
        .map((id) => DESTINATIONS.find((destination) => destination.id === id))
        .filter(Boolean),
    [trip.destinationIds],
  )

  const compareItems = useMemo(
    () =>
      trip.compareIds
        .map((id) => DESTINATIONS.find((destination) => destination.id === id))
        .filter(Boolean),
    [trip.compareIds],
  )

  const toggle = useCallback((id) => {
    setTrip((current) => {
      const exists = current.destinationIds.includes(id)
      return {
        ...current,
        destinationIds: exists
          ? current.destinationIds.filter((item) => item !== id)
          : [...current.destinationIds, id],
      }
    })
  }, [])

  const remove = useCallback((id) => {
    setTrip((current) => ({
      ...current,
      destinationIds: current.destinationIds.filter((item) => item !== id),
    }))
  }, [])

  const moveUp = useCallback((id) => {
    setTrip((current) => ({
      ...current,
      destinationIds: moveId(current.destinationIds, id, -1),
    }))
  }, [])

  const moveDown = useCallback((id) => {
    setTrip((current) => ({
      ...current,
      destinationIds: moveId(current.destinationIds, id, 1),
    }))
  }, [])

  const setName = useCallback((name) => {
    setTrip((current) => ({ ...current, name }))
  }, [])

  const setNotes = useCallback((notes) => {
    setTrip((current) => ({ ...current, notes }))
  }, [])

  const toggleCompare = useCallback((id) => {
    setTrip((current) => {
      const exists = current.compareIds.includes(id)
      if (exists) {
        return {
          ...current,
          compareIds: current.compareIds.filter((item) => item !== id),
        }
      }
      if (current.compareIds.length >= 3) {
        return current
      }
      return { ...current, compareIds: [...current.compareIds, id] }
    })
  }, [])

  const removeCompare = useCallback((id) => {
    setTrip((current) => ({
      ...current,
      compareIds: current.compareIds.filter((item) => item !== id),
    }))
  }, [])

  const togglePacked = useCallback((item) => {
    setTrip((current) => {
      const exists = current.packingChecked.includes(item)
      return {
        ...current,
        packingChecked: exists
          ? current.packingChecked.filter((entry) => entry !== item)
          : [...current.packingChecked, item],
      }
    })
  }, [])

  const addJournal = useCallback((draft) => {
    setTrip((current) => {
      const itemsNow = current.destinationIds
        .map((id) => DESTINATIONS.find((destination) => destination.id === id))
        .filter(Boolean)
      return {
        ...current,
        journal: [createEntry(draft, itemsNow), ...current.journal],
      }
    })
  }, [])

  const deleteJournal = useCallback((id) => {
    setTrip((current) => ({
      ...current,
      journal: current.journal.filter((entry) => entry.id !== id),
    }))
  }, [])

  const clear = useCallback(() => {
    setTrip({
      name: '',
      notes: '',
      destinationIds: [],
      journal: [],
      packingChecked: [],
      compareIds: [],
    })
  }, [])

  return {
    trip,
    items,
    compareItems,
    selectedIds,
    compareIds,
    packingChecked,
    toggle,
    remove,
    moveUp,
    moveDown,
    setName,
    setNotes,
    toggleCompare,
    removeCompare,
    togglePacked,
    addJournal,
    deleteJournal,
    clear,
  }
}
