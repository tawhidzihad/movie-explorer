function SearchIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
        >
            <circle cx="8" cy="8" r="6" stroke="#8B8D91" strokeWidth="1.5" />
            <line
                x1="12.4"
                y1="12.4"
                x2="16.5"
                y2="16.5"
                stroke="#8B8D91"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex w-full items-center gap-3 border border-line bg-surface px-4 py-3 focus-within:border-marquee">
            <SearchIcon />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for a movie..."
                className="w-full bg-transparent font-body text-sm text-paper placeholder:text-muted focus:outline-none"
            />
        </div>
    );
}