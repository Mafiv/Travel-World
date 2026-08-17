import { describe, expect, it } from 'vitest'
import {
  formatActivityList,
  formatHiddenCount,
  formatMoney,
  formatResultCount,
  formatStay,
  formatTripCount,
  titleCase,
} from './format'

describe('format helpers', () => {
  it('title-cases a budget or activity label', () => {
    expect(titleCase('modest')).toBe('Modest')
  })

  it('formats stay length in days except for a single night', () => {
    expect(formatStay(1)).toBe('1 night')
    expect(formatStay(4)).toBe('4 days')
  })

  it('joins activity names in readable English', () => {
    expect(formatActivityList(['food'])).toBe('Food')
    expect(formatActivityList(['food', 'hiking', 'culture'])).toBe(
      'Food, Hiking and Culture',
    )
  })

  it('describes trip and filter counts in full sentences', () => {
    expect(formatTripCount(1)).toBe('1 destination in your trip')
    expect(formatTripCount(3)).toBe('3 destinations in your trip')
    expect(formatResultCount(0)).toBe('0 destinations match your filters.')
    expect(formatResultCount(1)).toBe('1 destination matches your filters.')
    expect(formatHiddenCount(0)).toBe('')
    expect(formatHiddenCount(1)).toBe(
      '1 selected destination is hidden by the current filters.',
    )
    expect(formatHiddenCount(2)).toBe(
      '2 selected destinations are hidden by the current filters.',
    )
  })

  it('formats a local-currency daily band', () => {
    expect(formatMoney({ amount: 24000, currency: 'JPY' })).toBe('JPY 24,000')
  })
})
