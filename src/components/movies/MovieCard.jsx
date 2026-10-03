import { CiCalendar } from "react-icons/ci";
import { FaStar, FaPlay } from "react-icons/fa";

export default function MovieCard({ show, onSeeDetails, onPlay }) {
    return (
        <div
            onClick={() => onSeeDetails(show)}
            className="group flex flex-col rounded-lg overflow-hidden border border-[#2F2F2F] bg-[#181818] transition-all duration-300 hover:border-[#E50914] hover:shadow-xl hover:shadow-red-950/20 hover:-translate-y-1 cursor-pointer"
        >
            <div className="relative aspect-2/3 w-full overflow-hidden bg-[#141414]">
                {show.poster ? (
                    <img
                        src={show.poster}
                        alt={show.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center font-body text-xs text-gray-500">
                        No image
                    </div>
                )}

                {/* Match tag top left */}
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-green-400 border border-green-500/30">
                    {show.matchPercentage ?? 95}% Match
                </div>

                {/* Play hover overlay button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onPlay) onPlay(show);
                            else onSeeDetails(show);
                        }}
                        aria-label="Play title"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E50914] text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                    >
                        <FaPlay className="h-4 w-4 ml-0.5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-4">
                <h3 className="font-heading font-bold text-sm text-white line-clamp-1 group-hover:text-red-400 transition-colors">
                    {show.title}
                </h3>

                <div className="flex items-center justify-between font-body text-xs text-gray-400">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <FaStar className="w-3 h-3" />{show.rating ?? "—"}
                    </span>
                    <span className="flex items-center gap-1">
                        <CiCalendar className="w-3.5 h-3.5" />{show.year}
                    </span>
                </div>

                {show.genres?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {show.genres.slice(0, 2).map((g) => (
                            <span key={g} className="text-[10px] bg-[#252525] text-gray-300 px-1.5 py-0.5 rounded">
                                {g}
                            </span>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSeeDetails(show);
                    }}
                    className="mt-auto w-full rounded bg-[#252525] py-2 font-body text-xs font-semibold text-gray-200 transition-colors hover:bg-[#E50914] hover:text-white"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}