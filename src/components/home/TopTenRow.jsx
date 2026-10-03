import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function TopTenRow({ shows, onSeeDetails, onPlay }) {
    const rowRef = useRef(null);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
            rowRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
        }
    };

    const topTenList = (shows || []).slice(0, 10);
    if (topTenList.length === 0) return null;

    return (
        <section className="relative my-10 sm:my-14 px-4 sm:px-8 group/top10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                    <span className="h-6 w-1 bg-[#E50914] rounded-full" />
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide">
                        Top 10 TV Shows & Movies Today
                    </h2>
                </div>
                <span className="hidden sm:inline-block bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Global Trending
                </span>
            </div>

            {/* Left Chevron */}
            <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll Top 10 left"
                className="absolute left-0 top-16 bottom-4 z-30 hidden sm:flex w-12 items-center justify-center bg-black/70 text-white opacity-0 transition-all hover:bg-black/95 group-hover/top10:opacity-100 cursor-pointer backdrop-blur-sm rounded-r"
            >
                <FaChevronLeft className="h-6 w-6" />
            </button>

            {/* Carousel */}
            <div
                ref={rowRef}
                className="flex items-center gap-1 sm:gap-4 overflow-x-auto scrollbar-none py-6 scroll-container"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {topTenList.map((show, index) => {
                    const rank = index + 1;
                    return (
                        <div
                            key={show.id || index}
                            className="group relative flex-none flex items-center w-52 sm:w-64 md:w-72 transition-all duration-300 hover:z-20 cursor-pointer"
                        >
                            {/* Giant Netflix Outline Rank Number */}
                            <div className="relative z-0 shrink-0 w-20 sm:w-28 text-right select-none">
                                <span className="netflix-rank-text block -mr-3 sm:-mr-5">
                                    {rank}
                                </span>
                            </div>

                            {/* Card Poster Container */}
                            <div
                                onClick={() => onSeeDetails(show)}
                                className="relative z-10 aspect-2/3 flex-1 overflow-hidden rounded-md bg-[#202020] shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-950/40 border border-white/5 group-hover:border-[#E50914]/50"
                            >
                                <img
                                    src={show.poster || show.backdrop || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80"}
                                    alt={show.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Netflix Top 10 Badge on poster */}
                                <div className="absolute top-2 right-2 bg-[#E50914] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-tighter">
                                    #{rank} Today
                                </div>

                                {/* Hover action overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                                    <div className="flex items-center gap-2 mb-2">
                                        {onPlay && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onPlay(show);
                                                }}
                                                aria-label="Play Top 10 show"
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
                                            aria-label="Show Top 10 details"
                                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 bg-black/60 text-white hover:border-white transition-colors cursor-pointer"
                                        >
                                            <FiChevronDown className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    <p className="text-xs font-bold text-white line-clamp-1">{show.title}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-300 mt-1">
                                        <span className="text-green-400 font-bold">{show.matchPercentage ?? 98}% Match</span>
                                        <span className="border border-gray-600 px-1 rounded">HD</span>
                                        <span className="flex items-center text-amber-400">
                                            <FaStar className="w-2.5 h-2.5 mr-0.5" /> {show.rating ?? "8.5"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right Chevron */}
            <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll Top 10 right"
                className="absolute right-0 top-16 bottom-4 z-30 hidden sm:flex w-12 items-center justify-center bg-black/70 text-white opacity-0 transition-all hover:bg-black/95 group-hover/top10:opacity-100 cursor-pointer backdrop-blur-sm rounded-l"
            >
                <FaChevronRight className="h-6 w-6" />
            </button>
        </section>
    );
}
