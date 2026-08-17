export default function Header() {
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
          <h1>Travel World</h1>
          <p>Browse destinations and keep a trip list that survives filters.</p>
        </div>
      </div>
    </header>
  )
}
