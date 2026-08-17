import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { DESTINATIONS } from './data/destinations'

async function addKyotoToTrip(user) {
  await user.click(screen.getByRole('button', { name: 'Add Kyoto to trip' }))
}

describe('Travel World app', () => {
  it('shows the catalog heading and labeled browse controls', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Travel World' })).toBeInTheDocument()
    expect(screen.getByLabelText('Search destinations')).toBeInTheDocument()
    expect(screen.getByLabelText('Region')).toBeInTheDocument()
    expect(screen.getByLabelText('Budget')).toBeInTheDocument()
    expect(screen.getByLabelText('Activity')).toBeInTheDocument()
    expect(screen.getByLabelText('Trip name')).toBeInTheDocument()
    expect(screen.getByLabelText('Trip notes')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      `${DESTINATIONS.length} destinations match your filters.`,
    )
  })

  it('filters the catalog by search text', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Search destinations'), 'kyoto')

    expect(screen.getByRole('heading', { name: 'Kyoto' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Lisbon' })).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      '1 destination matches your filters.',
    )
  })

  it('keeps a selected destination in the trip after a filter hides it', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addKyotoToTrip(user)
    await user.selectOptions(screen.getByLabelText('Region'), 'Europe')

    const trip = screen.getByRole('list', { name: 'Trip itinerary' })
    expect(within(trip).getByText('Kyoto')).toBeInTheDocument()
    expect(within(trip).getByText(/Hidden by the current filters/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Kyoto' })).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      '1 selected destination is hidden by the current filters.',
    )
  })

  it('announces when filters match nothing', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Search destinations'), 'atlantis')

    expect(
      screen.getByText(/No destinations match your search and filters/),
    ).toBeInTheDocument()
  })

  it('opens destination details and can close them', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'View Kyoto details' }))

    expect(
      screen.getByRole('heading', { name: 'Kyoto', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Temple gardens, neighborhood lanes/),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close details' }))
    expect(
      screen.queryByRole('heading', { name: 'Kyoto', level: 2 }),
    ).not.toBeInTheDocument()
  })

  it('reorders destinations in the trip list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addKyotoToTrip(user)
    await user.click(screen.getByRole('button', { name: 'Add Lisbon to trip' }))

    const trip = screen.getByRole('list', { name: 'Trip itinerary' })
    const items = within(trip).getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Kyoto')
    expect(items[1]).toHaveTextContent('Lisbon')

    await user.click(screen.getByRole('button', { name: 'Move Lisbon up' }))

    const reordered = within(trip).getAllByRole('listitem')
    expect(reordered[0]).toHaveTextContent('Lisbon')
    expect(reordered[1]).toHaveTextContent('Kyoto')
  })

  it('clears search and facet filters without dropping the trip', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addKyotoToTrip(user)
    await user.type(screen.getByLabelText('Search destinations'), 'lisbon')
    await user.selectOptions(screen.getByLabelText('Region'), 'Europe')
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))

    expect(screen.getByLabelText('Search destinations')).toHaveValue('')
    expect(screen.getByLabelText('Region')).toHaveValue('all')
    expect(screen.getByRole('heading', { name: 'Kyoto' })).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Trip itinerary' })).toHaveTextContent(
      'Kyoto',
    )
  })

  it('clears the trip name, notes, and selected destinations', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addKyotoToTrip(user)
    await user.type(screen.getByLabelText('Trip name'), 'Cherry blossom week')
    await user.type(screen.getByLabelText('Trip notes'), 'Book the ryokan early')
    await user.click(screen.getByRole('button', { name: 'Clear trip' }))

    expect(screen.getByLabelText('Trip name')).toHaveValue('')
    expect(screen.getByLabelText('Trip notes')).toHaveValue('')
    expect(screen.getByText(/No destinations in this trip yet/)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('0 destinations in your trip')
  })

  it('filters the catalog by climate', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText('Climate'), 'arid')

    expect(screen.queryByRole('heading', { name: 'Kyoto' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Marrakech' })).toBeInTheDocument()
  })

  it('builds a packing list from trip destinations', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addKyotoToTrip(user)
    await user.click(screen.getByRole('button', { name: 'Packing' }))

    expect(screen.getByRole('heading', { name: 'Packing' })).toBeInTheDocument()
    expect(screen.getAllByText(/First needed for Kyoto/).length).toBeGreaterThan(0)
    await user.click(screen.getByRole('checkbox', { name: /Passport/ }))
    expect(screen.getByRole('checkbox', { name: /Passport/ })).toBeChecked()
  })

  it('compares two destinations side by side', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Compare Kyoto' }))
    await user.click(screen.getByRole('button', { name: 'Compare Lisbon' }))
    await user.click(screen.getByRole('button', { name: 'Compare', exact: true }))

    expect(screen.getByRole('heading', { name: 'Compare' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Kyoto' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Lisbon' })).toBeInTheDocument()
  })

  it('opens a field guide', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Guides' }))
    await user.click(
      screen.getByRole('button', { name: /How to read a shoulder season/ }),
    )

    expect(
      screen.getByRole('heading', { name: 'How to read a shoulder season' }),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Back to guides' }))
    expect(screen.getByRole('heading', { name: 'Field guides' })).toBeInTheDocument()
  })
})
