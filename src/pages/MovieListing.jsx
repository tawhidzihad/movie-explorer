import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router";
import MovieGrid from "../components/movies/MovieGrid";
import MovieModal from "../components/movies/MovieModal";
import TrailerModal from "../components/movies/TrailerModal";
import SearchBar from "../components/movies/SearchBar";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useMovies } from "../hooks/useMovies";

export default function MovieListing() {
    useDocumentTitle("MovieExplorer - Browse All Titles & Search Catalog");

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [selectedShow, setSelectedShow] = useState(null);
    const [trailerShow, setTrailerShow] = useState(null);

    const handleQueryChange = (val) => {
        if (val.trim()) {
            setSearchParams({ q: val.trim() });
        } else {
            setSearchParams({});
        }
    };

    const { shows, loading, error } = useMovies(query);

    return (
        <main className="min-h-screen bg-[#141414] text-white selection:bg-[#E50914] selection:text-white pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
                {/* Header bar: back button + search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        aria-label="Go back to Home"
                        className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#2F2F2F] bg-[#1a1a1a] px-4 py-3 text-white transition-all hover:border-[#E50914] hover:bg-[#222222] cursor-pointer shadow-md"
                    >
                        <IoArrowBack className="h-5 w-5" />
                        <span className="text-xs sm:text-sm font-semibold">Home</span>
                    </button>

                    <div className="flex-1">
                        <SearchBar value={query} onChange={handleQueryChange} />
                    </div>
                </div>

                {/* Category Title & Count */}
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-800">
                    <h1 className="font-heading font-black text-xl sm:text-2xl text-white">
                        {query ? `Results for "${query}"` : "All Movies & TV Series"}
                    </h1>
                    <span className="text-xs text-gray-400 font-medium">
                        {shows.length > 0 ? `${shows.length} titles found` : ""}
                    </span>
                </div>

                {/* Grid of Movie Cards */}
                <MovieGrid
                    shows={shows}
                    loading={loading}
                    error={error}
                    onSeeDetails={setSelectedShow}
                    onPlay={setTrailerShow}
                />
            </div>

            {/* Movie Details Modal */}
            <MovieModal
                show={selectedShow}
                onClose={() => setSelectedShow(null)}
                onPlay={setTrailerShow}
            />

            {/* Trailer Video Player Modal */}
            <TrailerModal
                show={trailerShow}
                onClose={() => setTrailerShow(null)}
                onMoreInfo={setSelectedShow}
            />
        </main>
    );
}