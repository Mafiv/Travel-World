export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-field">
      <label htmlFor="destination-search">Search destinations</label>
      <input
        id="destination-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Try Kyoto, beaches, or Morocco"
        autoComplete="off"
      />
    </div>
  )
}
