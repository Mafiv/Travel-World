# Travel World

Travel World is a React app for browsing a small catalog of destinations, filtering them, and keeping a personal trip list. Selected places stay in the itinerary even when the current search or filters hide them from the catalog.

This project is educational. It does not book travel or call a live booking API.

The GitHub repository should remain **private** if you submit it to a React task workflow that requires a private, original project.

## Requirements

- Node.js 20
- npm (the repository includes `package-lock.json` and no other lockfile)

## Scripts

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
```

`npm test` runs Vitest in jsdom. The tests use the in-repo destination catalog and `localStorage` only. They do not need accounts, tokens, or machine-specific files.

## What you can do

- Search destinations by name, country, or description
- Filter by region, budget, and activity
- Add destinations to a trip, reorder them, and add a trip name and notes
- Keep selected destinations in the trip after filters change
- Read destination details without leaving the catalog

Trip details are stored in the browser with `localStorage`.
