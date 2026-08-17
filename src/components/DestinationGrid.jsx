import DestinationCard from './DestinationCard'

export default function DestinationGrid({
  destinations,
  selectedIds,
  onToggle,
  onOpen,
}) {
  if (destinations.length === 0) {
    return (
      <p className="empty-state" role="status">
        No destinations match your search and filters. Clear a filter or try a
        different search term.
      </p>
    )
  }

  return (
    <ul className="destination-grid">
      {destinations.map((destination) => (
        <li key={destination.id}>
          <DestinationCard
            destination={destination}
            selected={selectedIds.has(destination.id)}
            onToggle={onToggle}
            onOpen={onOpen}
          />
        </li>
      ))}
    </ul>
  )
}
