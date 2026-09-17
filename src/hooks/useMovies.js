import { useEffect, useState } from "react";
import { getAllShows, searchShows } from "../api/tvmaze";
import { normalizeShow } from "../utils/normalizeShow";

const DEBOUNCE_MS = 450;

export function useMovies(query) {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const timer = setTimeout(
            async () => {
                if (cancelled) return;
                setLoading(true);
                setError(null);

                try {
                    const raw = query.trim()
                        ? await searchShows(query.trim())
                        : await getAllShows();

                    if (!cancelled) {
                        setShows(raw.map(normalizeShow));
                    }
                } catch (err) {
                    if (!cancelled) {
                        setError(err.message || "Something went wrong.");
                    }
                } finally {
                    if (!cancelled) {
                        setLoading(false);
                    }
                }
            },

            query.trim() ? DEBOUNCE_MS : 0
        );

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [query]);

    return { shows, loading, error };
}