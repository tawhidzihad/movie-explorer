import { useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import MovieGrid from "../components/movies/MovieGrid";
import MovieModal from "../components/movies/MovieModal";
import SearchBar from "../components/movies/SearchBar";
import { useMovies } from "../hooks/useMovies";

function BackIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M10 3L4 8l6 5"
                stroke="#EDECE8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function MovieListing() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [selectedShow, setSelectedShow] = useState(null);
    const { shows, loading, error } = useMovies(query);

    return (
        <div className="flex min-h-screen flex-col bg-ink">
            <Navbar />

            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    {/* Top bar: back button + search */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            aria-label="Go back"
                            className="flex shrink-0 items-center justify-center border border-line bg-surface p-3 text-paper transition-colors hover:border-marquee focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marquee"
                        >
                            <BackIcon />
                        </button>

                        <div className="flex-1">
                            <SearchBar value={query} onChange={setQuery} />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="mt-8">
                        <MovieGrid
                            shows={shows}
                            loading={loading}
                            error={error}
                            onSeeDetails={setSelectedShow}
                        />
                    </div>
                </div>
            </main>

            <Footer />

            <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
        </div>
    );
}