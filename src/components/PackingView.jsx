import { packingForTrip } from '../data/packing'

export default function PackingView({ items, checked, onToggleItem }) {
  const lists = packingForTrip(items)

  if (items.length === 0) {
    return (
      <section className="panel" aria-labelledby="packing-heading">
        <h2 id="packing-heading">Packing</h2>
        <p className="empty-state">Add destinations to your trip to build a packing list.</p>
      </section>
    )
  }

  return (
    <section className="panel packing-panel" aria-labelledby="packing-heading">
      <h2 id="packing-heading">Packing</h2>
      <p className="meta">
        Combined from climate, activities, and local notes. Check items off as you pack.
      </p>
      <ul className="check-list">
        {lists.combined.map((entry) => {
          const id = `pack-${entry.id}`
          const isChecked = checked.has(entry.item)
          return (
            <li key={entry.item}>
              <label htmlFor={id} className={isChecked ? 'is-checked' : undefined}>
                <input
                  id={id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleItem(entry.item)}
                />
                <span>
                  <strong>{entry.item}</strong>
                  <span className="meta"> {entry.reason} First needed for {entry.from}.</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
