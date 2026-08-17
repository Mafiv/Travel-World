import { beforeEach, describe, expect, it } from 'vitest'
import { clearStoredTrip, loadTrip, saveTrip } from './storage'

describe('trip storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns an empty trip when nothing has been saved', () => {
    expect(loadTrip()).toEqual({ name: '', notes: '', destinationIds: [] })
  })

  it('round-trips a trip name, notes, and destination ids', () => {
    saveTrip({
      name: 'Andes loop',
      notes: 'Arrive a day early',
      destinationIds: ['cusco', 'oaxaca'],
    })

    expect(loadTrip()).toEqual({
      name: 'Andes loop',
      notes: 'Arrive a day early',
      destinationIds: ['cusco', 'oaxaca'],
    })
  })

  it('ignores invalid stored JSON instead of throwing', () => {
    window.localStorage.setItem('travel-world.trip.v1', '{not-json')
    expect(loadTrip()).toEqual({ name: '', notes: '', destinationIds: [] })
  })

  it('clears a saved trip', () => {
    saveTrip({ name: 'Keep', notes: '', destinationIds: ['kyoto'] })
    clearStoredTrip()
    expect(loadTrip()).toEqual({ name: '', notes: '', destinationIds: [] })
  })
})
