import { useMemo, useState } from 'react'
import BudgetView from './components/BudgetView'
import CompareView from './components/CompareView'
import DestinationDetail from './components/DestinationDetail'
import DestinationGrid from './components/DestinationGrid'
import FilterPanel from './components/FilterPanel'
import GuidesView from './components/GuidesView'
import Header from './components/Header'
import JournalView from './components/JournalView'
import MapView from './components/MapView'
import PackingView from './components/PackingView'
import SearchBar from './components/SearchBar'
import StatusBanner from './components/StatusBanner'
import TripPlanner from './components/TripPlanner'
import { DESTINATIONS } from './data/destinations'
import useFilters from './hooks/useFilters'
import useTrip from './hooks/useTrip'
import { countHiddenSelected, filterDestinations } from './utils/filterDestinations'
import './App.css'

const EMPTY_DRAFT = { title: '', body: '', destinationId: '' }

export default function App() {
  const { filters, setQuery, updateFilters, resetFilters } = useFilters()
  const trip = useTrip()
  const [openId, setOpenId] = useState(null)
  const [view, setView] = useState('explore')
  const [guideId, setGuideId] = useState(null)
  const [budgetStyle, setBudgetStyle] = useState('comfortable')
  const [journalDraft, setJournalDraft] = useState(EMPTY_DRAFT)

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

  function navigate(nextView) {
    setView(nextView)
    if (nextView !== 'guides') {
      setGuideId(null)
    }
  }

  function openDestinationId(id) {
    setOpenId(id)
    setView('explore')
  }

  const exploreMain = (
    <main id="destination-catalog" className="panel explore-panel">
      <div className="toolbar">
        <SearchBar query={filters.query} onQueryChange={setQuery} />
        <FilterPanel
          region={filters.region}
          budget={filters.budget}
          activity={filters.activity}
          climate={filters.climate}
          month={filters.month}
          sort={filters.sort}
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
        compareIds={trip.compareIds}
        onToggle={trip.toggle}
        onOpen={openDestinationId}
        onCompare={trip.toggleCompare}
      />
      <DestinationDetail
        destination={openDestination}
        selected={openDestination ? trip.selectedIds.has(openDestination.id) : false}
        onToggle={trip.toggle}
        onClose={() => setOpenId(null)}
      />
    </main>
  )

  return (
    <div className="app-shell">
      <a className="skip-link" href="#destination-catalog">
        Skip to destination catalog
      </a>
      <Header view={view} onNavigate={navigate} tripCount={trip.items.length} />
      <div className={view === 'explore' || view === 'trip' ? 'layout' : 'layout layout-single'}>
        {view === 'explore' ? exploreMain : null}
        {view === 'trip' ? (
          <main id="trip-board" className="panel explore-panel trip-main">
            <h2>Itinerary board</h2>
            <p>
              Reorder stops in the trip column. Selected places stay here even when Explore
              filters hide them from the catalog.
            </p>
            <StatusBanner
              resultCount={visibleDestinations.length}
              tripCount={trip.items.length}
              hiddenCount={hiddenCount}
            />
          </main>
        ) : null}
        {view === 'map' ? (
          <MapView
            destinations={visibleDestinations}
            selectedIds={trip.selectedIds}
            onOpen={openDestinationId}
            onToggle={trip.toggle}
          />
        ) : null}
        {view === 'packing' ? (
          <PackingView
            items={trip.items}
            checked={trip.packingChecked}
            onToggleItem={trip.togglePacked}
          />
        ) : null}
        {view === 'budget' ? (
          <BudgetView
            items={trip.items}
            style={budgetStyle}
            onStyleChange={setBudgetStyle}
          />
        ) : null}
        {view === 'journal' ? (
          <JournalView
            entries={trip.trip.journal}
            items={trip.items}
            draft={journalDraft}
            onDraftChange={(next) => setJournalDraft((current) => ({ ...current, ...next }))}
            onSave={() => {
              trip.addJournal(journalDraft)
              setJournalDraft(EMPTY_DRAFT)
            }}
            onDelete={trip.deleteJournal}
          />
        ) : null}
        {view === 'compare' ? (
          <CompareView
            destinations={trip.compareItems}
            onRemove={trip.removeCompare}
            onOpen={openDestinationId}
          />
        ) : null}
        {view === 'guides' ? (
          <GuidesView
            activeId={guideId}
            onOpen={setGuideId}
            onBack={() => setGuideId(null)}
          />
        ) : null}
        {view === 'explore' || view === 'trip' ? (
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
        ) : null}
      </div>
    </div>
  )
}
