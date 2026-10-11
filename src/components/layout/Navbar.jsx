import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/movies?q=${encodeURIComponent(q)}` : "/movies");
    setQuery("");
  };

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? "text-ink" : "text-ink-3 hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-serif text-xl tracking-tight">
            CineboxBD
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={linkClass}>
              Catalogue
            </NavLink>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="hidden w-56 md:block">
          <input
            type="search"
            aria-label="Search titles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles"
            className="w-full border-b border-hair bg-transparent pb-1.5 text-sm placeholder:text-ink-3 focus:border-ink focus:outline-none"
          />
        </form>
      </div>
    </header>
  );
}
