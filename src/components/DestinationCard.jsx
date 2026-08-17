import { formatActivityList, formatStay, titleCase } from '../utils/format'
import PostcardArt from './PostcardArt'

export default function DestinationCard({
  destination,
  selected,
  compared,
  onToggle,
  onOpen,
  onCompare,
}) {
  return (
    <article className="destination-card">
      <PostcardArt destination={destination} />
      <div className="card-copy">
        <p className="eyebrow">{destination.country}</p>
        <h3>{destination.name}</h3>
        <p className="meta">
          {destination.region} · {titleCase(destination.budget)} · {formatStay(destination.stayDays)} ·{' '}
          {titleCase(destination.climate ?? 'oceanic')}
        </p>
        <p className="tagline">{destination.tagline ?? destination.blurb}</p>
        <p className="meta">{formatActivityList(destination.activities)}</p>
      </div>
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
        <button
          type="button"
          className="button ghost"
          aria-pressed={compared}
          onClick={() => onCompare(destination.id)}
        >
          {compared ? `Remove ${destination.name} from compare` : `Compare ${destination.name}`}
        </button>
      </div>
    </article>
  )
}
