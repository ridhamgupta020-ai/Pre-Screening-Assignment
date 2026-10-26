export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/420`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[10/7] overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            // Use the API's original image URL if the resized URL is unavailable.
            if (event.currentTarget.src !== photo.download_url) {
              event.currentTarget.src = photo.download_url;
            }
          }}
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavorite}
          title={isFavorite ? "Remove from favourites" : "Add to favourites"}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur transition focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
            isFavorite
              ? "bg-white text-rose-500"
              : "bg-slate-950/55 text-white hover:bg-white hover:text-rose-500"
          }`}
        >
          <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} className="h-5 w-5" aria-hidden="true">
            <path d="M20.8 8.7c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Photographer</p>
          <h2 className="mt-1 truncate text-sm font-semibold text-slate-800">{photo.author}</h2>
        </div>
        {isFavorite && (
          <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
            Favourite
          </span>
        )}
      </div>
    </article>
  );
}
