import { formatActivityList, formatStay, titleCase } from '../utils/format'

export default function DestinationCard({
  destination,
  selected,
  onToggle,
  onOpen,
}) {
  return (
    <article className="destination-card">
      <div>
        <h3>{destination.name}</h3>
        <p className="meta">
          {destination.country} · {destination.region} · {titleCase(destination.budget)} ·{' '}
          {formatStay(destination.stayDays)}
        </p>
      </div>
      <p className="meta">{formatActivityList(destination.activities)}</p>
      <div className="card-actions">
        <button
          type="button"
          className="button"
          aria-pressed={selected}
          onClick={() => onToggle(destination.id)}
        >
          {selected ? `Remove ${destination.name} from trip` : `Add ${destination.name} to trip`}
        </button>
        <button
          type="button"
          className="button secondary"
          onClick={() => onOpen(destination.id)}
        >
          View {destination.name} details
        </button>
      </div>
    </article>
  )
}
