import { useState } from 'react'
import { formatActivityList, formatStay, titleCase } from '../utils/format'
import PostcardArt from './PostcardArt'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'when', label: 'When to go' },
  { id: 'eat', label: 'Eat' },
  { id: 'days', label: 'Sample days' },
  { id: 'nearby', label: 'Nearby' },
]

export default function DestinationDetail({ destination, selected, onToggle, onClose }) {
  const [tab, setTab] = useState('overview')

  if (!destination) {
    return null
  }

  return (
    <section className="detail-panel dossier" aria-labelledby="destination-detail-heading">
      <PostcardArt destination={destination} variant="detail" />
      <div className="dossier-head">
        <p className="eyebrow">{destination.country} · {destination.region}</p>
        <h2 id="destination-detail-heading">{destination.name}</h2>
        <p className="meta">
          {titleCase(destination.budget)} · {formatStay(destination.stayDays)} · {destination.airport}
        </p>
        <p>{destination.blurb}</p>
      </div>
      <div className="tab-list" role="tablist" aria-label={`${destination.name} details`}>
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? 'tab is-active' : 'tab'}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === 'overview' ? (
        <div className="dossier-body">
          <p className="lede">{destination.overview ?? destination.blurb}</p>
          <p className="meta">{destination.visitorProfile}</p>
          <dl className="stat-grid">
            <div>
              <dt>Language</dt>
              <dd>{destination.language}</dd>
            </div>
            <div>
              <dt>Walkability</dt>
              <dd>{destination.walkability} / 5</dd>
            </div>
            <div>
              <dt>Crowd</dt>
              <dd>{destination.crowdLevel} / 5</dd>
            </div>
            <div>
              <dt>Altitude</dt>
              <dd>{destination.altitudeMeters} m</dd>
            </div>
          </dl>
          <p>{destination.gettingThere}</p>
          <p>{destination.gettingAround}</p>
          <p className="meta">Activities: {formatActivityList(destination.activities)}</p>
        </div>
      ) : null}
      {tab === 'highlights' ? (
        <ul className="stack-list">
          {(destination.highlights ?? []).map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
              <p className="meta">{item.timeNeeded}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {tab === 'when' ? (
        <ol className="month-guide">
          {(destination.monthGuide ?? []).map((entry) => (
            <li key={entry.month}>
              <strong>{entry.month}</strong>
              <p className="meta">{entry.weather} · {entry.crowd} crowds</p>
              <p>{entry.advice}</p>
            </li>
          ))}
        </ol>
      ) : null}
      {tab === 'eat' ? (
        <ul className="stack-list">
          {(destination.food ?? []).map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {tab === 'days' ? (
        <ol className="stack-list">
          {(destination.itinerary ?? []).map((item) => (
            <li key={item.day}>
              <strong>Day {item.day}: {item.title}</strong>
              <p>Morning — {item.morning}</p>
              <p>Afternoon — {item.afternoon}</p>
              <p>Evening — {item.evening}</p>
            </li>
          ))}
        </ol>
      ) : null}
      {tab === 'nearby' ? (
        <ul className="stack-list">
          {(destination.nearby ?? []).map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <p>{item.detail}</p>
              <p className="meta">{item.travelTime}</p>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="detail-actions">
        <button
          type="button"
          className="button"
          aria-pressed={selected}
          onClick={() => onToggle(destination.id)}
        >
          {selected ? `Remove ${destination.name} from trip` : `Add ${destination.name} to trip`}
        </button>
        <button type="button" className="button secondary" onClick={onClose}>
          Close details
        </button>
      </div>
    </section>
  )
}
