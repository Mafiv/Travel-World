import { ACTIVITIES, BUDGETS, REGIONS } from '../data/destinations'
import { titleCase } from '../utils/format'

export default function FilterPanel({
  region,
  budget,
  activity,
  onChange,
  onReset,
}) {
  return (
    <fieldset>
      <legend className="filter-legend">Filter destinations</legend>
      <div className="filter-row">
        <div className="filter-field">
          <label htmlFor="region-filter">Region</label>
          <select
            id="region-filter"
            value={region}
            onChange={(event) => onChange({ region: event.target.value })}
          >
            <option value="all">All regions</option>
            {REGIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="budget-filter">Budget</label>
          <select
            id="budget-filter"
            value={budget}
            onChange={(event) => onChange({ budget: event.target.value })}
          >
            <option value="all">All budgets</option>
            {BUDGETS.map((value) => (
              <option key={value} value={value}>
                {titleCase(value)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="activity-filter">Activity</label>
          <select
            id="activity-filter"
            value={activity}
            onChange={(event) => onChange({ activity: event.target.value })}
          >
            <option value="all">All activities</option>
            {ACTIVITIES.map((value) => (
              <option key={value} value={value}>
                {titleCase(value)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="filter-actions card-actions">
        <button type="button" className="button secondary" onClick={onReset}>
          Clear filters
        </button>
      </div>
    </fieldset>
  )
}
