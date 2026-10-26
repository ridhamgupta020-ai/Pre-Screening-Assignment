import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import favoritesReducer, { getInitialFavorites } from "../reducers/favoritesReducer.js";
import PhotoCard from "./PhotoCard.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, getInitialFavorites);

  // Persist every reducer update. Initial state is restored by getInitialFavorites().
  useEffect(() => {
    try {
      localStorage.setItem("celebrare-photo-favorites", JSON.stringify(favorites));
    } catch {
      // The gallery remains usable if browser storage is unavailable.
    }
  }, [favorites]);

  // useCallback keeps the search handler reference stable between renders.
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE_FAVORITE", id: String(photoId) });
  }, []);

  // useMemo recomputes the filtered list only when photos or searchTerm change.
  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    if (!normalizedSearch) return photos;

    return photos.filter((photo) =>
      photo.author.toLocaleLowerCase().includes(normalizedSearch)
    );
  }, [photos, searchTerm]);

  const favoriteCount = favorites.length;

  return (
    <section aria-label="Photo gallery">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-rose-500" aria-hidden="true">
            <path d="M20.8 8.7c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-slate-600">Favourites</span>
          <span className="rounded-full bg-rose-50 px-2 py-0.5 font-bold text-rose-600">{favoriteCount}</span>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {loading ? "Loading photos..." : `${filteredPhotos.length} ${filteredPhotos.length === 1 ? "photo" : "photos"}`}
          {!loading && searchTerm.trim() && ` matching “${searchTerm.trim()}”`}
        </p>
        <p className="text-xs text-slate-400">30 photos from Picsum</p>
      </div>

      {loading && <LoadingState />}

      {!loading && error && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M12 8v5m0 3h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-red-900">Couldn’t load the photos</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-red-700">{error}</p>
          <p className="mt-2 text-xs text-red-600">Check your internet connection and refresh the page to try again.</p>
        </div>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(String(photo.id))}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <svg viewBox="0 0 24 24" fill="none" className="mx-auto h-9 w-9 text-slate-400" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <h2 className="mt-3 text-base font-semibold text-slate-800">No photos found</h2>
          <p className="mt-1 text-sm text-slate-500">Try another author name.</p>
        </div>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-20">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      <p className="mt-4 text-sm font-medium text-slate-700">Loading your gallery...</p>
      <p className="mt-1 text-xs text-slate-400">Fetching photos from Picsum</p>
    </div>
  );
}
