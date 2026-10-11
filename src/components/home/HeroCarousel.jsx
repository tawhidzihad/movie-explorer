import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function HeroCarousel({ shows, onOpen, limit = 5 }) {
  const featured = (shows || []).slice(0, limit);
  const count = featured.length;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!count) return;
    timeoutRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(timeoutRef.current);
  }, [count]);

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  if (!count) return null;

  const onMouseEnter = () => clearInterval(timeoutRef.current);
  const onMouseLeave = () => {
    timeoutRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
  };

  const show = featured[index];
  const rating = show.rating != null ? show.rating.toFixed(1) : "Not rated";
  const genres = show.genres?.length ? show.genres.join(", ") : "Not listed";
  const meta = [show.year, show.status].filter(Boolean).join(" · ");

  return (
    <section
      className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-16"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative aspect-2/3 w-full max-w-xs overflow-hidden">
        {show.poster ? (
          <img
            key={show.id}
            src={show.poster}
            alt={show.title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          />
        ) : (
          <div className="h-full w-full bg-hair" />
        )}
      </div>

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

        <div className="mt-12 flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-ink-3">
            <span className="num">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-hair">/</span>
            <span className="num">{String(count).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous title"
              className="rounded p-1 text-ink-2 hover:text-ink hover:bg-hair/30 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <FiChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next title"
              className="rounded p-1 text-ink-2 hover:text-ink hover:bg-hair/30 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <FiChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
