import { useState } from "react";
import { useSearchParams } from "react-router";
import MovieGrid from "../components/movies/MovieGrid";
import MovieModal from "../components/movies/MovieModal";
import SearchBar from "../components/movies/SearchBar";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useMovies } from "../hooks/useMovies";

export default function MovieListing() {
  useDocumentTitle("Catalogue — MovieExplorer");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selected, setSelected] = useState(null);
  const { shows, loading, error } = useMovies(query);

  const handleQueryChange = (val) => {
    setSearchParams(val ? { q: val } : {});
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pb-32 pt-16 sm:px-8 sm:pt-24">
      <header className="mb-12 flex flex-col gap-8 border-b border-ink pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            {query ? `Results for “${query}”` : "Catalogue"}
          </h1>
          {shows.length > 0 && (
            <p className="num mt-2 text-sm text-ink-3">{shows.length} titles</p>
          )}
        </div>
        <SearchBar value={query} onChange={handleQueryChange} />
      </header>

      <MovieGrid shows={shows} loading={loading} error={error} onOpen={setSelected} />

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
