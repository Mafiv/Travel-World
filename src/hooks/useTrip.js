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

export default function useTrip() {
  const [trip, setTrip] = useState(() => loadTrip())

  useEffect(() => {
    saveTrip(trip)
  }, [trip])

  const selectedIds = useMemo(() => new Set(trip.destinationIds), [trip.destinationIds])

  const items = useMemo(
    () =>
      trip.destinationIds
        .map((id) => DESTINATIONS.find((destination) => destination.id === id))
        .filter(Boolean),
    [trip.destinationIds],
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

  const clear = useCallback(() => {
    setTrip({ name: '', notes: '', destinationIds: [] })
  }, [])

  return {
    trip,
    items,
    selectedIds,
    toggle,
    remove,
    moveUp,
    moveDown,
    setName,
    setNotes,
    clear,
  }
}
