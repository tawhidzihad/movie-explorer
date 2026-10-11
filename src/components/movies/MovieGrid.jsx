import MovieCard from "./MovieCard";

export default function MovieGrid({ shows, loading, error, onOpen, hasMore, onLoadMore }) {
  if (error) {
    return <p className="py-24 text-center text-accent">{error}</p>;
  }

  if (loading && shows.length === 0) {
    return <p className="py-24 text-center text-ink-3">Loading titles.</p>;
  }

  if (!shows || shows.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-2xl">No titles found</p>
        <p className="mt-2 text-ink-3">Try another title, actor or genre.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 border-l border-t border-hair sm:grid-cols-3 lg:grid-cols-4">
        {shows.map((show) => (
          <MovieCard key={show.id} show={show} onOpen={onOpen} />
        ))}
      </ul>

      {onLoadMore && hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="rounded border border-ink px-6 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper focus:outline-none focus:ring-1 focus:ring-accent"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
