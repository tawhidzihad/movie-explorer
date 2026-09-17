import { useEffect } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { GrChannel, GrClose } from "react-icons/gr";

export default function MovieModal({ show, onClose }) {
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={onClose}
        >
            <div
                className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-line bg-surface [-ms-overflow-style:none] scrollbar-none` [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 border border-line bg-ink px-3 py-1 font-body text-sm text-paper transition-colors hover:border-marquee hover:text-marquee focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marquee"
                >
                    <GrClose />
                </button>


                {/* Backdrop image */}
                <div className="aspect-16/7 w-full bg-ink">
                    {show.backdrop ? (
                        <img
                            src={show.backdrop}
                            alt={show.title}
                            className="h-full w-full object-cover"
                        />
                    ) : null}
                </div>

                {/* Content */}
                <div className="p-6">
                    <h2 className="font-display text-3xl tracking-wide2 text-paper">
                        {show.title}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-4 font-body text-sm text-muted">
                        <span className="flex items-center gap-2">
                            <FaStar className="text-amber-300" /> Rating: {show.rating ?? "—"}
                        </span>

                        <span className="flex items-center gap-2">
                            <CiCalendar className="w-4 h-4" /> Release: {show.year}
                        </span>

                        {show.network ? <span className="flex items-center gap-2">
                            <GrChannel /> {show.network}
                        </span> : null}
                    </div>

                    {show.genres.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {show.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="border border-line px-2 py-1 font-body text-xs text-muted"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    ) : null}

                    <h3 className="mt-6 font-body text-sm text-paper">
                        Overview
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                        {show.summary}
                    </p>
                </div>
            </div>
        </div>
    );
}