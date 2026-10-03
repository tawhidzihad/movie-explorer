import { useEffect, useState } from "react";
import { FiBell, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/movies?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "TV Shows", path: "/movies?cat=tv" },
        { name: "Movies", path: "/movies" },
        { name: "New & Popular", path: "/movies?sort=top" },
        { name: "Browse by Genre", path: "/#genres" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
                isScrolled
                    ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-[#2F2F2F]/40 py-3"
                    : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4 sm:py-5"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
                {/* Left: Brand Logo & Main Nav */}
                <div className="flex items-center gap-6 sm:gap-10">
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* Netflix Style Stylized Red M / Film Icon */}
                        <div className="relative flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-[#E50914] to-[#99060D] shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
                            <span className="font-display font-black text-white text-xl tracking-tighter">M</span>
                        </div>
                        <span className="font-display text-2xl sm:text-3xl tracking-wide font-black text-[#E50914] drop-shadow-[0_2px_10px_rgba(229,9,20,0.4)]">
                            MOVIE<span className="text-white">EXPLORER</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive =
                                location.pathname === link.path ||
                                (link.path === "/movies" && location.pathname.startsWith("/movies") && !location.search);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`transition-colors duration-200 hover:text-white ${
                                        isActive
                                            ? "text-white font-semibold cursor-default"
                                            : "text-[#E5E5E5]/75"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Search, Notifications, Avatar Profile */}
                <div className="flex items-center gap-3 sm:gap-5 text-white">
                    {/* Expandable Search Bar */}
                    <div className="relative flex items-center">
                        <form
                            onSubmit={handleSearchSubmit}
                            className={`flex items-center transition-all duration-300 ${
                                isSearchOpen
                                    ? "w-48 sm:w-64 bg-black/80 border border-white/60 px-3 py-1.5 rounded-sm"
                                    : "w-8 sm:w-9 justify-center"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Toggle search input"
                                className="text-white hover:text-red-500 transition-colors cursor-pointer"
                            >
                                <FiSearch className="w-5 h-5" />
                            </button>

                            {isSearchOpen && (
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Titles, genres, actors..."
                                    autoFocus
                                    className="ml-2 w-full bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none"
                                />
                            )}
                        </form>
                    </div>

                    {/* Direct Explore CTA button */}
                    <Link
                        to="/movies"
                        className="hidden sm:inline-flex items-center gap-2 rounded bg-[#E50914] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:bg-[#b80710] hover:scale-105 active:scale-95"
                    >
                        <FaPlay className="w-2.5 h-2.5" /> Explore All
                    </Link>

                    {/* Notification Bell */}
                    <div className="relative cursor-pointer hidden sm:block p-1 hover:text-gray-300">
                        <FiBell className="w-5 h-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#E50914]" />
                    </div>

                    {/* User Profile Avatar with Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
                            aria-label="User Profile"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                alt="Profile Avatar"
                                className="h-8 w-8 rounded object-cover border border-white/20 hover:border-white transition-all"
                            />
                            <span className="text-[10px] text-gray-400">▼</span>
                        </button>

                        {/* Netflix Profile Dropdown */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-3 w-56 rounded bg-[#181818] border border-[#2F2F2F] shadow-2xl py-3 px-2 z-50 text-xs text-gray-300 animate-in fade-in">
                                <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-700/60 pb-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                        alt="Avatar"
                                        className="h-8 w-8 rounded object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">Movie Lover</p>
                                        <p className="text-[11px] text-gray-400">VIP Explorer</p>
                                    </div>
                                </div>

                                <div className="py-2 space-y-1">
                                    <Link
                                        to="/movies"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-[#252525] hover:text-white"
                                    >
                                        <span>My Watchlist</span>
                                        <span className="text-[10px] bg-red-600/30 text-red-400 px-1.5 py-0.5 rounded">12</span>
                                    </Link>
                                    <a
                                        href="#faq"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="block px-3 py-1.5 rounded hover:bg-[#252525] hover:text-white"
                                    >
                                        Help Center & FAQ
                                    </a>
                                    <Link
                                        to="/movies"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="block px-3 py-1.5 rounded hover:bg-[#252525] hover:text-white"
                                    >
                                        Account Settings
                                    </Link>
                                </div>

                                <div className="border-t border-gray-700/60 pt-2 px-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="w-full text-left text-gray-400 hover:text-white py-1"
                                    >
                                        Sign out of MovieExplorer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-1 text-white hover:text-red-500"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#141414] border-b border-[#2F2F2F] px-6 py-5 space-y-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-black/60 border border-gray-700 px-3 py-2 rounded">
                        <FiSearch className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search catalog..."
                            className="w-full bg-transparent text-sm text-white focus:outline-none"
                        />
                    </form>

                    <div className="flex flex-col space-y-3 font-medium text-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <Link
                        to="/movies"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center rounded bg-[#E50914] py-2 text-sm font-semibold text-white"
                    >
                        Browse All Catalog
                    </Link>
                </div>
            )}
        </header>
    );
}