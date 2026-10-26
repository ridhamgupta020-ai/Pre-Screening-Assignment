/**
 * Favourite state is an array of photo IDs.
 * Supported action: { type: "TOGGLE_FAVORITE", id: string }
 */
export default function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const id = String(action.id);
      const isFavorite = state.includes(id);

      return isFavorite
        ? state.filter((favoriteId) => favoriteId !== id)
        : [...state, id];
    }

    default:
      return state;
  }
}

export function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem("celebrare-photo-favorites");
    if (!savedFavorites) return [];

    const parsedFavorites = JSON.parse(savedFavorites);
    return Array.isArray(parsedFavorites)
      ? parsedFavorites.map(String)
      : [];
  } catch {
    // If storage is blocked or its contents are invalid, start with no favourites.
    return [];
  }
}
