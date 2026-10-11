import { useMemo, useState } from "react";
import HeroCarousel from "../components/home/HeroCarousel";
import RankedList from "../components/home/RankedList";
import MovieGrid from "../components/movies/MovieGrid";
import MovieModal from "../components/movies/MovieModal";
import SectionHead from "../components/layout/SectionHead";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useMoviesPaginated } from "../hooks/useMoviesPaginated";

export default function Home() {
  useDocumentTitle("MovieExplorer — A catalogue of films and television");

  const [selected, setSelected] = useState(null);
  const { shows, loading, error, loadMore, hasMore, page } = useMoviesPaginated("");

  const topTen = useMemo(
    () =>
      shows
        .filter((s) => s.rating != null)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10),
    [shows]
  );

  const byGenre = (genre) =>
    shows
      .filter((s) =>
        s.genres?.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
      )
      .slice(0, 12);

  const recent = useMemo(
    () =>
      [...shows]
        .filter((s) => s.year && s.year !== "—")
        .sort((a, b) => Number(b.year) - Number(a.year))
        .slice(0, 12),
    [shows]
  );

  return (
    <main>
      {error && (
        <p className="mx-auto max-w-6xl px-5 pt-10 text-sm text-accent sm:px-8">{error}</p>
      )}

      {loading && shows.length === 0 && (
        <p className="mx-auto max-w-6xl px-5 py-32 text-ink-3 sm:px-8">
          Loading the catalogue.
        </p>
      )}

      <HeroCarousel shows={topTen} onOpen={setSelected} limit={5} />

      {topTen.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <SectionHead title="Top rated" note="Ranked by average rating." />
          <RankedList shows={topTen} onOpen={setSelected} />
        </section>
      )}

      {!loading && shows.length > 0 && (
        <>
          <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
            <SectionHead title="Drama" note="All drama titles in the catalogue." />
            <MovieGrid shows={byGenre("Drama")} onOpen={setSelected} />
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
            <SectionHead title="Comedy" note="From sitcoms to dark comedy." />
            <MovieGrid shows={byGenre("Comedy")} onOpen={setSelected} />
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
            <SectionHead title="Science Fiction" note="Futures, real and imagined." />
            <MovieGrid shows={byGenre("Science-Fiction")} onOpen={setSelected} />
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
            <SectionHead title="Recently added" note="Added to the catalogue." />
            <MovieGrid shows={recent} onOpen={setSelected} />
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
            <SectionHead
              title="From the catalogue"
              action={<span className="text-xs text-ink-3">Page {page}</span>}
            />
            <MovieGrid
              shows={shows}
              onOpen={setSelected}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </section>
        </>
      )}

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
