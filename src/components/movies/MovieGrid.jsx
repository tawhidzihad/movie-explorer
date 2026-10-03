import MovieCard from "./MovieCard";

export default function MovieGrid({ shows, loading, error, onSeeDetails, onPlay }) {
    if (error) {
        return (
            <div className="py-20 text-center rounded-xl bg-red-950/20 border border-red-900/40 p-8">
                <p className="font-heading text-lg font-bold text-red-400">
                    {error}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Please check your network connection or try searching another title.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex flex-col rounded-lg overflow-hidden bg-[#1a1a1a] border border-gray-800 animate-pulse">
                        <div className="aspect-2/3 w-full bg-[#252525]" />
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-[#282828] rounded w-3/4" />
                            <div className="h-3 bg-[#282828] rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!shows || shows.length === 0) {
        return (
            <div className="py-20 text-center rounded-xl bg-[#181818] border border-gray-800 p-8">
                <h3 className="font-heading font-bold text-xl text-white">No titles found</h3>
                <p className="font-body text-sm text-gray-400 mt-2">
                    Try searching for another movie or TV show title.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {shows.map((show) => (
                <MovieCard
                    key={show.id}
                    show={show}
                    onSeeDetails={onSeeDetails}
                    onPlay={onPlay}
                />
            ))}
        </div>
    );
}