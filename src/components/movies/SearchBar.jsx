export default function SearchBar({ value, onChange }) {
  return (
    <label className="flex w-full flex-col gap-1 sm:w-80">
      <span className="sr-only">Search titles</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search titles, actors or genres"
        className="w-full border-b border-ink-3 bg-transparent pb-2 text-base placeholder:text-ink-3 focus:border-ink focus:outline-none"
      />
    </label>
  );
}
