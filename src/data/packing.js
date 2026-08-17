export const BASE_PACKING = [
  {
    id: 'passport',
    item: 'Passport and a paper backup of key bookings',
    reason: 'A phone failure should not leave you unable to check in or board.',
    always: true,
  },
  {
    id: 'meds',
    item: 'Prescriptions in original packaging plus a small first-aid kit',
    reason: 'Familiar brands are not guaranteed, especially outside large cities.',
    always: true,
  },
  {
    id: 'layers',
    item: 'A breathable base layer and one warmer mid-layer',
    reason: 'Most destinations in this catalog swing between sun, wind, and air-conditioning.',
    always: true,
  },
  {
    id: 'shoes',
    item: 'Broken-in walking shoes with grip',
    reason: 'Cobbles, temple stairs, and trail mud punish new footwear.',
    always: true,
  },
  {
    id: 'adapter',
    item: 'Universal plug adapter and a short power strip',
    reason: 'One outlet in a guesthouse should not decide who gets to charge.',
    always: true,
  },
  {
    id: 'water',
    item: 'Refillable bottle you can actually drink from all day',
    reason: 'It cuts plastic and keeps you ahead of altitude, heat, and long transit.',
    always: true,
  },
]

export const CLIMATE_PACKING = {
  mediterranean: [
    {
      id: 'sun-hat',
      item: 'Brimmed hat and high-SPF sunscreen',
      reason: 'Dry summer light reflects off stone and water even on mild days.',
    },
    {
      id: 'light-rain',
      item: 'Packable rain shell',
      reason: 'Shoulder-season storms are short but soak cotton quickly.',
    },
  ],
  arid: [
    {
      id: 'sun-scarf',
      item: 'Light scarf or sun hoodie',
      reason: 'It covers neck and dust on desert roads without adding bulk.',
    },
    {
      id: 'electrolytes',
      item: 'Electrolyte tablets',
      reason: 'Dry heat dehydrates before you feel thirsty.',
    },
    {
      id: 'warm-night',
      item: 'Warm layer for night',
      reason: 'Desert-edge evenings drop hard after radiant afternoons.',
    },
  ],
  monsoon: [
    {
      id: 'dry-bags',
      item: 'A few dry bags or zip pouches',
      reason: 'Afternoon storms find backpack seams and scooter baskets.',
    },
    {
      id: 'quick-dry',
      item: 'Quick-dry trousers and shirts',
      reason: 'Cotton stays wet through humid nights.',
    },
    {
      id: 'sandals',
      item: 'Grip sandals for flooded streets',
      reason: 'You will want to peel off soaked shoes without going barefoot in traffic.',
    },
  ],
  oceanic: [
    {
      id: 'wool',
      item: 'Light merino or wool sweater',
      reason: 'Wind on harbors feels colder than the forecast number.',
    },
    {
      id: 'waterproof',
      item: 'Truly waterproof jacket, not just windproof',
      reason: 'Fine rain lasts hours on these coasts.',
    },
  ],
  alpine: [
    {
      id: 'altitude',
      item: 'Lip balm, sunscreen, and a water bladder',
      reason: 'Thin air plus strong sun burns and dries you out together.',
    },
    {
      id: 'insulation',
      item: 'Packable insulated jacket',
      reason: 'Shade, buses, and evening towns can feel like a different season.',
    },
    {
      id: 'trail',
      item: 'Trail poles if you plan passes',
      reason: 'Descents on scree and snow patch wreck knees faster than the climb.',
    },
  ],
  tropical: [
    {
      id: 'reef',
      item: 'Reef-safe sunscreen and a long-sleeve swim shirt',
      reason: 'Equatorial sun and sensitive coral both argue against heavy chemical loads.',
    },
    {
      id: 'insect',
      item: 'Insect repellent and a light long shirt for dusk',
      reason: 'Mangroves and rainforests get loud at blue hour.',
    },
    {
      id: 'dry-electronics',
      item: 'Waterproof pouch for phone and cards',
      reason: 'Boat spray and sudden squalls are normal, not exceptional.',
    },
  ],
  continental: [
    {
      id: 'real-coat',
      item: 'A proper coat in winter months, not only a fashion layer',
      reason: 'Continental cold is dry and persistent; wind finds thin wool.',
    },
    {
      id: 'boots',
      item: 'Waterproof boots if traveling November to March',
      reason: 'Slush and salted stone destroy sneakers in a day.',
    },
  ],
  subarctic: [
    {
      id: 'microspikes',
      item: 'Microspikes or serious winter boots',
      reason: 'Polished ice on sidewalks is more common than deep powder in town.',
    },
    {
      id: 'battery',
      item: 'High-capacity power bank kept inside your jacket',
      reason: 'Cold kills phone batteries right when daylight is scarcest.',
    },
  ],
  savanna: [
    {
      id: 'neutral-clothes',
      item: 'Neutral, long, breathable clothing',
      reason: 'It keeps sun and brush off skin and avoids startling wildlife with bright color.',
    },
    {
      id: 'binoculars',
      item: 'Compact binoculars',
      reason: 'Most of the interesting animals are not beside the vehicle.',
    },
    {
      id: 'dust',
      item: 'A buff or scarf for dust',
      reason: 'Dry-season tracks coat cameras, teeth, and contact lenses.',
    },
  ],
}

export const ACTIVITY_PACKING = {
  beach: [
    {
      id: 'mask',
      item: 'Your own mask if you plan to snorkel more than once',
      reason: 'Rental seals vary wildly and can ruin a good reef morning.',
    },
  ],
  hiking: [
    {
      id: 'blister',
      item: 'Blister kit and extra socks',
      reason: 'A hot spot at kilometer three decides the rest of the week.',
    },
    {
      id: 'headlamp',
      item: 'Headlamp',
      reason: 'Dawn starts and delayed descents are both normal on real trails.',
    },
  ],
  wildlife: [
    {
      id: 'quiet-colors',
      item: 'Quiet, non-rustling layers',
      reason: 'Wildlife vehicles and hides punish noisy shells.',
    },
  ],
  city: [
    {
      id: 'day-bag',
      item: 'Small day bag that sits close to the body',
      reason: 'Transit and markets are easier when you are not wearing a full pack.',
    },
  ],
  culture: [
    {
      id: 'cover-up',
      item: 'A shirt or wrap that covers shoulders and knees',
      reason: 'Temples, churches, and some museums still enforce dress codes.',
    },
  ],
  food: [
    {
      id: 'stomach',
      item: 'A small kit for stomach upsets',
      reason: 'The best stalls are worth a cautious first night, not a ruined second day.',
    },
  ],
}

export function buildPackingList(destination) {
  const climateItems = CLIMATE_PACKING[destination.climate] ?? []
  const activityItems = destination.activities.flatMap(
    (activity) => ACTIVITY_PACKING[activity] ?? [],
  )
  const localItems = (destination.packing ?? []).map((entry, index) => ({
    id: `${destination.id}-local-${index}`,
    item: entry.item,
    reason: entry.reason,
  }))

  const merged = [...BASE_PACKING, ...climateItems, ...activityItems, ...localItems]
  const seen = new Set()
  return merged.filter((entry) => {
    if (seen.has(entry.id)) {
      return false
    }
    seen.add(entry.id)
    return true
  })
}

export function packingForTrip(destinations) {
  const lists = destinations.map((destination) => ({
    destination,
    items: buildPackingList(destination),
  }))
  const combined = []
  const seen = new Set()
  lists.forEach((list) => {
    list.items.forEach((item) => {
      if (seen.has(item.item)) {
        return
      }
      seen.add(item.item)
      combined.push({
        ...item,
        from: list.destination.name,
      })
    })
  })
  return { perDestination: lists, combined }
}
