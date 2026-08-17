export default function JournalView({ entries, items, draft, onDraftChange, onSave, onDelete }) {
  return (
    <section className="panel journal-panel" aria-labelledby="journal-heading">
      <h2 id="journal-heading">Journal</h2>
      <form
        className="journal-form"
        onSubmit={(event) => {
          event.preventDefault()
          onSave()
        }}
      >
        <div className="filter-field">
          <label htmlFor="journal-title">Entry title</label>
          <input
            id="journal-title"
            value={draft.title}
            onChange={(event) => onDraftChange({ title: event.target.value })}
            placeholder="Night market notes"
          />
        </div>
        <div className="filter-field">
          <label htmlFor="journal-place">Linked destination</label>
          <select
            id="journal-place"
            value={draft.destinationId}
            onChange={(event) => onDraftChange({ destinationId: event.target.value })}
          >
            <option value="">No specific place</option>
            {items.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="journal-body">Notes</label>
          <textarea
            id="journal-body"
            className="trip-notes"
            value={draft.body}
            onChange={(event) => onDraftChange({ body: event.target.value })}
            placeholder="What you ate, who you met, what to repeat."
          />
        </div>
        <button type="submit" className="button" disabled={!draft.title.trim() && !draft.body.trim()}>
          Save journal entry
        </button>
      </form>
      {entries.length === 0 ? (
        <p className="empty-state">No journal entries yet.</p>
      ) : (
        <ul className="stack-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.title || 'Untitled'}</strong>
              <p className="meta">{entry.placeLabel} · {entry.createdAt}</p>
              <p>{entry.body}</p>
              <button type="button" className="button ghost" onClick={() => onDelete(entry.id)}>
                Delete {entry.title || 'journal entry'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
