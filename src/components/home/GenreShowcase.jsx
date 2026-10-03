import { useState, useMemo, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const GENRES = [
    { id: "all", label: "🔥 All Popular", query: "" },
    { id: "action", label: "💥 Action & Thriller", query: "Action" },
    { id: "scifi", label: "🚀 Sci-Fi & Fantasy", query: "Science-Fiction" },
    { id: "drama", label: "🎭 Drama & Romance", query: "Drama" },
    { id: "crime", label: "🕵️ Crime & Mystery", query: "Crime" },
    { id: "comedy", label: "😂 Comedy & Laughs", query: "Comedy" },
    { id: "horror", label: "👻 Horror & Supernatural", query: "Horror" },
];

export default function GenreShowcase({ allShows, onSeeDetails, onPlay }) {
    const [selectedGenre, setSelectedGenre] = useState("all");
    const rowRef = useRef(null);

    const filteredShows = useMemo(() => {
        if (!allShows || allShows.length === 0) return [];
        const current = GENRES.find((g) => g.id === selectedGenre);
        if (!current || current.id === "all") {
            return allShows.slice(10, 30);
        }
        return allShows
            .filter((show) =>
                show.genres?.some((g) =>
                    g.toLowerCase().includes(current.query.toLowerCase())
                )
            )
            .slice(0, 20);
    }, [allShows, selectedGenre]);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
            rowRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section id="genres" className="my-12 sm:my-16 px-4 sm:px-8 relative group/genre">
            {/* Header & Genre Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-1 bg-[#E50914] rounded-full" />
                        <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide">
                            Explore by Curated Categories
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Find the perfect show tailored to your mood tonight
                    </p>
                </div>

                <Link
                    to="/movies"
                    className="self-start md:self-auto text-xs sm:text-sm text-[#E50914] hover:text-red-400 font-semibold flex items-center gap-1 transition-colors"
                >
                    View All in Full Grid →
                </Link>
            </div>

            {/* Genre Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-4 scroll-container">
                {GENRES.map((genre) => {
                    const isSelected = selectedGenre === genre.id;
                    return (
                        <button
                            key={genre.id}
                            type="button"
                            onClick={() => setSelectedGenre(genre.id)}
                            className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                isSelected
                                    ? "bg-[#E50914] text-white shadow-lg shadow-red-900/40 scale-105"
                                    : "bg-[#222222] text-gray-300 hover:bg-[#333333] hover:text-white border border-white/5"
                            }`}
                        >
                            {genre.label}
                        </button>
                    );
                })}
            </div>

            {/* Left Chevron */}
            <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll genre row left"
                className="absolute left-0 top-36 bottom-4 z-30 hidden sm:flex w-12 items-center justify-center bg-black/70 text-white opacity-0 transition-all hover:bg-black/95 group-hover/genre:opacity-100 cursor-pointer backdrop-blur-sm rounded-r"
            >
                <FaChevronLeft className="h-6 w-6" />
            </button>

            {/* Content Shelf */}
            {filteredShows.length > 0 ? (
                <div
                    ref={rowRef}
                    className="flex items-center gap-4 overflow-x-auto scrollbar-none py-4 scroll-container"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {filteredShows.map((show) => (
                        <div
                            key={show.id}
                            className="group relative flex-none w-44 sm:w-56 md:w-64 transition-all duration-300 hover:z-20 cursor-pointer"
                        >
                            <div
                                onClick={() => onSeeDetails(show)}
                                className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-[#202020] shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-950/30 border border-white/5"
                            >
                                <img
                                    src={show.backdrop || show.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80"}
                                    alt={show.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1">
                                    <h3 className="font-heading font-bold text-sm sm:text-base text-white line-clamp-1 drop-shadow">
                                        {show.title}
                                    </h3>

                                    <div className="flex items-center justify-between text-[11px] text-gray-300">
                                        <span className="text-green-400 font-bold">{show.matchPercentage ?? 95}% Match</span>
                                        <span className="flex items-center text-amber-400 font-semibold">
                                            <FaStar className="w-3 h-3 mr-0.5" /> {show.rating ?? "8.1"}
                                        </span>
                                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] text-white">
                                            {show.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover action quick buttons */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                                    {onPlay && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onPlay(show);
                                            }}
                                            aria-label="Play title"
                                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E50914] text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            <FaPlay className="h-2.5 w-2.5 ml-0.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-gray-400 bg-[#1a1a1a] rounded-xl border border-gray-800">
                    <p>No titles found in this specific category.</p>
                </div>
            )}

            {/* Right Chevron */}
            <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll genre row right"
                className="absolute right-0 top-36 bottom-4 z-30 hidden sm:flex w-12 items-center justify-center bg-black/70 text-white opacity-0 transition-all hover:bg-black/95 group-hover/genre:opacity-100 cursor-pointer backdrop-blur-sm rounded-l"
            >
                <FaChevronRight className="h-6 w-6" />
            </button>
        </section>
    );
}
