const BASE_URL = "https://api.tvmaze.com";

/**
 * Fetch all shows (paginated by TVMaze, ~250 per page).
 * Used as the default listing before the user searches.
 */
export async function getAllShows() {
    const res = await fetch(`${BASE_URL}/shows`);
    if (!res.ok) {
        throw new Error(`Failed to load shows (${res.status})`);
    }
    return res.json();
}

/**
 * Search shows by title.
 * TVMaze wraps each match as { score, show }, so we unwrap it here
 * to keep the raw shape identical to getAllShows().
 */
export async function searchShows(query) {
    const res = await fetch(
        `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
        throw new Error(`Search failed (${res.status})`);
    }
    const results = await res.json();
    return results.map((result) => result.show);
}