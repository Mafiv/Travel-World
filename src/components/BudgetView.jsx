import { formatMoney, formatStay, titleCase } from '../utils/format'

function lineTotal(destination, style) {
  const daily = destination.dailyCosts?.[style]?.amount ?? 0
  return daily * destination.stayDays
}

export default function BudgetView({ items, style, onStyleChange }) {
  const total = items.reduce((sum, destination) => sum + lineTotal(destination, style), 0)

  return (
    <section className="panel budget-panel" aria-labelledby="budget-heading">
      <h2 id="budget-heading">Budget</h2>
      <div className="filter-field">
        <label htmlFor="budget-style">Daily style</label>
        <select
          id="budget-style"
          value={style}
          onChange={(event) => onStyleChange(event.target.value)}
        >
          <option value="modest">Modest</option>
          <option value="comfortable">Comfortable</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
      {items.length === 0 ? (
        <p className="empty-state">Add destinations to see a stay-length estimate in local currency.</p>
      ) : (
        <table className="budget-table">
          <caption>Estimated on-the-ground costs by stay length</caption>
          <thead>
            <tr>
              <th scope="col">Destination</th>
              <th scope="col">Stay</th>
              <th scope="col">Daily</th>
              <th scope="col">Stay total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((destination) => {
              const daily = destination.dailyCosts?.[style]
              return (
                <tr key={destination.id}>
                  <th scope="row">
                    {destination.name}
                    <div className="meta">{destination.country} · {titleCase(destination.budget)} catalog band</div>
                  </th>
                  <td>{formatStay(destination.stayDays)}</td>
                  <td>{daily ? formatMoney(daily) : '—'}</td>
                  <td>{daily ? formatMoney({ ...daily, amount: lineTotal(destination, style) }) : '—'}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3}>
                Mixed-currency total of numeric amounts (not converted)
              </th>
              <td>{total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <p className="meta">
        Figures are educational daily bands, not live prices. Currencies are not converted into one unit
        because this app stays offline.
      </p>
    </section>
  )
}
