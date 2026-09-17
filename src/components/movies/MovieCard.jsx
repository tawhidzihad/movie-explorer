import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function MovieCard({ show, onSeeDetails }) {
    return (
        <div className="group flex flex-col border border-line bg-surface transition-colors hover:border-marquee">
            <div className="aspect-2/3 w-full overflow-hidden bg-ink">
                {show.poster ? (
                    <img
                        src={show.poster}
                        alt={show.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center font-body text-xs text-muted">
                        No image
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <h3 className="font-body text-sm text-paper line-clamp-2">
                    {show.title}
                </h3>

                <div className="flex items-center gap-3 font-body text-xs text-muted">
                    <span className="flex items-center gap-2">
                        <FaStar className="text-amber-300" />{show.rating ?? "—"}
                    </span>
                    <span className="flex items-center gap-2">
                        <CiCalendar className="w-4 h-4" />{show.year}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => onSeeDetails(show)}
                    className="mt-auto border border-marquee px-3 py-2 font-body text-xs text-marquee transition-colors hover:bg-marquee hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marquee"
                >
                    See Details
                </button>
            </div>
        </div>
    );
}