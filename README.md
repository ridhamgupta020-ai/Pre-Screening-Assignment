# Celebrare Photo Gallery

A responsive React photo gallery made with Vite and Tailwind CSS for the Celebrare Frontend Intern pre-screening assignment.

## Requirements covered

- Fetches 30 photos from `https://picsum.photos/v2/list?limit=30`.
- Shows loading and error states.
- Responsive grid: 1 column on mobile, 2 on tablet, and 4 on desktop.
- Filters already-fetched photos by author as the user types.
- Uses `useReducer` to toggle favourites.
- Persists favourite IDs in `localStorage` across refreshes.
- Extracts API logic into `useFetchPhotos`, returning `photos`, `loading`, and `error`.
- Uses `useCallback` for the search handler and `useMemo` for filtered photos.

## Run locally

Install Node.js (LTS), then run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your terminal.

## Create a production build

```bash
npm run build
npm run preview
```

## Main files

- `src/hooks/useFetchPhotos.js`: API request and loading/error states.
- `src/reducers/favoritesReducer.js`: reducer and initial localStorage read.
- `src/components/Gallery.jsx`: search, memoized filtering, reducer usage, persistence.
- `src/components/PhotoCard.jsx`: photo card and favourite button.

## Recording reminders

1. Show the grid, author search, favourite toggle, and persistence after refresh.
2. Explain the custom hook's return values and error handling.
3. Explain the `TOGGLE_FAVORITE` reducer action.
4. Explain `useCallback` and `useMemo`, including that they optimize references/calculations rather than being required for basic correctness.
5. Mention one genuine challenge you encountered while building or testing the app.

Do not claim you tested anything you have not personally tested. Review and understand the code before submitting.
