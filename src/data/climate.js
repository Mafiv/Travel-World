export const MONTHS = [
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

export const CLIMATE_PROFILES = {
  mediterranean: {
    label: 'Mediterranean',
    summary:
      'Wet, mild winters and dry summers. Shoulder months are the most comfortable for walking cities and coastal trails.',
    months: {
      January: 'Cool, occasionally wet days. Museums, food halls, and short coastal walks work better than long hikes.',
      February: 'Still winter-wet, with longer light. Almond blossom and empty monuments are the quiet-season payoff.',
      March: 'Spring starts. Wildflowers and milder afternoons make this a strong month for city-plus-countryside trips.',
      April: 'One of the best walking months: mild, green, and busy only around holidays.',
      May: 'Warm enough for evenings outdoors. Beaches open, but interiors stay pleasant.',
      June: 'Dry heat arrives. Start days early, plan shade at midday, and eat late.',
      July: 'Peak heat and crowds on the coast. Mountain villages and early trains are the survival strategy.',
      August: 'Hottest and most crowded. Many locals leave cities; book lodging well ahead.',
      September: 'Heat eases, sea stays warm, and harvest menus appear. Excellent all-round month.',
      October: 'Vintage light, wine harvests, and fewer tour groups. Pack a light layer for evenings.',
      November: 'Rain returns. Good for food-focused city breaks if you accept grey afternoons.',
      December: 'Short days, festive markets, and mild cold rather than deep freeze in most coastal cities.',
    },
  },
  arid: {
    label: 'Arid / desert-edge',
    summary:
      'Harsh midday sun, large day-night swings, and a short pleasant window in winter and early spring.',
    months: {
      January: 'Cool to cold nights and bright, walkable days. The most comfortable month for medinas and desert camps.',
      February: 'Still excellent for walking. Occasional rain can scent the dust and fill dry riverbeds.',
      March: 'Warming fast. Mornings remain ideal; afternoons start to demand shade.',
      April: 'Hot by midday. Sightsee at dawn, rest after lunch, resume at blue hour.',
      May: 'Heat becomes the main constraint. Pool time and indoor crafts beat long ruins at noon.',
      June: 'Very hot. Only short outdoor bursts and well-timed transport make sense.',
      July: 'Extreme heat. Desert travel is for specialists; cities empty into courtyards and riads.',
      August: 'Still severe. Night markets and very early starts are the only humane outdoor plan.',
      September: 'Heat slowly breaks. Late month can feel human again after sunset.',
      October: 'Evenings cool, days stay warm. A second high season for ruins and souks.',
      November: 'Clear, mild days return. Fine for long medina walks and mountain day trips.',
      December: 'Cool nights, festive lights in cities, and excellent walking weather.',
    },
  },
  monsoon: {
    label: 'Monsoon / seasonal tropics',
    summary:
      'A dry season that is easy to travel and a wet season that is lush, slower, and cheaper, with afternoon storms.',
    months: {
      January: 'Dry, bright, and busy. The classic window for temples, treks, and long motorbike days.',
      February: 'Still dry and popular. Book trains and festival dates early.',
      March: 'Heat builds before the rains. Start at dawn and treat midday as indoor time.',
      April: 'Hottest pre-monsoon stretch in many places. Water festivals and strong air-conditioning matter.',
      May: 'First storms. Humidity jumps; landscapes turn green and crowds thin.',
      June: 'Rainy season proper. Travel still works with flexible plans and waterproof bags.',
      July: 'Heavy showers, lowland flooding risk on some roads. Cities remain very usable.',
      August: 'Lush and slow. Rice terraces and waterfalls are at their most dramatic.',
      September: 'Rains ease in many regions. A value month if you accept muddy trails.',
      October: 'Shoulder toward dry season. Festivals and clearer skies return.',
      November: 'Dry season begins. Excellent light, comfortable nights, rising demand.',
      December: 'Peak dry-season travel. Book popular lodging and sleepers ahead.',
    },
  },
  oceanic: {
    label: 'Oceanic',
    summary:
      'Mild year-round temperatures, frequent cloud, and weather that changes inside a single afternoon.',
    months: {
      January: 'Midsummer in the south, deep winter in the north. Pack layers either way and expect mixed skies.',
      February: 'Unsettled and dramatic. Good museum weather with bursts of clear walking light.',
      March: 'Longer days. Gardens and harbor walks start to feel generous.',
      April: 'Showers and bloom. A waterproof shell is more useful than a heavy coat.',
      May: 'One of the kindest months: long evenings, green hills, and fewer extreme temperatures.',
      June: 'High season for many coasts. Book ferries; still bring a sweater for wind.',
      July: 'Warmest stretch, still rarely tropical. Crowds concentrate on famous trails and waterfronts.',
      August: 'Festivals, full hotels, and the best chance of consecutive clear days.',
      September: 'Quieter trails, harvest food, and sea temperatures that lag the air.',
      October: 'Storms return. Cozy cities and short coastal walks beat exposed ridges.',
      November: 'Low light, wet pavements, excellent cafes. Off-season rates appear.',
      December: 'Short days and festive interiors. Mountain weather can close high roads.',
    },
  },
  alpine: {
    label: 'Alpine / high plateau',
    summary:
      'Altitude shapes the day: strong sun, cold shade, and seasons split between hiking and snow.',
    months: {
      January: 'Deep winter. Ski towns thrive; high trails are for snow travel only. Drink water and rest on arrival.',
      February: 'Still snow-sure in many ranges. Bright, cold days and early sunsets.',
      March: 'Spring snowpack. Lower valleys green while peaks stay white.',
      April: 'Shoulder chaos: mud, melt, and closed huts on some routes. Cities below the snowline shine.',
      May: 'Waterfalls peak. Lower trails open; high passes may still hold snow.',
      June: 'Hiking season begins in earnest. Wildflowers and long light, lingering cornice risk up high.',
      July: 'Prime trekking month. Book huts and start at dawn to dodge afternoon storms.',
      August: 'Crowded famous trails, unstable afternoon weather. Shoulder routes feel better.',
      September: 'Gold grass, fewer people, first snows on the highest ground. Outstanding month.',
      October: 'Sharp, clear days then sudden winter. High routes close; valley walks remain superb.',
      November: 'Quiet, cold, and often between seasons. Good for towns, not for passes.',
      December: 'Snow returns. Holiday weeks fill lodges; midweeks stay calmer.',
    },
  },
  tropical: {
    label: 'Tropical maritime',
    summary:
      'Warm every month. The real choice is wind, humidity, and whether you hit dry trade winds or cyclone season.',
    months: {
      January: 'Wet or cyclone-aware in many basins. Still swimmable; plan buffer days around boats.',
      February: 'Humid and lush. Afternoon storms are normal; mornings are the clear window.',
      March: 'Late wet season in several regions. Reefs are quiet, jungles loud with insects.',
      April: 'Transition month. Humidity eases in some archipelagos and dive visibility improves.',
      May: 'Trade winds arrive in many places. Excellent beach and sailing weather.',
      June: 'Dry, breezy, and popular. Book island transfers early.',
      July: 'Peak dry season. Strong sun; reef mornings beat midday glare.',
      August: 'Still dry and busy. Trade winds can chop crossings; choose leeward coasts.',
      September: 'Warm water, thinning crowds, lingering dry weather. A favorite month.',
      October: 'Shoulder. First storms possible; prices dip and sunsets get theatrical.',
      November: 'Rain returns in pulses. Good for rainforests and waterfall swimming.',
      December: 'Holiday peak on famous beaches. Storm risk varies by ocean basin.',
    },
  },
  continental: {
    label: 'Continental',
    summary:
      'Real winters and real summers. Spring and autumn are short, vivid, and the easiest times to walk all day.',
    months: {
      January: 'Hard winter in the north. Ice, steam, and indoor culture. Daylight can be scarce.',
      February: 'Still frozen in many cities. Clear, photogenic cold if you dress for it.',
      March: 'Thaw. Muddy parks, longer light, and the first terrace days on warm afternoons.',
      April: 'Spring proper. Unpredictable mix of sleet and T-shirts. Pack both.',
      May: 'Green, festive, and excellent for walking cities without summer haze.',
      June: 'Long evenings. Riverfronts and parks become the main living room.',
      July: 'Heat waves possible. Seek rivers, late dinners, and morning markets.',
      August: 'Vacation crowds plus heat. Neighborhoods empty in some capitals.',
      September: 'Golden and underrated. Harvest food, softer light, back-to-school calm.',
      October: 'Crisp color. The last reliably pleasant month for long outdoor days.',
      November: 'Grey, cold rain. Museum density matters more than viewpoints.',
      December: 'Markets, steam, and early dark. Charming if you plan indoor anchors.',
    },
  },
  subarctic: {
    label: 'Subarctic / high latitude',
    summary:
      'Light is the main season marker: polar night or midnight sun can matter more than the thermometer.',
    months: {
      January: 'Dark, cold, and otherworldly. Northern lights odds are high; opening hours are short.',
      February: 'Still dark-morning winter, with rapidly returning light by month’s end.',
      March: 'Bright snow and longer days. A superb month for winter activities without midwinter gloom.',
      April: 'Ski-touring spring. Towns thaw; highland roads may stay closed.',
      May: 'Explosive green-up. Migratory birds and waterfalls, lingering snow in the hills.',
      June: 'Midnight sun in the far north. Energy is high and lodgings fill.',
      July: 'Warmest month, still jacket weather on coasts. Insects inland can be intense.',
      August: 'Berry season, softer light at night, first hints of autumn in the tundra.',
      September: 'Northern lights return as nights darken. Trails quiet; weather turns sharp.',
      October: 'Storms, early snow, and closed highland loops. City bases work better.',
      November: 'Polar night approaches. Culture, pools, and short daylight walks.',
      December: 'Holiday dark and festive interiors. Book the few daylight activities with care.',
    },
  },
  savanna: {
    label: 'Savanna / tropical grassland',
    summary:
      'A sharp split between green rains and dusty dry months. Wildlife and road conditions follow that split.',
    months: {
      January: 'Green season in many parks. Dramatic skies, calves, and fewer vehicles.',
      February: 'Still wet in several circuits. Birding is excellent; some camps close.',
      March: 'Rains taper in East African lowlands. Landscapes stay photogenic and green.',
      April: 'Heavy rain can linger. Check which parks and airstrips stay open.',
      May: 'Shoulder into dry. Roads improve and herds begin to concentrate near water.',
      June: 'Dry season opens. Cool mornings, easy game viewing, rising prices.',
      July: 'Peak safari month in classic circuits. Book lodges and crossings early.',
      August: 'Dust, clear air, and crowded famous rivers. Worth it if you accept the convoy.',
      September: 'Very dry. Animals cluster; heat builds in the afternoons.',
      October: 'Hottest, taut end of dry season. Storms may crack the sky late month.',
      November: 'Short rains in some regions. Green flush and fewer guests.',
      December: 'Festive high season in some countries, rain in others. Confirm local patterns.',
    },
  },
}

export function getClimateProfile(climate) {
  return CLIMATE_PROFILES[climate] ?? CLIMATE_PROFILES.oceanic
}

export function buildMonthGuide(destination) {
  const profile = getClimateProfile(destination.climate)
  const local = destination.monthNotes ?? {}

  return MONTHS.map((month) => {
    const base = profile.months[month]
    const extra = local[month]
    return {
      month,
      summary: extra ? `${base} In ${destination.name}, ${extra}` : `${base} ${destination.name} follows this pattern closely.`,
    }
  })
}

export function bestMonthsFromGuide(guide) {
  return guide
    .filter((entry) =>
      /best|excellent|prime|outstanding|superb|favorite|kindest/i.test(entry.summary),
    )
    .map((entry) => entry.month)
}
