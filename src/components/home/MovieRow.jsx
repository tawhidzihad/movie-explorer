import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function MovieRow({ title, shows, onSeeDetails, onPlay, badge }) {
    const rowRef = useRef(null);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
            rowRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
        }
    };

    if (!shows || shows.length === 0) return null;

    return (
        <div className="relative my-8 sm:my-10 px-4 sm:px-8 group/row">
            {/* Row Title */}
            <div className="flex items-baseline gap-3 mb-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide group-hover/row:text-red-500 transition-colors">
                    {title}
                </h2>
                {badge && (
                    <span className="text-[10px] sm:text-xs font-bold bg-[#E50914] text-white px-2 py-0.5 rounded tracking-wider uppercase">
                        {badge}
                    </span>
                )}
            </div>

            {/* Left Chevron Button */}
            <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="absolute left-0 top-12 bottom-0 z-30 hidden sm:flex w-12 items-center justify-center bg-black/60 text-white opacity-0 transition-all hover:bg-black/90 group-hover/row:opacity-100 hover:scale-105 cursor-pointer backdrop-blur-sm rounded-r"
            >
                <FaChevronLeft className="h-6 w-6" />
            </button>

            {/* Horizontal Scroll Container */}
            <div
                ref={rowRef}
                className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-4 scroll-container"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {shows.map((show) => (
                    <div
                        key={show.id}
                        className="group relative flex-none w-36 sm:w-48 md:w-56 transition-all duration-300 hover:z-20 cursor-pointer"
                    >
                        {/* Poster Card Container */}
                        <div
                            onClick={() => onSeeDetails(show)}
                            className="relative aspect-2/3 w-full overflow-hidden rounded-md bg-[#202020] shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/80"
                        >
                            <img
                                src={show.poster || show.backdrop || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80"}
                                alt={show.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Top Badge */}
                            {show.rating && show.rating >= 8.5 && (
                                <div className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                                    TOP RATED
                                </div>
                            )}

                            {/* Dark Gradient Overlay at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Hover Quick Actions overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="flex items-center gap-2 mb-2">
                                    {onPlay && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onPlay(show);
                                            }}
                                            aria-label="Play show"
                                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black hover:bg-[#E50914] hover:text-white transition-colors cursor-pointer"
                                        >
                                            <FaPlay className="h-2.5 w-2.5 ml-0.5" />
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSeeDetails(show);
                                        }}
                                        aria-label="Show details"
                                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 bg-black/60 text-white hover:border-white transition-colors cursor-pointer"
                                    >
                                        <FiChevronDown className="h-3.5 w-3.5" />
                                    </button>
                                </div>

                                <p className="text-xs font-bold text-white line-clamp-1">
                                    {show.title}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-gray-300 mt-1">
                                    <span className="text-green-400 font-bold">{show.matchPercentage ?? 96}% Match</span>
                                    <span className="border border-gray-600 px-1 rounded">16+</span>
                                    <span>{show.year}</span>
                                </div>
                            </div>
                        </div>

                        {/* Title & Metadata under Card (Visible on mobile/desktop before hover) */}
                        <div className="mt-2 group-hover:opacity-0 transition-opacity">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-200 line-clamp-1">
                                {show.title}
                            </h3>
                            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-0.5">
                                <span className="flex items-center gap-1 text-amber-400">
                                    <FaStar className="w-3 h-3" /> {show.rating ?? "8.0"}
                                </span>
                                <span>{show.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Chevron Button */}
            <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="absolute right-0 top-12 bottom-0 z-30 hidden sm:flex w-12 items-center justify-center bg-black/60 text-white opacity-0 transition-all hover:bg-black/90 group-hover/row:opacity-100 hover:scale-105 cursor-pointer backdrop-blur-sm rounded-l"
            >
                <FaChevronRight className="h-6 w-6" />
            </button>
        </div>
    );
}
