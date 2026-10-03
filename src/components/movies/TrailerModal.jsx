import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { FiCheck, FiPlus } from "react-icons/fi";

export default function TrailerModal({ show, onClose, onMoreInfo }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-[#181818] border border-[#2F2F2F] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close player"
                    className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-110 cursor-pointer"
                >
                    <GrClose className="h-4 w-4" />
                </button>

                {/* Video / Backdrop Simulation Player */}
                <div className="relative aspect-video w-full bg-black overflow-hidden group">
                    <img
                        src={show.backdrop || show.poster}
                        alt={show.title}
                        className={`h-full w-full object-cover transition-transform duration-1000 ${
                            isPlaying ? "scale-105" : "scale-100 filter brightness-75"
                        }`}
                    />

                    {/* Ambient vignette and gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                    {/* Simulated live video overlay */}
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                        <span className="flex items-center gap-1.5 rounded bg-[#E50914] px-2.5 py-1 text-xs font-black tracking-wider text-white uppercase shadow-md">
                            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                            Playing Trailer
                        </span>
                        <span className="rounded bg-black/60 px-2 py-0.5 text-xs font-semibold text-white/80 border border-white/20">
                            4K ULTRA HD
                        </span>
                    </div>

                    {/* Big Center Play/Pause button when hovered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E50914]/90 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-[#E50914] cursor-pointer"
                        >
                            {isPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6 ml-1" />}
                        </button>
                    </div>

                    {/* Bottom Video Controls Bar */}
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="rounded-full bg-white/20 p-2.5 backdrop-blur-md hover:bg-white/40 transition-colors"
                            >
                                {isPlaying ? <FaPause className="h-4 w-4" /> : <FaPlay className="h-4 w-4 ml-0.5" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsMuted(!isMuted)}
                                className="rounded-full bg-white/20 p-2.5 backdrop-blur-md hover:bg-white/40 transition-colors"
                            >
                                {isMuted ? <FaVolumeMute className="h-4 w-4" /> : <FaVolumeUp className="h-4 w-4" />}
                            </button>
                            <span className="text-xs text-gray-300 font-medium">01:42 / 02:30</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="hidden sm:block flex-1 mx-6">
                            <div className="h-1.5 w-full bg-gray-700/80 rounded-full overflow-hidden">
                                <div className="h-full bg-[#E50914] w-2/3 rounded-full" />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setInWatchlist(!inWatchlist)}
                            className="flex items-center gap-1.5 rounded border border-white/30 bg-black/60 px-3 py-1.5 text-xs font-semibold backdrop-blur-md hover:border-white transition-colors"
                        >
                            {inWatchlist ? <FiCheck className="text-green-400" /> : <FiPlus />}
                            {inWatchlist ? "In Watchlist" : "Add to List"}
                        </button>
                    </div>
                </div>

                {/* Show Details Summary in Modal Bottom */}
                <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-wide text-white">
                                {show.title}
                            </h2>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300">
                                <span className="font-bold text-green-400">{show.matchPercentage ?? 98}% Match</span>
                                <span className="rounded border border-gray-600 px-1.5 py-0.5 text-xs">16+</span>
                                <span>{show.year}</span>
                                <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white">HD</span>
                                <span className="text-gray-400">{show.runtime || 45}m</span>
                            </div>
                        </div>

                        {onMoreInfo && (
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onMoreInfo(show);
                                }}
                                className="inline-flex items-center justify-center rounded border border-gray-600 bg-gray-800/80 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
                            >
                                Full Overview & Cast Details →
                            </button>
                        )}
                    </div>

                    <p className="text-sm leading-relaxed text-gray-300 max-w-3xl">
                        {show.summary}
                    </p>

                    {show.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-xs text-gray-400">Genres:</span>
                            {show.genres.map((g) => (
                                <span key={g} className="rounded bg-[#2A2D31] px-2.5 py-0.5 text-xs text-gray-300">
                                    {g}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
