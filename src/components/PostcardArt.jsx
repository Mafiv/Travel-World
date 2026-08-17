export default function PostcardArt({ destination, variant = 'card' }) {
  const photo = destination.photo ?? {
    sky: '#7aa4b3',
    land: '#3d5c4a',
    accent: '#c05746',
    paper: '#e8dcc8',
    pattern: 'grid',
  }
  const pattern = photo.pattern ?? 'grid'
  const gradientId = `${destination.id}-${variant}-sky`

  return (
    <div className="postcard-art" aria-hidden="true">
      <svg viewBox="0 0 320 140" className="postcard-svg">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={photo.sky} />
            <stop offset="100%" stopColor={photo.paper} />
          </linearGradient>
        </defs>
        <rect width="320" height="140" fill={`url(#${gradientId})`} />
        {pattern === 'dunes' ? (
          <>
            <ellipse cx="60" cy="130" rx="90" ry="40" fill={photo.land} opacity="0.55" />
            <ellipse cx="180" cy="140" rx="120" ry="50" fill={photo.land} />
            <ellipse cx="280" cy="128" rx="80" ry="36" fill={photo.accent} opacity="0.45" />
          </>
        ) : null}
        {pattern === 'waves' ? (
          <>
            <path d="M0 88 C40 70, 80 106, 120 88 S200 70, 240 88 S300 106, 320 88 V140 H0 Z" fill={photo.land} />
            <path d="M0 104 C50 90, 90 118, 140 104 S230 90, 280 104 S310 118, 320 104 V140 H0 Z" fill={photo.accent} opacity="0.35" />
          </>
        ) : null}
        {pattern === 'pines' ? (
          <>
            <rect x="0" y="100" width="320" height="40" fill={photo.land} />
            {[30, 70, 110, 160, 210, 250, 290].map((x) => (
              <polygon key={x} points={`${x},108 ${x - 18},54 ${x + 18},54`} fill={photo.accent} />
            ))}
          </>
        ) : null}
        {pattern === 'terraces' ? (
          <>
            <path d="M0 70 L80 58 L160 74 L240 60 L320 72 V140 H0 Z" fill={photo.land} opacity="0.85" />
            <path d="M0 92 L70 84 L150 98 L230 86 L320 96 V140 H0 Z" fill={photo.accent} opacity="0.45" />
            <path d="M0 114 L90 108 L180 118 L320 112 V140 H0 Z" fill={photo.land} />
          </>
        ) : null}
        {pattern === 'arch' ? (
          <>
            <rect x="0" y="108" width="320" height="32" fill={photo.land} />
            <path d="M110 140 V70 A50 50 0 0 1 210 70 V140" fill={photo.paper} />
            <path d="M124 140 V78 A36 36 0 0 1 196 78 V140" fill={photo.accent} opacity="0.55" />
          </>
        ) : null}
        {pattern === 'grid' ? (
          <>
            <rect x="36" y="48" width="70" height="92" fill={photo.land} />
            <rect x="118" y="28" width="54" height="112" fill={photo.accent} />
            <rect x="186" y="56" width="90" height="84" fill={photo.land} opacity="0.8" />
            <rect x="48" y="62" width="18" height="18" fill={photo.paper} opacity="0.5" />
            <rect x="198" y="70" width="18" height="18" fill={photo.paper} opacity="0.5" />
          </>
        ) : null}
        <circle cx="268" cy="28" r="16" fill="#f4e4c1" opacity="0.9" />
        <rect x="248" y="8" width="54" height="38" fill="none" stroke="#f4efe6" strokeWidth="2" rx="2" />
      </svg>
      <span className="postcard-stamp">{destination.country}</span>
    </div>
  )
}
