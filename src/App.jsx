import { useMemo, useState } from 'react'
import DestinationDetail from './components/DestinationDetail'
import DestinationGrid from './components/DestinationGrid'
import FilterPanel from './components/FilterPanel'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import StatusBanner from './components/StatusBanner'
import TripPlanner from './components/TripPlanner'
import { DESTINATIONS } from './data/destinations'
import useFilters from './hooks/useFilters'
import useTrip from './hooks/useTrip'
import { countHiddenSelected, filterDestinations } from './utils/filterDestinations'
import './App.css'

export default function App() {
  const { filters, setQuery, updateFilters, resetFilters } = useFilters()
  const trip = useTrip()
  const [openId, setOpenId] = useState(null)

  const visibleDestinations = useMemo(
    () => filterDestinations(DESTINATIONS, filters),
    [filters],
  )

  const hiddenCount = countHiddenSelected(
    trip.trip.destinationIds,
    visibleDestinations,
  )

  const hiddenIds = useMemo(() => {
    const visibleIds = new Set(visibleDestinations.map((destination) => destination.id))
    return new Set(trip.trip.destinationIds.filter((id) => !visibleIds.has(id)))
  }, [trip.trip.destinationIds, visibleDestinations])

  const openDestination = DESTINATIONS.find((destination) => destination.id === openId) ?? null

  return (
    <div className="app-shell">
      <a className="skip-link" href="#destination-catalog">
        Skip to destination catalog
      </a>
      <Header />
      <div className="layout">
        <main id="destination-catalog" className="panel explore-panel">
          <div className="toolbar">
            <SearchBar query={filters.query} onQueryChange={setQuery} />
            <FilterPanel
              region={filters.region}
              budget={filters.budget}
              activity={filters.activity}
              onChange={updateFilters}
              onReset={resetFilters}
            />
          </div>
          <StatusBanner
            resultCount={visibleDestinations.length}
            tripCount={trip.items.length}
            hiddenCount={hiddenCount}
          />
          <DestinationGrid
            destinations={visibleDestinations}
            selectedIds={trip.selectedIds}
            onToggle={trip.toggle}
            onOpen={setOpenId}
          />
          <DestinationDetail
            destination={openDestination}
            selected={openDestination ? trip.selectedIds.has(openDestination.id) : false}
            onToggle={trip.toggle}
            onClose={() => setOpenId(null)}
          />
        </main>
        <TripPlanner
          tripName={trip.trip.name}
          notes={trip.trip.notes}
          items={trip.items}
          hiddenIds={hiddenIds}
          onNameChange={trip.setName}
          onNotesChange={trip.setNotes}
          onMoveUp={trip.moveUp}
          onMoveDown={trip.moveDown}
          onRemove={trip.remove}
          onClear={trip.clear}
        />
      </div>
    </div>
  )
}
