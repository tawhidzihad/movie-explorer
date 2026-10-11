export default function HeroBanner({ show, onOpen }) {
  const rating = show.rating != null ? show.rating.toFixed(1) : "Not rated";
  const genres = show.genres?.length ? show.genres.join(", ") : "Not listed";
  const meta = [show.year, show.status].filter(Boolean).join(" · ");

  return (
    <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-16">
      <button
        type="button"
        onClick={() => onOpen(show)}
        aria-label={`Open details for ${show.title}`}
        className="block w-full max-w-xs justify-self-start"
      >
        {show.poster ? (
          <img src={show.poster} alt="" className="aspect-2/3 w-full object-cover" />
        ) : (
          <div className="aspect-2/3 w-full bg-hair" />
        )}
      </button>

      <div>
        <p className="num text-sm text-ink-3">{meta}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
          {show.title}
        </h1>
        <p className="mt-8 line-clamp-5 max-w-xl font-serif text-lg leading-relaxed text-ink-2">
          {show.summary}
        </p>

        <dl className="mt-10 grid max-w-xl grid-cols-[6rem_1fr] gap-x-6 gap-y-3 border-t border-hair pt-6 text-sm">
          <dt className="text-ink-3">Rating</dt>
          <dd className="num">{rating}</dd>
          <dt className="text-ink-3">Genres</dt>
          <dd>{genres}</dd>
          <dt className="text-ink-3">Network</dt>
          <dd>{show.network ?? "Not listed"}</dd>
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-8 text-sm">
          <button
            type="button"
            onClick={() => onOpen(show)}
            className="border-b border-ink pb-1 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Read full details
          </button>
          {show.officialSite && (
            <a
              href={show.officialSite}
              target="_blank"
              rel="noreferrer"
              className="border-b border-hair pb-1 text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Official site
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
