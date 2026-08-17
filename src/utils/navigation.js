export const VIEWS = [
  { id: 'explore', label: 'Explore' },
  { id: 'map', label: 'Map' },
  { id: 'trip', label: 'Trip' },
  { id: 'packing', label: 'Packing' },
  { id: 'budget', label: 'Budget' },
  { id: 'journal', label: 'Journal' },
  { id: 'compare', label: 'Compare' },
  { id: 'guides', label: 'Guides' },
]

export function getViewLabel(id) {
  return VIEWS.find((view) => view.id === id)?.label ?? 'Explore'
}
