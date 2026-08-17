# Travel World

Travel World is a React app for browsing a large catalog of destinations, filtering them, and keeping a personal trip list. Selected places stay in the itinerary even when the current search or filters hide them from the catalog.

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

To regenerate the expanded catalog from the seed files:

```bash
node scripts/generate-catalog.mjs
```

## What you can do

- Search and filter more than 100 destinations by region, budget, activity, climate, and best month
- Open a destination dossier with highlights, food, sample days, nearby places, and a month-by-month crowd guide
- Add destinations to a trip that survives later filters, then reorder or clear it
- Compare up to three places, build a packing list, estimate stay costs, and keep a journal
- Read field guides and scan an atlas of catalog pins

Trip details are stored in the browser with `localStorage`.
