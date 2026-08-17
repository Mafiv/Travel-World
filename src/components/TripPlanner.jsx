import TripItem from './TripItem'

export default function TripPlanner({
  tripName,
  notes,
  items,
  hiddenIds,
  onNameChange,
  onNotesChange,
  onMoveUp,
  onMoveDown,
  onRemove,
  onClear,
}) {
  return (
    <aside className="panel trip-panel" aria-labelledby="trip-heading">
      <h2 id="trip-heading">Your trip</h2>
      <div className="trip-field">
        <label htmlFor="trip-name">Trip name</label>
        <input
          id="trip-name"
          type="text"
          value={tripName}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Spring circuit"
        />
      </div>
      {items.length === 0 ? (
        <p className="empty-state">No destinations in this trip yet. Add one from the catalog.</p>
      ) : (
        <ol className="trip-list" aria-label="Trip itinerary">
          {items.map((destination, index) => (
            <TripItem
              key={destination.id}
              destination={destination}
              hiddenByFilter={hiddenIds.has(destination.id)}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onRemove={onRemove}
            />
          ))}
        </ol>
      )}
      <div className="trip-field">
        <label htmlFor="trip-notes">Trip notes</label>
        <textarea
          id="trip-notes"
          className="trip-notes"
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Flight windows, walking days, or places to linger."
        />
      </div>
      <button
        type="button"
        className="button secondary"
        onClick={onClear}
        disabled={items.length === 0 && !tripName && !notes}
      >
        Clear trip
      </button>
    </aside>
  )
}
