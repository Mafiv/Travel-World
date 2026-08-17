import { MONTHS } from '../data/climate'
import { ACTIVITIES, BUDGETS, CLIMATES, REGIONS } from '../data/destinations'
import { titleCase } from '../utils/format'

export default function FilterPanel({
  region,
  budget,
  activity,
  climate,
  month,
  sort,
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
      <div className="filter-row">
        <div className="filter-field">
          <label htmlFor="climate-filter">Climate</label>
          <select
            id="climate-filter"
            value={climate}
            onChange={(event) => onChange({ climate: event.target.value })}
          >
            <option value="all">All climates</option>
            {CLIMATES.map((value) => (
              <option key={value} value={value}>
                {titleCase(value)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="month-filter">Best month</label>
          <select
            id="month-filter"
            value={month}
            onChange={(event) => onChange({ month: event.target.value })}
          >
            <option value="all">Any month</option>
            {MONTHS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="sort-filter">Sort by</label>
          <select
            id="sort-filter"
            value={sort}
            onChange={(event) => onChange({ sort: event.target.value })}
          >
            <option value="featured">Featured</option>
            <option value="name">Name</option>
            <option value="stay">Trip length</option>
            <option value="budget">Budget</option>
            <option value="region">Region</option>
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
