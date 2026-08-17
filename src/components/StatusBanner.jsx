import { formatHiddenCount, formatResultCount, formatTripCount } from '../utils/format'

export default function StatusBanner({ resultCount, tripCount, hiddenCount }) {
  const hiddenMessage = formatHiddenCount(hiddenCount)

  return (
    <div className="status-banner" role="status" aria-live="polite">
      <span>{formatResultCount(resultCount)}</span>
      <span>{formatTripCount(tripCount)}</span>
      {hiddenMessage ? <span>{hiddenMessage}</span> : null}
    </div>
  )
}
