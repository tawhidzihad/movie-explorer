import { useEffect, useState } from "react";
import { FaStar, FaPlay } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { FiPlus, FiCheck, FiThumbsUp, FiExternalLink } from "react-icons/fi";

export default function MovieModal({ show, onClose, onPlay }) {
    const [inWatchlist, setInWatchlist] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (!show) return;

        function handleKeyDown(e) {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4 py-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative my-auto w-full max-w-3xl overflow-hidden rounded-xl border border-[#2F2F2F] bg-[#181818] shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#181818]/80 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black cursor-pointer"
                >
                    <GrClose className="h-4 w-4" />
                </button>

                {/* Backdrop image banner */}
                <div className="relative aspect-16/9 sm:aspect-16/8 w-full bg-[#141414] overflow-hidden">
                    <img
                        src={show.backdrop || show.poster}
                        alt={show.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Gradient Fade Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/80 via-transparent to-transparent" />

                    {/* Action buttons on backdrop */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <span className="bg-[#E50914] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
                                Original Series
                            </span>
                            <span className="text-xs text-gray-300 font-semibold drop-shadow">
                                {show.network}
                            </span>
                        </div>

                        <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wide text-white drop-shadow-lg">
                            {show.title}
                        </h2>

                        <div className="flex items-center gap-3 pt-2">
                            {onPlay && (
                                <button
                                    type="button"
                                    onClick={() => onPlay(show)}
                                    className="flex items-center gap-2 rounded bg-white px-6 py-2 text-sm font-bold text-black shadow-lg transition-transform hover:bg-[#E50914] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
                                >
                                    <FaPlay className="h-3.5 w-3.5" /> Play Trailer
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => setInWatchlist(!inWatchlist)}
                                aria-label="Add to Watchlist"
                                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-400 bg-black/60 text-white backdrop-blur-md transition-all hover:border-white hover:scale-110 cursor-pointer"
                            >
                                {inWatchlist ? <FiCheck className="text-green-400" /> : <FiPlus />}
                            </button>

                            <button
                                type="button"
                                onClick={() => setLiked(!liked)}
                                aria-label="Like show"
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-black/60 backdrop-blur-md transition-all hover:scale-110 cursor-pointer ${
                                    liked ? "border-[#E50914] text-[#E50914]" : "border-gray-400 text-white hover:border-white"
                                }`}
                            >
                                <FiThumbsUp />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left 2 Cols: Stats and Overview */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="font-bold text-green-400">
                                    {show.matchPercentage ?? 98}% Match
                                </span>
                                <span className="text-gray-400">{show.year}</span>
                                <span className="rounded border border-gray-600 px-1.5 py-0.5 text-xs text-gray-300">
                                    16+
                                </span>
                                <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs font-bold text-white">
                                    ULTRA HD
                                </span>
                                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                                    <FaStar /> {show.rating ?? "8.4"}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Synopsis
                                </h3>
                                <p className="font-body text-sm leading-relaxed text-gray-200">
                                    {show.summary}
                                </p>
                            </div>
                        </div>

                        {/* Right Col: Metadata Sidebar */}
                        <div className="rounded-lg bg-[#202020] p-4 border border-gray-800 space-y-3 text-xs">
                            <div>
                                <span className="text-gray-400">Genres: </span>
                                <span className="text-white font-medium">
                                    {show.genres?.join(", ") || "Drama, Thriller"}
                                </span>
                            </div>

                            <div>
                                <span className="text-gray-400">Audio / Language: </span>
                                <span className="text-white font-medium">{show.language || "English"} (5.1 Surround)</span>
                            </div>

                            <div>
                                <span className="text-gray-400">Network / Platform: </span>
                                <span className="text-white font-medium">{show.network || "TVMaze Network"}</span>
                            </div>

                            <div>
                                <span className="text-gray-400">Status: </span>
                                <span className="text-emerald-400 font-medium">{show.status || "Completed"}</span>
                            </div>

                            {show.officialSite && (
                                <div className="pt-2">
                                    <a
                                        href={show.officialSite}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-[#E50914] hover:underline font-semibold"
                                    >
                                        Visit Official Page <FiExternalLink />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}