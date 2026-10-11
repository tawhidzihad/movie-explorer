import { useMemo, useState } from "react";
import { Link } from "react-router";
import HeroBanner from "../components/home/HeroBanner";
import RankedList from "../components/home/RankedList";
import MovieGrid from "../components/movies/MovieGrid";
import MovieModal from "../components/movies/MovieModal";
import SectionHead from "../components/layout/SectionHead";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useMovies } from "../hooks/useMovies";

export default function Home() {
  useDocumentTitle("MovieExplorer — A catalogue of films and television");

  const [selected, setSelected] = useState(null);
  const { shows, loading, error } = useMovies("");

  const topTen = useMemo(
    () =>
      shows
        .filter((s) => s.rating != null)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10),
    [shows]
  );

  const featured = topTen[0];

  return (
    <main>
      {error && (
        <p className="mx-auto max-w-6xl px-5 pt-10 text-sm text-accent sm:px-8">{error}</p>
      )}

      {loading && shows.length === 0 && (
        <p className="mx-auto max-w-6xl px-5 py-32 text-ink-3 sm:px-8">Loading the catalogue.</p>
      )}

      {featured && <HeroBanner show={featured} onOpen={setSelected} />}

      {topTen.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <SectionHead title="Top rated" note="Ranked by average rating." />
          <RankedList shows={topTen} onOpen={setSelected} />
        </section>
      )}

      {shows.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
          <SectionHead
            title="From the catalogue"
            action={
              <Link
                to="/movies"
                className="border-b border-hair pb-0.5 text-sm text-ink transition-colors hover:border-ink"
              >
                All titles
              </Link>
            }
          />
          <MovieGrid shows={shows.slice(0, 12)} onOpen={setSelected} />
        </section>
      )}

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
