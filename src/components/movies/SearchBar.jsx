import { IoSearchOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="flex w-full items-center gap-3 rounded-lg border border-[#2F2F2F] bg-[#1a1a1a] px-4 py-3.5 focus-within:border-[#E50914] focus-within:ring-1 focus-within:ring-[#E50914] shadow-lg transition-all">
            <IoSearchOutline className="text-gray-400 text-lg shrink-0" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search titles, actors, genres, or keywords..."
                className="w-full bg-transparent font-body text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="text-gray-400 hover:text-white"
                >
                    <FiX className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}