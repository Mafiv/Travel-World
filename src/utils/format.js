export function titleCase(value) {
  if (!value) {
    return ''
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatStay(days) {
  if (days === 1) {
    return '1 night'
  }

  return `${days} days`
}

export function formatActivityList(activities) {
  if (activities.length === 0) {
    return 'No listed activities'
  }

  if (activities.length === 1) {
    return titleCase(activities[0])
  }

  const head = activities.slice(0, -1).map(titleCase).join(', ')
  return `${head} and ${titleCase(activities.at(-1))}`
}

export function formatTripCount(count) {
  if (count === 1) {
    return '1 destination in your trip'
  }

  return `${count} destinations in your trip`
}

export function formatHiddenCount(count) {
  if (count === 0) {
    return ''
  }

  if (count === 1) {
    return '1 selected destination is hidden by the current filters.'
  }

  return `${count} selected destinations are hidden by the current filters.`
}

export function formatResultCount(count) {
  if (count === 1) {
    return '1 destination matches your filters.'
  }

  return `${count} destinations match your filters.`
}

export function formatMoney(value) {
  if (!value) {
    return '—'
  }

  return `${value.currency} ${Number(value.amount).toLocaleString()}`
}
