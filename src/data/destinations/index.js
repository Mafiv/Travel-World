import { AFRICA_DESTINATIONS } from './africa.js'
import { AMERICAS_DESTINATIONS } from './americas.js'
import { ASIA_DESTINATIONS } from './asia.js'
import { EUROPE_DESTINATIONS } from './europe.js'
import { OCEANIA_DESTINATIONS } from './oceania.js'

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export const BUDGETS = ['modest', 'comfortable', 'luxury']

export const ACTIVITIES = [
  'beach',
  'city',
  'culture',
  'food',
  'hiking',
  'wildlife',
]

export const CLIMATES = [
  'arid',
  'mediterranean',
  'monsoon',
  'oceanic',
  'alpine',
  'tropical',
  'continental',
  'subarctic',
  'savanna',
]

export const DESTINATIONS = [
  ...AFRICA_DESTINATIONS,
  ...AMERICAS_DESTINATIONS,
  ...ASIA_DESTINATIONS,
  ...EUROPE_DESTINATIONS,
  ...OCEANIA_DESTINATIONS,
]

export function getDestination(id) {
  return DESTINATIONS.find((destination) => destination.id === id) ?? null
}

export function destinationsByRegion(region) {
  return DESTINATIONS.filter((destination) => destination.region === region)
}
