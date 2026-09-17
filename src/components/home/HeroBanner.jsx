import { Link } from "react-router";

const BACKDROP_POSTERS = [
    "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/490/1226764.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/286/715906.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/448/1121792.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/445/1114097.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/424/1061900.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/487/1219631.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/600/1501061.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/616/1541142.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/636/1591621.jpg",
    "https://static.tvmaze.com/uploads/images/medium_portrait/402/1007484.jpg",
];

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden border-b border-line bg-ink h-screen">
            {/* Poster mosaic backdrop */}
            <div
                className="absolute inset-0 grid grid-cols-4 gap-0.5 sm:grid-cols-6"
                aria-hidden="true"
            >
                {BACKDROP_POSTERS.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt=""
                        className="h-full w-full object-cover grayscale-30"
                    />
                ))}
            </div>

            {/* Scrim: darkest where the copy sits, lifting toward the right */}
            <div
                className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/60"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />

            {/* Copy */}
            <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 flex items-center h-full">
                <div className="max-w-lg">
                    <h1 className="font-display text-5xl leading-[0.95] tracking-wide2 text-paper sm:text-6xl">
                        Every show, one search away.
                    </h1>
                    <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-muted">
                        Search thousands of TV shows, check ratings, air dates and full
                        summaries — pulled straight from the TVMaze catalog.
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                        <Link
                            to="/movies"
                            className="inline-block border border-marquee bg-ink px-6 py-3 font-body text-sm text-marquee transition-colors hover:bg-marquee hover:text-ink  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marquee"
                        >
                            Browse Movies
                        </Link>
                        <span className="font-body text-xs tracking-wide2 text-muted">
                            10,000+ titles
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}