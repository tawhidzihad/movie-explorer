export default function MovieCard({ show, onOpen }) {
  return (
    <li className="border-b border-r border-hair">
      <button
        type="button"
        onClick={() => onOpen(show)}
        className="group flex h-full w-full flex-col p-4 text-left sm:p-6"
      >
        <div className="aspect-2/3 w-full overflow-hidden bg-hair/50">
          {show.poster && (
            <img src={show.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
          )}
        </div>
        <span className="mt-4 font-serif text-lg leading-snug decoration-1 underline-offset-4 group-hover:underline">
          {show.title}
        </span>
        <span className="num mt-1 text-sm text-ink-3">
          {show.year}
          {show.rating != null && ` · ${show.rating.toFixed(1)}`}
        </span>
      </button>
    </li>
  );
}
