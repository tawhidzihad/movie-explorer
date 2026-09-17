import { Link } from "react-router";

export default function Navbar() {
    return (
        <header className="border-b border-line bg-ink">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="h-3 w-3 shrink-0 bg-marquee" aria-hidden="true" />
                    <span className="font-display text-2xl tracking-wide2 text-paper">
                        MovieExplorer
                    </span>
                </Link>

                {/* Ticket-stub divider + nav + CTA */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/movies"
                        className="border border-marquee px-4 py-2 font-body text-sm text-marquee transition-colors hover:bg-marquee hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marquee"
                    >
                        Browse Movies
                    </Link>
                </div>
            </div>
        </header>
    );
}