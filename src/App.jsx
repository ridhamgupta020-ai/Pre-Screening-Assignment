import Gallery from "./components/Gallery.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Photo Gallery home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <GalleryMark />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight">Photo Gallery</span>
              <span className="block text-xs text-slate-500">A little inspiration, every day</span>
            </span>
          </a>
          <span className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">
            Celebrare • Frontend Assignment
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Discover photography
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find a frame you love.</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Browse beautiful photos, search by photographer, and save your favourites for later.
          </p>
        </section>
        <Gallery />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 text-sm text-slate-500 sm:px-8">
          Photos provided by the <a className="font-medium text-slate-700 underline underline-offset-4" href="https://picsum.photos/" target="_blank" rel="noreferrer">Lorem Picsum API</a>.
        </div>
      </footer>
    </div>
  );
}

function GalleryMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9" cy="9" r="1.7" fill="currentColor" />
      <path d="m5.5 17 4.2-4.2 2.8 2.5 2.5-3 3.5 4.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
