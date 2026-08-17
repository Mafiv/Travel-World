export default function MapView({ destinations, selectedIds, onOpen, onToggle }) {
  return (
    <section className="panel map-panel" aria-labelledby="map-heading">
      <h2 id="map-heading">Atlas</h2>
      <p className="meta">
        Pins are placed from catalog coordinates. Selected trip stops use the terracotta marker.
      </p>
      <div className="atlas">
        <svg viewBox="0 0 900 460" className="atlas-svg" role="img" aria-label="World map of destinations">
          <rect width="900" height="460" fill="#d7ebe7" />
          <path
            d="M80 80 C200 40, 320 90, 430 70 S640 30, 820 90 V400 H80 Z"
            fill="#b7cfc4"
            opacity="0.8"
          />
          {destinations.map((destination) => {
            const x = ((destination.coordinates.lng + 180) / 360) * 860 + 20
            const y = ((90 - destination.coordinates.lat) / 180) * 400 + 20
            const selected = selectedIds.has(destination.id)
            return (
              <g key={destination.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={selected ? 8 : 5}
                  fill={selected ? '#c05746' : '#0f4c5c'}
                />
                <title>{destination.name}</title>
              </g>
            )
          })}
        </svg>
      </div>
      <ul className="pin-list">
        {destinations.map((destination) => (
          <li key={destination.id}>
            <button type="button" className="text-link" onClick={() => onOpen(destination.id)}>
              {destination.name}
            </button>
            <span className="meta">
              {destination.country} · {destination.coordinates.lat.toFixed(1)}, {destination.coordinates.lng.toFixed(1)}
            </span>
            <button type="button" className="button ghost" onClick={() => onToggle(destination.id)}>
              {selectedIds.has(destination.id)
                ? `Remove ${destination.name} from trip`
                : `Add ${destination.name} to trip`}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
