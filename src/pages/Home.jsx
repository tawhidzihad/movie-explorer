import { useState, useMemo } from "react";
import HeroBanner from "../components/home/HeroBanner";
import TopTenRow from "../components/home/TopTenRow";
import GenreShowcase from "../components/home/GenreShowcase";
import NetflixFeaturesAndFAQ from "../components/home/NetflixFeaturesAndFAQ";
import MovieRow from "../components/home/MovieRow";
import MovieModal from "../components/movies/MovieModal";
import TrailerModal from "../components/movies/TrailerModal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useMovies } from "../hooks/useMovies";

export default function Home() {
    useDocumentTitle("MovieExplorer - Watch TV Shows Online, Watch Movies Online");

    const [selectedShow, setSelectedShow] = useState(null);
    const [trailerShow, setTrailerShow] = useState(null);
    const { shows, loading, error } = useMovies("");

    // Slice categorized sections
    const trendingShows = useMemo(() => {
        return shows.slice(0, 20);
    }, [shows]);

    const topRatedShows = useMemo(() => {
        return [...shows]
            .filter((s) => s.rating && s.rating >= 8.2)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 20);
    }, [shows]);

    const actionSciFiShows = useMemo(() => {
        return shows
            .filter((s) =>
                s.genres?.some((g) =>
                    ["Action", "Science-Fiction", "Adventure", "Thriller"].includes(g)
                )
            )
            .slice(0, 20);
    }, [shows]);

    const handleOpenPlay = (show) => {
        setTrailerShow(show);
    };

    const handleOpenDetails = (show) => {
        setSelectedShow(show);
    };

    return (
        <div className="relative min-h-screen bg-[#141414] text-white selection:bg-[#E50914] selection:text-white pb-10">
            {/* Netflix Featured Hero Billboard */}
            <HeroBanner
                onSeeDetails={handleOpenDetails}
                onPlay={handleOpenPlay}
            />

            {/* Error banner if any */}
            {error && (
                <div className="mx-auto max-w-4xl px-4 py-4 mt-4 rounded bg-red-950/60 border border-red-800 text-red-200 text-center text-sm">
                    {error} — showing cached titles.
                </div>
            )}

            {/* Skeleton Loading State */}
            {loading && shows.length === 0 ? (
                <div className="space-y-12 px-6 py-12 max-w-7xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <div className="h-6 w-48 bg-[#222222] rounded animate-pulse" />
                            <div className="flex gap-4 overflow-hidden">
                                {[1, 2, 3, 4, 5, 6].map((j) => (
                                    <div
                                        key={j}
                                        className="h-64 w-44 shrink-0 rounded-md bg-[#222222] animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative z-20 -mt-16 sm:-mt-24 space-y-2 sm:space-y-6">
                    {/* 1. Trending Now Carousel Row */}
                    <MovieRow
                        title="Trending Now"
                        shows={trendingShows}
                        onSeeDetails={handleOpenDetails}
                        onPlay={handleOpenPlay}
                        badge="Popular"
                    />

                    {/* 2. SECTION 1: Top 10 TV Shows & Movies Today (Netflix 3D Numbers) */}
                    <TopTenRow
                        shows={trendingShows}
                        onSeeDetails={handleOpenDetails}
                        onPlay={handleOpenPlay}
                    />

                    {/* 3. Critically Acclaimed & Award Winning */}
                    <MovieRow
                        title="Critically Acclaimed & Top Rated"
                        shows={topRatedShows}
                        onSeeDetails={handleOpenDetails}
                        onPlay={handleOpenPlay}
                        badge="98% Match"
                    />

                    {/* 4. SECTION 2: Explore by Curated Categories / Genre Shelf */}
                    <GenreShowcase
                        allShows={shows}
                        onSeeDetails={handleOpenDetails}
                        onPlay={handleOpenPlay}
                    />

                    {/* 5. Action, Thriller & Sci-Fi Blockbusters Row */}
                    <MovieRow
                        title="Action & Sci-Fi Blockbusters"
                        shows={actionSciFiShows}
                        onSeeDetails={handleOpenDetails}
                        onPlay={handleOpenPlay}
                    />

                    {/* 6. SECTION 3: Netflix Features Showcase + Interactive FAQ Accordion + CTA */}
                    <NetflixFeaturesAndFAQ />
                </div>
            )}

            {/* Movie Details Modal */}
            <MovieModal
                show={selectedShow}
                onClose={() => setSelectedShow(null)}
                onPlay={handleOpenPlay}
            />

            {/* Trailer Video Player Modal */}
            <TrailerModal
                show={trailerShow}
                onClose={() => setTrailerShow(null)}
                onMoreInfo={handleOpenDetails}
            />
        </div>
    );
}