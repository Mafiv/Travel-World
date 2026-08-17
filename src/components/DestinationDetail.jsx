import { formatActivityList, formatStay, titleCase } from '../utils/format'

export default function DestinationDetail({ destination, selected, onToggle, onClose }) {
  if (!destination) {
    return null
  }

  return (
    <section className="detail-panel" aria-labelledby="destination-detail-heading">
      <h2 id="destination-detail-heading">{destination.name}</h2>
      <p className="meta">
        {destination.country} · {destination.region} · {titleCase(destination.budget)} ·{' '}
        {formatStay(destination.stayDays)}
      </p>
      <p>{destination.blurb}</p>
      <p className="meta">Activities: {formatActivityList(destination.activities)}</p>
      <div className="detail-actions">
        <button
          type="button"
          className="button"
          aria-pressed={selected}
          onClick={() => onToggle(destination.id)}
        >
          {selected ? `Remove ${destination.name} from trip` : `Add ${destination.name} to trip`}
        </button>
        <button type="button" className="button secondary" onClick={onClose}>
          Close details
        </button>
      </div>
    </section>
  )
}
