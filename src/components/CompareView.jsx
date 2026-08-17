import { formatStay, titleCase } from '../utils/format'

const FIELDS = [
  { key: 'country', label: 'Country' },
  { key: 'region', label: 'Region' },
  { key: 'budget', label: 'Budget band', format: titleCase },
  { key: 'climate', label: 'Climate', format: titleCase },
  { key: 'stayDays', label: 'Suggested stay', format: formatStay },
  { key: 'walkability', label: 'Walkability' },
  { key: 'crowdLevel', label: 'Crowd' },
  { key: 'language', label: 'Languages' },
  { key: 'currency', label: 'Currency' },
  { key: 'airport', label: 'Airport' },
]

export default function CompareView({ destinations, onRemove, onOpen }) {
  if (destinations.length === 0) {
    return (
      <section className="panel" aria-labelledby="compare-heading">
        <h2 id="compare-heading">Compare</h2>
        <p className="empty-state">
          Use Compare on a destination card to line up two or three places side by side.
        </p>
      </section>
    )
  }

  return (
    <section className="panel compare-panel" aria-labelledby="compare-heading">
      <h2 id="compare-heading">Compare</h2>
      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">Field</th>
              {destinations.map((destination) => (
                <th key={destination.id} scope="col">
                  <button type="button" className="text-link" onClick={() => onOpen(destination.id)}>
                    {destination.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field) => (
              <tr key={field.key}>
                <th scope="row">{field.label}</th>
                {destinations.map((destination) => {
                  const raw = destination[field.key]
                  const value = field.format ? field.format(raw) : raw
                  return <td key={destination.id}>{value}</td>
                })}
              </tr>
            ))}
            <tr>
              <th scope="row">Tagline</th>
              {destinations.map((destination) => (
                <td key={destination.id}>{destination.tagline}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-actions">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            type="button"
            className="button secondary"
            onClick={() => onRemove(destination.id)}
          >
            Remove {destination.name} from compare
          </button>
        ))}
      </div>
    </section>
  )
}
