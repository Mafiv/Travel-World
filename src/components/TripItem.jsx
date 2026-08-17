export default function TripItem({
  destination,
  hiddenByFilter,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}) {
  return (
    <li className={hiddenByFilter ? 'trip-item hidden-by-filter' : 'trip-item'}>
      <strong>{destination.name}</strong>
      <p className="meta">{destination.country}</p>
      {hiddenByFilter ? (
        <p className="hidden-note">Hidden by the current filters, still kept in your trip.</p>
      ) : null}
      <div className="trip-actions">
        <button
          type="button"
          className="button secondary"
          onClick={() => onMoveUp(destination.id)}
          disabled={isFirst}
        >
          Move {destination.name} up
        </button>
        <button
          type="button"
          className="button secondary"
          onClick={() => onMoveDown(destination.id)}
          disabled={isLast}
        >
          Move {destination.name} down
        </button>
        <button
          type="button"
          className="button danger"
          onClick={() => onRemove(destination.id)}
        >
          Remove {destination.name}
        </button>
      </div>
    </li>
  )
}
