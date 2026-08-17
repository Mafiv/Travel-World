import { describe, expect, it } from 'vitest'
import { DESTINATIONS } from '../data/destinations'
import {
  countHiddenSelected,
  filterDestinations,
} from './filterDestinations'

describe('filterDestinations', () => {
  it('returns the full catalog when no filters are set', () => {
    expect(
      filterDestinations(DESTINATIONS, {
        query: '',
        region: 'all',
        budget: 'all',
        activity: 'all',
      }),
    ).toHaveLength(DESTINATIONS.length)
  })

  it('matches a destination name regardless of letter case', () => {
    const results = filterDestinations(DESTINATIONS, { query: 'kYoTo' })
    expect(results.map((destination) => destination.id)).toEqual(['kyoto'])
  })

  it('can combine region, budget, and activity filters', () => {
    const results = filterDestinations(DESTINATIONS, {
      region: 'Asia',
      budget: 'modest',
      activity: 'food',
    })

    expect(results.every((destination) => destination.region === 'Asia')).toBe(true)
    expect(results.every((destination) => destination.budget === 'modest')).toBe(true)
    expect(results.every((destination) => destination.activities.includes('food'))).toBe(
      true,
    )
    expect(results.map((destination) => destination.id).sort()).toEqual([
      'chiang-mai',
      'hanoi',
    ])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterDestinations(DESTINATIONS, { query: 'not-a-place' })).toEqual([])
  })
})

describe('countHiddenSelected', () => {
  it('counts selected destinations that are missing from the visible list', () => {
    const visible = DESTINATIONS.filter((destination) => destination.region === 'Europe')
    expect(countHiddenSelected(['kyoto', 'lisbon', 'hanoi'], visible)).toBe(2)
  })

  it('returns zero when every selected destination is still visible', () => {
    const visible = DESTINATIONS.filter((destination) => destination.region === 'Europe')
    expect(countHiddenSelected(['lisbon', 'ljubljana'], visible)).toBe(0)
  })
})
