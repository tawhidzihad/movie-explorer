export default function RankedList({ shows, onOpen }) {
  return (
    <ol className="border-t border-ink">
      {shows.map((show, i) => (
        <li key={show.id} className="border-b border-hair">
          <button
            type="button"
            onClick={() => onOpen(show)}
            className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-4 py-5 text-left sm:grid-cols-[3rem_minmax(0,1fr)_12rem_5rem_3rem] sm:gap-6"
          >
            <span className="num text-ink-3">{i + 1}</span>
            <span className="truncate font-serif text-xl group-hover:underline underline-offset-4 decoration-1">
              {show.title}
            </span>
            <span className="hidden truncate text-sm text-ink-2 sm:block">
              {show.network ?? "—"}
            </span>
            <span className="num hidden text-sm text-ink-3 sm:block">{show.year}</span>
            <span className="num text-right">
              {show.rating != null ? show.rating.toFixed(1) : "—"}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
