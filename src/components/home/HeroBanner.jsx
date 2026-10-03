import { useState, useEffect } from "react";
import { FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FiInfo, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

// Curated high-res featured blockbuster hero titles
const FEATURED_HEROES = [
    {
        id: 2993,
        title: "Stranger Things",
        badge: "TOP 10 SHOW TODAY #1",
        rating: "8.9",
        matchPercentage: 99,
        year: "2016 - 2025",
        age: "16+",
        genres: ["Sci-Fi", "Horror", "Drama", "Mystery"],
        summary: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl with telekinetic powers.",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        poster: "https://static.tvmaze.com/uploads/images/medium_portrait/394/987114.jpg",
        network: "MovieExplorer Originals",
    },
    {
        id: 169,
        title: "Breaking Bad",
        badge: "CRITICALLY ACCLAIMED",
        rating: "9.5",
        matchPercentage: 98,
        year: "2008 - 2013",
        age: "18+",
        genres: ["Crime", "Drama", "Thriller"],
        summary: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's financial future.",
        backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
        poster: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
        network: "AMC Studios",
    },
    {
        id: 28276,
        title: "The Witcher",
        badge: "TRENDING NOW",
        rating: "8.2",
        matchPercentage: 96,
        year: "2019 - Present",
        age: "18+",
        genres: ["Fantasy", "Action", "Adventure"],
        summary: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts. Fate hurtles him toward a powerful sorceress and a young princess.",
        backdrop: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&auto=format&fit=crop&q=80",
        poster: "https://static.tvmaze.com/uploads/images/medium_portrait/448/1121792.jpg",
        network: "MovieExplorer Originals",
    },
    {
        id: 41846,
        title: "House of the Dragon",
        badge: "EMMY AWARD WINNER",
        rating: "8.5",
        matchPercentage: 97,
        year: "2022 - Present",
        age: "18+",
        genres: ["Drama", "Action", "Fantasy"],
        summary: "The reign of House Targaryen begins. Set nearly 200 years before the events of Game of Thrones, witness the turbulent events that lead to the legendary Dance of the Dragons.",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        poster: "https://static.tvmaze.com/uploads/images/medium_portrait/424/1061900.jpg",
        network: "HBO Originals",
    }
];

export default function HeroBanner({ onSeeDetails, onPlay }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);

    const currentHero = FEATURED_HEROES[currentIndex];

    // Auto-advance banner every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % FEATURED_HEROES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + FEATURED_HEROES.length) % FEATURED_HEROES.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % FEATURED_HEROES.length);
    };

    return (
        <div className="relative w-full h-[85vh] sm:h-[92vh] max-h-[850px] overflow-hidden bg-[#141414]">
            {/* Background Image with smooth transition */}
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
                <img
                    key={currentHero.id}
                    src={currentHero.backdrop}
                    alt={currentHero.title}
                    className="h-full w-full object-cover object-center animate-in fade-in zoom-in-105 duration-1000"
                />
            </div>

            {/* Netflix Ambient Vignette and Gradients */}
            {/* Left to right gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent w-full sm:w-2/3" />
            
            {/* Top gradient for navbar blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-32" />
            
            {/* Bottom heavy gradient to blend into content rows */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />

            {/* Billboard Content */}
            <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-8 pb-16 pt-20">
                <div className="max-w-2xl space-y-4 sm:space-y-5">
                    {/* Netflix Original / Badge tag */}
                    <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1.5 rounded-sm bg-[#E50914] px-2 py-0.5 text-[11px] sm:text-xs font-black tracking-widest text-white uppercase shadow-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            {currentHero.badge}
                        </span>
                        <span className="text-xs font-semibold text-gray-300 drop-shadow">
                            {currentHero.network}
                        </span>
                    </div>

                    {/* Giant Title */}
                    <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-none">
                        {currentHero.title}
                    </h1>

                    {/* Meta Row: Match %, Age, Year, HD Badge */}
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-200">
                        <span className="font-bold text-green-400">
                            {currentHero.matchPercentage}% Match
                        </span>
                        <span className="rounded border border-gray-500 px-1.5 py-0.2 text-xs">
                            {currentHero.age}
                        </span>
                        <span>{currentHero.year}</span>
                        <span className="rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-bold text-white">
                            4K ULTRA HD
                        </span>
                        <span className="text-gray-300 font-medium">
                            {currentHero.genres.join(" • ")}
                        </span>
                    </div>

                    {/* Synopsis */}
                    <p className="font-body text-xs sm:text-sm md:text-base leading-relaxed text-gray-200 line-clamp-3 drop-shadow max-w-xl">
                        {currentHero.summary}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                        {/* Netflix White Play Button */}
                        <button
                            type="button"
                            onClick={() => onPlay(currentHero)}
                            className="flex items-center justify-center gap-2.5 rounded bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-black shadow-2xl transition-all duration-200 hover:bg-[#E50914] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <FaPlay className="h-4 w-4 fill-current" />
                            <span>Play Trailer</span>
                        </button>

                        {/* Netflix More Info Button */}
                        <button
                            type="button"
                            onClick={() => onSeeDetails(currentHero)}
                            className="flex items-center justify-center gap-2 rounded bg-[#6D6D6E]/70 px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-[#6D6D6E]/90 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <FiInfo className="h-5 w-5" />
                            <span>More Info</span>
                        </button>

                        <Link
                            to="/movies"
                            className="hidden sm:inline-flex items-center justify-center rounded border border-white/40 bg-black/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white hover:bg-black/60"
                        >
                            Browse All Titles
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Right Controls (Mute & Age Rating Badge & Arrows) */}
            <div className="absolute bottom-14 right-4 sm:right-8 z-30 flex items-center gap-3">
                {/* Prev / Next slide controls */}
                <div className="flex items-center gap-1.5 bg-black/60 rounded-full p-1 border border-white/10 backdrop-blur-md">
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous featured title"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                        <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-[11px] text-gray-300 px-1 font-bold">
                        {currentIndex + 1}/{FEATURED_HEROES.length}
                    </span>
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next featured title"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                        <FiChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Sound Toggle */}
                <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label="Toggle Audio"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white backdrop-blur-md transition-all hover:border-white hover:scale-110"
                >
                    {isMuted ? <FaVolumeMute className="h-3.5 w-3.5" /> : <FaVolumeUp className="h-3.5 w-3.5" />}
                </button>

                {/* Netflix Style Age Rating Ribbon */}
                <div className="flex items-center border-l-3 border-gray-300 bg-black/70 px-3 py-1 text-xs font-bold text-gray-200 backdrop-blur-md">
                    {currentHero.age} | Spatial Audio
                </div>
            </div>
        </div>
    );
}