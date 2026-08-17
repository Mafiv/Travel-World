import { VIEWS } from '../utils/navigation'

export default function Header({ view, onNavigate, tripCount }) {
  return (
    <header className="site-header">
      <div className="brand">
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#0f4c5c" />
          <ellipse cx="32" cy="32" rx="14" ry="30" fill="none" stroke="#e8dcc8" strokeWidth="2" />
          <ellipse cx="32" cy="32" rx="30" ry="12" fill="none" stroke="#e8dcc8" strokeWidth="2" />
          <circle cx="32" cy="32" r="30" fill="none" stroke="#e8dcc8" strokeWidth="3" />
        </svg>
        <div>
          <p className="eyebrow">Bureau of slow travel</p>
          <h1>Travel World</h1>
          <p>Browse destinations and keep a trip list that survives filters.</p>
        </div>
      </div>
      <nav className="app-nav" aria-label="Primary">
        {VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={view === item.id ? 'nav-link is-active' : 'nav-link'}
            aria-current={view === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
            {item.id === 'trip' ? <span className="nav-count">{tripCount}</span> : null}
          </button>
        ))}
      </nav>
    </header>
  )
}
