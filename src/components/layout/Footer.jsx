import { Link } from "react-router";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-line bg-ink">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                    <span className="font-display text-xl tracking-wide2 text-paper">
                        MovieExplorer
                    </span>

                    <nav className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="font-body text-sm text-muted transition-colors hover:text-paper"
                        >
                            Home
                        </Link>
                        <Link
                            to="/movies"
                            className="font-body text-sm text-muted transition-colors hover:text-paper"
                        >
                            Movies
                        </Link>
                        <a
                            href="https://www.tvmaze.com/api"
                            target="_blank"
                            rel="noreferrer"
                            className="font-body text-sm text-muted transition-colors hover:text-paper"
                        >
                            TVMaze API
                        </a>
                    </nav>
                </div>

                <div className="mt-4 mb-4 border border-surface"></div>

                <p className="mt-4 text-center font-body text-xs text-muted">
                    © {year} MovieExplorer.
                </p>
            </div>
        </footer>
    );
}