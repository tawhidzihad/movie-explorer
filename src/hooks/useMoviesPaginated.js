import { useCallback, useEffect, useState } from "react";
import { getAllShows, searchShows } from "../api/tvmaze";
import { normalizeShow } from "../utils/normalizeShow";

const DEBOUNCE_MS = 450;
const PAGE_SIZE = 16;

export function useMoviesPaginated(query) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const trimmed = query.trim();

    const timer = setTimeout(async () => {
      if (cancelled) return;

      setLoading(true);
      setError(null);

      try {
        const raw = trimmed ? await searchShows(trimmed) : await getAllShows();
        if (!cancelled) {
          const normalized = raw.map(normalizeShow);
          setShows(normalized.slice(0, PAGE_SIZE));
          setPage(1);
          setHasMore(normalized.length > PAGE_SIZE);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, trimmed ? DEBOUNCE_MS : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const loadMore = useCallback(() => {
    const start = page * PAGE_SIZE;
    // We don't have the full list cached for search results, so we just
    // extend from a fresh fetch when searching. For the catalogue load
    // (no query), getAllShows returns everything so we can slice.
    if (!query.trim()) {
      // Re-fetch all and slice the next page — TVMaze returns ~250 shows
      // which is fine for a client-side slice without a backend.
      getAllShows()
        .then((raw) => {
          const normalized = raw.map(normalizeShow);
          setShows((prev) => [...prev, ...normalized.slice(start, start + PAGE_SIZE)]);
          setHasMore(normalized.length > start + PAGE_SIZE);
          setPage((p) => p + 1);
        })
        .catch((err) => setError(err.message || "Something went wrong."));
    } else {
      // For search, fetch the full result set once and append pages from it.
      searchShows(query.trim())
        .then((raw) => {
          const normalized = raw.map(normalizeShow);
          setShows((prev) => [...prev, ...normalized.slice(start, start + PAGE_SIZE)]);
          setHasMore(normalized.length > start + PAGE_SIZE);
          setPage((p) => p + 1);
        })
        .catch((err) => setError(err.message || "Something went wrong."));
    }
  }, [page, query]);

  return { shows, loading, error, loadMore, hasMore, page };
}
