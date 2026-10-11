import { useEffect } from "react";

export default function MovieModal({ show, onClose }) {
  useEffect(() => {
    if (!show) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  if (!show) return null;

  const details = [
    ["Rating", show.rating != null ? show.rating.toFixed(1) : "Not rated"],
    ["Premiered", show.year],
    ["Status", show.status ?? "Unknown"],
    ["Network", show.network ?? "Unknown"],
    ["Genres", show.genres?.length ? show.genres.join(", ") : "None listed"],
    ["Language", show.language ?? "Unknown"],
    ["Runtime", show.runtime ? `${show.runtime} min` : "Unknown"],
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper/90 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-10 grid max-w-4xl gap-10 border border-ink bg-paper p-6 sm:p-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        <div className="flex items-start justify-between gap-6 md:col-span-2">
          <h2 id="modal-title" className="font-serif text-4xl tracking-tight sm:text-5xl">
            {show.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border-b border-ink pb-0.5 text-sm font-medium hover:border-accent hover:text-accent"
          >
            Close
          </button>
        </div>

        <div>
          {show.poster ? (
            <img src={show.backdrop || show.poster} alt="" className="aspect-2/3 w-full object-cover" />
          ) : (
            <div className="aspect-2/3 w-full bg-hair" />
          )}
        </div>

        <div className="flex flex-col gap-8">
          <p className="font-serif text-lg leading-relaxed text-ink-2">{show.summary}</p>

          <dl className="grid grid-cols-[7rem_1fr] gap-x-6 gap-y-3 border-t border-hair pt-6 text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-ink-3">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          {show.officialSite && (
            <a
              href={show.officialSite}
              target="_blank"
              rel="noreferrer"
              className="self-start border-b border-hair pb-1 text-sm text-ink transition-colors hover:border-ink"
            >
              Official site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
