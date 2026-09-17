import MovieCard from "./MovieCard";

export default function MovieGrid({ shows, loading, error, onSeeDetails }) {
    if (error) {
        return (
            <p className="py-16 text-center font-body text-sm text-muted">
                {error}
            </p>
        );
    }

    if (loading) {
        return (
            <p className="py-16 text-center font-body text-sm text-muted">
                Loading shows…
            </p>
        );
    }

    if (shows.length === 0) {
        return (
            <p className="py-16 text-center font-body text-sm text-muted">
                No shows found. Try a different title.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shows.map((show) => (
                <MovieCard key={show.id} show={show} onSeeDetails={onSeeDetails} />
            ))}
        </div>
    );
}