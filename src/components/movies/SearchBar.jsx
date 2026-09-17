import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex w-full items-center gap-3 border border-line bg-surface px-4 py-3 focus-within:border-marquee">
            <IoSearchOutline className="text-paper placeholder:text-muted focus:outline-none" />
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