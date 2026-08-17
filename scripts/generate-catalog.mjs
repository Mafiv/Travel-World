import { writeFileSync, mkdirSync } from 'node:fs'
import { africa } from './seeds-africa.mjs'
import { asia } from './seeds-asia.mjs'
import { europe } from './seeds-europe.mjs'
import { americas } from './seeds-americas.mjs'
import { oceania } from './seeds-oceania.mjs'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function hashString(value) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

function paletteFor(id, climate) {
  const hash = hashString(id)
  const hueBase = {
    arid: 28,
    mediterranean: 200,
    monsoon: 150,
    oceanic: 210,
    alpine: 170,
    tropical: 175,
    continental: 15,
    subarctic: 220,
    savanna: 40,
  }
  const hue = (hueBase[climate] + (hash % 24) - 12 + 360) % 360
  return {
    hue,
    sky: `hsl(${hue}, 42%, 64%)`,
    land: `hsl(${(hue + 28) % 360}, 38%, 36%)`,
    accent: `hsl(${(hue + 310) % 360}, 48%, 42%)`,
    paper: `hsl(${(hue + 40) % 360}, 36%, 86%)`,
    pattern: ['dunes', 'grid', 'waves', 'pines', 'terraces', 'arch'][hash % 6],
  }
}

function money(amount, currency) {
  return { amount, currency, label: `${currency} ${amount}` }
}

const CLIMATE_ARC = {
  arid: {
    January: { crowd: 'low', weather: 'cool and bright', advice: 'Walk medinas and desert edges in full-day comfort.', local: 'nights can nip, so keep a warm layer for rooftops' },
    February: { crowd: 'low', weather: 'cool, rare showers', advice: 'A quiet window for ruins and camps.', local: 'almond and citrus scent the lanes after any rain' },
    March: { crowd: 'medium', weather: 'warming fast', advice: 'Start at dawn; shade matters by lunch.', local: 'spring markets fill with herbs and tourists together' },
    April: { crowd: 'medium', weather: 'hot middays', advice: 'Split the day around a long indoor rest.', local: 'riads and museums become the afternoon plan' },
    May: { crowd: 'medium', weather: 'hot and dry', advice: 'Short outdoor bursts only.', local: 'evenings on terraces stay the best hours' },
    June: { crowd: 'low', weather: 'severe heat', advice: 'Avoid exposed ruins at noon.', local: 'locals move into courtyards and night markets' },
    July: { crowd: 'low', weather: 'extreme heat', advice: 'Treat this as a specialist month.', local: 'air-conditioned rooms are not a luxury, they are the plan' },
    August: { crowd: 'low', weather: 'extreme heat', advice: 'Night walks and very early starts only.', local: 'dust and glare are the main fatigue sources' },
    September: { crowd: 'medium', weather: 'heat easing', advice: 'Late month becomes walkable again after sunset.', local: 'dates and harvests show up in markets' },
    October: { crowd: 'high', weather: 'warm days, cool nights', advice: 'A second high season for souks and camps.', local: 'book popular lodgings before weekends' },
    November: { crowd: 'medium', weather: 'mild and clear', advice: 'Long walking days return.', local: 'mountain day trips feel humane again' },
    December: { crowd: 'medium', weather: 'cool and festive', advice: 'Excellent walking weather with short days.', local: 'holiday lights and cooler nights suit city stays' },
  },
  mediterranean: {
    January: { crowd: 'low', weather: 'cool and wet', advice: 'Lean on museums and food halls.', local: 'coastal walks still work between fronts' },
    February: { crowd: 'low', weather: 'winter-wet', advice: 'Empty monuments are the payoff.', local: 'almond blossom appears in the countryside' },
    March: { crowd: 'medium', weather: 'mild spring', advice: 'City-plus-countryside trips shine.', local: 'wildflowers and longer tables outdoors' },
    April: { crowd: 'high', weather: 'mild and green', advice: 'One of the best walking months.', local: 'holiday weeks spike prices overnight' },
    May: { crowd: 'high', weather: 'warm evenings', advice: 'Beaches open while interiors stay pleasant.', local: 'late dinners become the default' },
    June: { crowd: 'high', weather: 'dry heat', advice: 'Start early and eat late.', local: 'stone streets radiate heat after 4pm' },
    July: { crowd: 'high', weather: 'peak heat', advice: 'Use early trains and mountain villages.', local: 'famous lanes clog from late morning' },
    August: { crowd: 'high', weather: 'hottest', advice: 'Book lodging far ahead.', local: 'many family businesses pause mid-month' },
    September: { crowd: 'high', weather: 'warm sea, softer air', advice: 'Excellent all-round month.', local: 'harvest menus appear inland' },
    October: { crowd: 'medium', weather: 'vintage light', advice: 'Fewer groups, still terrace weather.', local: 'pack a layer for evenings' },
    November: { crowd: 'low', weather: 'rain returning', advice: 'Food-focused city breaks work well.', local: 'grey afternoons are normal, not a failure' },
    December: { crowd: 'medium', weather: 'mild cold', advice: 'Festive markets without deep freeze.', local: 'short days, long meals' },
  },
  monsoon: {
    January: { crowd: 'high', weather: 'dry and bright', advice: 'Classic window for temples and treks.', local: 'sleepers and festival dates book out' },
    February: { crowd: 'high', weather: 'dry', advice: 'Still peak dry season.', local: 'smoke can sit in some valleys' },
    March: { crowd: 'medium', weather: 'heat building', advice: 'Dawn starts, indoor middays.', local: 'mango season brightens markets' },
    April: { crowd: 'medium', weather: 'hottest pre-monsoon', advice: 'Water festivals and strong AC matter.', local: 'late-day storms may tease the rains' },
    May: { crowd: 'low', weather: 'first storms', advice: 'Landscapes green and crowds thin.', local: 'humidity jumps overnight' },
    June: { crowd: 'low', weather: 'rainy season', advice: 'Stay flexible and waterproof bags.', local: 'motorbikes still run, just slower' },
    July: { crowd: 'low', weather: 'heavy showers', advice: 'Cities remain very usable.', local: 'some rural roads flood for hours, not days' },
    August: { crowd: 'low', weather: 'lush', advice: 'Waterfalls and rice terraces peak.', local: 'leeches on muddy trails are a real packing issue' },
    September: { crowd: 'low', weather: 'rains easing', advice: 'A value month with muddy trails.', local: 'light returns in longer morning windows' },
    October: { crowd: 'medium', weather: 'clearing', advice: 'Festivals and clearer skies return.', local: 'a favorite month for photographers' },
    November: { crowd: 'high', weather: 'dry season begins', advice: 'Comfortable nights, rising demand.', local: 'book the popular old towns early' },
    December: { crowd: 'high', weather: 'peak dry', advice: 'Book lodgings and sleepers ahead.', local: 'holiday weeks are a different animal from early December' },
  },
  oceanic: {
    January: { crowd: 'medium', weather: 'seasonal extreme by hemisphere', advice: 'Pack layers and expect mixed skies.', local: 'harbor wind is colder than the forecast' },
    February: { crowd: 'medium', weather: 'unsettled', advice: 'Museums plus bursts of walking light.', local: 'dramatic skies reward short-notice viewpoint walks' },
    March: { crowd: 'medium', weather: 'longer days', advice: 'Gardens and harbors feel generous.', local: 'showers still arrive sideways' },
    April: { crowd: 'medium', weather: 'showers and bloom', advice: 'A shell beats a heavy coat.', local: 'green hills look their best' },
    May: { crowd: 'high', weather: 'kind and long-lit', advice: 'One of the gentlest months.', local: 'evenings stretch into waterfront dinners' },
    June: { crowd: 'high', weather: 'busy coasts', advice: 'Book ferries; bring a sweater for wind.', local: 'famous trails need early starts' },
    July: { crowd: 'high', weather: 'warmest, rarely tropical', advice: 'Crowds concentrate on waterfronts.', local: 'still pack a layer for night buses' },
    August: { crowd: 'high', weather: 'best chance of consecutive clear days', advice: 'Festival month in many towns.', local: 'full hotels, better late-light photography' },
    September: { crowd: 'medium', weather: 'quieter trails', advice: 'Harvest food and lingering sea warmth.', local: 'a sweet spot for independent travelers' },
    October: { crowd: 'low', weather: 'storms returning', advice: 'Cozy cities beat exposed ridges.', local: 'cafes become the afternoon plan' },
    November: { crowd: 'low', weather: 'low light, wet pavements', advice: 'Off-season rates appear.', local: 'bring a real waterproof, not a fashion shell' },
    December: { crowd: 'medium', weather: 'short days', advice: 'Festive interiors, closed high roads.', local: 'plan outdoor hopes for the brightest two hours' },
  },
  alpine: {
    January: { crowd: 'high', weather: 'deep winter', advice: 'Ski towns thrive; rest on arrival for altitude.', local: 'drink more water than you think' },
    February: { crowd: 'high', weather: 'bright cold', advice: 'Winter sports without the darkest mornings.', local: 'sun-on-snow glare is intense' },
    March: { crowd: 'medium', weather: 'spring snowpack', advice: 'Valleys green while peaks stay white.', local: 'boot-ski transition week by week' },
    April: { crowd: 'low', weather: 'mud and melt', advice: 'Cities below the snowline shine.', local: 'some huts and passes stay shut' },
    May: { crowd: 'medium', weather: 'waterfall peak', advice: 'Lower trails open.', local: 'high routes may still hold snow bridges' },
    June: { crowd: 'high', weather: 'hiking begins', advice: 'Wildflowers and lingering cornices.', local: 'start early to dodge afternoon build-up' },
    July: { crowd: 'high', weather: 'prime trekking', advice: 'Book huts and dawn starts.', local: 'storms often arrive on a timetable' },
    August: { crowd: 'high', weather: 'busy famous trails', advice: 'Choose shoulder routes.', local: 'afternoon thunder is a planning constraint' },
    September: { crowd: 'medium', weather: 'gold grass, first high snows', advice: 'Outstanding quieter month.', local: 'nights turn sharp quickly' },
    October: { crowd: 'low', weather: 'clear then sudden winter', advice: 'Valley walks remain superb.', local: 'high passes close without much warning' },
    November: { crowd: 'low', weather: 'between seasons', advice: 'Good for towns, not passes.', local: 'a contemplative, cheap month' },
    December: { crowd: 'high', weather: 'snow returning', advice: 'Holiday weeks fill lodges.', local: 'midweeks stay calmer than the festive sandwich' },
  },
  tropical: {
    January: { crowd: 'high', weather: 'wet or cyclone-aware', advice: 'Swimmable, with buffer days around boats.', local: 'morning windows beat afternoon squalls' },
    February: { crowd: 'medium', weather: 'humid and lush', advice: 'Plan outdoor hopes for the morning.', local: 'jungles get loud with insects at dusk' },
    March: { crowd: 'low', weather: 'late wet', advice: 'Quiet reefs, wet trails.', local: 'bring more dry bags than shirts' },
    April: { crowd: 'medium', weather: 'transition', advice: 'Dive visibility often improves.', local: 'humidity starts to ease on windward coasts' },
    May: { crowd: 'high', weather: 'trade winds', advice: 'Excellent beach and sailing weather.', local: 'book island hops before weekends' },
    June: { crowd: 'high', weather: 'dry and breezy', advice: 'Peak comfort for most archipelagos.', local: 'sun is serious even with wind' },
    July: { crowd: 'high', weather: 'peak dry', advice: 'Reef mornings beat midday glare.', local: 'famous beaches need dawn if you want space' },
    August: { crowd: 'high', weather: 'dry and busy', advice: 'Leeward coasts handle trade winds better.', local: 'crossings can be choppy' },
    September: { crowd: 'medium', weather: 'warm water, thinning crowds', advice: 'A favorite month.', local: 'sunsets get long and theatrical' },
    October: { crowd: 'medium', weather: 'shoulder storms possible', advice: 'Prices dip.', local: 'keep one indoor or spa day unscheduled' },
    November: { crowd: 'low', weather: 'rain in pulses', advice: 'Rainforests and waterfalls shine.', local: 'mosquito hours lengthen' },
    December: { crowd: 'high', weather: 'holiday peak', advice: 'Storm risk varies by basin.', local: 'family weeks change the feel of small islands' },
  },
  continental: {
    January: { crowd: 'low', weather: 'hard winter', advice: 'Indoor culture and short daylight.', local: 'ice can be more trouble than snow' },
    February: { crowd: 'low', weather: 'clear cold', advice: 'Photogenic if you dress for it.', local: 'steam and low sun define the streets' },
    March: { crowd: 'medium', weather: 'thaw', advice: 'Muddy parks, first terrace days.', local: 'pack for sleet and T-shirts in one week' },
    April: { crowd: 'medium', weather: 'unpredictable spring', advice: 'Layers, always.', local: 'blossom can arrive overnight' },
    May: { crowd: 'high', weather: 'green and festive', advice: 'Walk cities without summer haze.', local: 'riverfronts reopen as living rooms' },
    June: { crowd: 'high', weather: 'long evenings', advice: 'Parks and embankments become the plan.', local: 'white nights or near-equivalents in the north' },
    July: { crowd: 'high', weather: 'heat waves possible', advice: 'Rivers, late dinners, morning markets.', local: 'some courtyards trap heat after 2pm' },
    August: { crowd: 'high', weather: 'vacation crowds plus heat', advice: 'Neighborhoods may empty in capitals.', local: 'book the places locals still use' },
    September: { crowd: 'medium', weather: 'golden', advice: 'Harvest food and softer light.', local: 'an underrated independent-travel month' },
    October: { crowd: 'medium', weather: 'crisp color', advice: 'Last easy month for long outdoor days.', local: 'evenings need a real coat by month-end' },
    November: { crowd: 'low', weather: 'grey cold rain', advice: 'Museum density matters.', local: 'daylight is the scarce resource' },
    December: { crowd: 'high', weather: 'markets and steam', advice: 'Charming with indoor anchors.', local: 'weekend markets need timed entries in famous cities' },
  },
  subarctic: {
    January: { crowd: 'medium', weather: 'dark and cold', advice: 'Lights tours and short opening hours.', local: 'plan around the few daylight hours, not a full city list' },
    February: { crowd: 'medium', weather: 'dark mornings, returning light', advice: 'Winter activities without the deepest gloom.', local: 'batteries die in the cold; keep them inside your coat' },
    March: { crowd: 'high', weather: 'bright snow', advice: 'Superb winter-activity month.', local: 'sun-on-snow is harsh on eyes and skin' },
    April: { crowd: 'medium', weather: 'ski-touring spring', advice: 'Highland roads may stay closed.', local: 'towns thaw before the interior does' },
    May: { crowd: 'medium', weather: 'green-up', advice: 'Birds and waterfalls, lingering hill snow.', local: 'the landscape changes by the week' },
    June: { crowd: 'high', weather: 'midnight sun', advice: 'Energy is high and lodgings fill.', local: 'sleep needs blackout, not just tiredness' },
    July: { crowd: 'high', weather: 'warmest, still jacketed on coasts', advice: 'Insects inland can be intense.', local: 'a head net is not a joke on some trails' },
    August: { crowd: 'high', weather: 'berry season, softer nights', advice: 'First autumn colors in the tundra.', local: 'a quieter feel than July on popular loops' },
    September: { crowd: 'medium', weather: 'aurora returns', advice: 'Trails quiet, weather sharp.', local: 'one of the best value light-and-landscape months' },
    October: { crowd: 'low', weather: 'storms and early snow', advice: 'City bases beat highland loops.', local: 'rental cars need real winter consideration' },
    November: { crowd: 'low', weather: 'polar night approaching', advice: 'Pools, culture, short walks.', local: 'embrace indoor life rather than fighting the dark' },
    December: { crowd: 'high', weather: 'holiday dark', advice: 'Book scarce daylight activities.', local: 'festive interiors are the point, not a compromise' },
  },
  savanna: {
    January: { crowd: 'medium', weather: 'green season', advice: 'Dramatic skies and fewer vehicles.', local: 'calves and birds are the story, not river crossings' },
    February: { crowd: 'low', weather: 'still wet', advice: 'Some camps close; birding excellent.', local: 'airstrip schedules can shuffle with storms' },
    March: { crowd: 'low', weather: 'rains tapering', advice: 'Photogenic and green.', local: 'tracks remain soft in the mornings' },
    April: { crowd: 'low', weather: 'heavy rain can linger', advice: 'Confirm which parks stay open.', local: 'this is a specialist month, not a bargain trap' },
    May: { crowd: 'medium', weather: 'shoulder into dry', advice: 'Roads improve, herds concentrate.', local: 'a sweet spot before peak prices' },
    June: { crowd: 'high', weather: 'dry season opens', advice: 'Cool mornings, easy viewing.', local: 'book classic circuits now or pay July rates' },
    July: { crowd: 'high', weather: 'peak safari', advice: 'Book lodges and crossings early.', local: 'famous rivers mean convoys; choose a quieter concession if that matters' },
    August: { crowd: 'high', weather: 'dust and clear air', advice: 'Worth it if you accept the traffic.', local: 'midday glare is fierce on open grassland' },
    September: { crowd: 'high', weather: 'very dry', advice: 'Animals cluster; afternoons heat up.', local: 'water sources become the whole map' },
    October: { crowd: 'medium', weather: 'hot end of dry', advice: 'Storms may crack late month.', local: 'a dramatic, taut landscape' },
    November: { crowd: 'medium', weather: 'short rains in some regions', advice: 'Green flush, fewer guests.', local: 'confirm local rain timing; it is not uniform' },
    December: { crowd: 'high', weather: 'festive or wet depending on country', advice: 'Confirm local patterns before locking safari days.', local: 'family holiday weeks change lodge feel completely' },
  },
}

function monthGuide(seed) {
  const local = seed.monthNotes ?? {}
  const arc = CLIMATE_ARC[seed.climate] ?? CLIMATE_ARC.oceanic
  return MONTHS.map((month) => {
    const extra = local[month]
    const climateLine = arc[month]
    return {
      month,
      crowd: extra?.crowd ?? climateLine.crowd,
      weather: extra?.weather ?? climateLine.weather,
      advice: extra?.advice ?? `${climateLine.advice} In ${seed.name}, ${climateLine.local}.`,
    }
  })
}

function expand(seed) {
  const photo = paletteFor(seed.id, seed.climate)
  const months = monthGuide(seed)
  const packing = (seed.packing ?? []).map((entry, index) => ({
    id: `${seed.id}-pack-${index + 1}`,
    item: entry.item,
    reason: entry.reason,
  }))

  return {
    id: seed.id,
    name: seed.name,
    country: seed.country,
    region: seed.region,
    budget: seed.budget,
    activities: seed.activities,
    stayDays: seed.stayDays,
    blurb: seed.blurb,
    tagline: seed.tagline,
    overview: seed.overview,
    visitorProfile: seed.visitorProfile,
    climate: seed.climate,
    coordinates: seed.coordinates,
    airport: seed.airport,
    timezone: seed.timezone,
    language: seed.language,
    currency: seed.currency,
    walkability: seed.walkability,
    crowdLevel: seed.crowdLevel,
    altitudeMeters: seed.altitudeMeters,
    dailyCosts: {
      modest: money(seed.costs[0], seed.currency),
      comfortable: money(seed.costs[1], seed.currency),
      luxury: money(seed.costs[2], seed.currency),
    },
    gettingThere: seed.gettingThere,
    gettingAround: seed.gettingAround,
    highlights: seed.highlights.map((entry, index) => ({
      id: `${seed.id}-highlight-${index + 1}`,
      title: entry.title,
      detail: entry.detail,
      timeNeeded: entry.timeNeeded,
    })),
    food: seed.food.map((entry, index) => ({
      id: `${seed.id}-food-${index + 1}`,
      name: entry.name,
      detail: entry.detail,
    })),
    nearby: seed.nearby.map((entry, index) => ({
      id: `${seed.id}-nearby-${index + 1}`,
      name: entry.name,
      detail: entry.detail,
      travelTime: entry.travelTime,
    })),
    itinerary: seed.itinerary.map((entry, index) => ({
      day: index + 1,
      title: entry.title,
      morning: entry.morning,
      afternoon: entry.afternoon,
      evening: entry.evening,
    })),
    packing,
    tips: seed.tips,
    warnings: seed.warnings,
    monthGuide: months,
    photo,
    bestMonths: seed.bestMonths,
    tags: seed.tags,
  }
}

function toModule(regionName, seeds) {
  const expanded = seeds.map(expand)
  const serialized = JSON.stringify(expanded, null, 2)
  return `export const ${regionName} = ${serialized}\n`
}

const regions = [
  ['AFRICA_DESTINATIONS', 'africa', africa],
  ['ASIA_DESTINATIONS', 'asia', asia],
  ['EUROPE_DESTINATIONS', 'europe', europe],
  ['AMERICAS_DESTINATIONS', 'americas', americas],
  ['OCEANIA_DESTINATIONS', 'oceania', oceania],
]

mkdirSync('src/data/destinations', { recursive: true })

regions.forEach(([exportName, file, seeds]) => {
  writeFileSync(
    `src/data/destinations/${file}.js`,
    toModule(exportName, seeds),
  )
})

const index = `import { AFRICA_DESTINATIONS } from './africa.js'
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
`

writeFileSync('src/data/destinations/index.js', index)
writeFileSync(
  'src/data/destinations.js',
  `export {\n  ACTIVITIES,\n  BUDGETS,\n  CLIMATES,\n  DESTINATIONS,\n  REGIONS,\n  destinationsByRegion,\n  getDestination,\n} from './destinations/index.js'\n`,
)

console.log(
  `Wrote ${regions.reduce((sum, [, , seeds]) => sum + seeds.length, 0)} destinations`,
)
