/**
 * Flattens a raw TVMaze show object into the shape MovieCard/MovieModal expect.
 */
export function normalizeShow(show) {
    return {
        id: show.id,
        title: show.name,
        poster: show.image?.medium ?? null,
        backdrop: show.image?.original ?? show.image?.medium ?? null,
        year: show.premiered ? show.premiered.slice(0, 4) : "—",
        rating: show.rating?.average ?? null,
        summary: stripHtml(show.summary),
        genres: show.genres ?? [],
        network: show.network?.name ?? show.webChannel?.name ?? null,
    };
}

function stripHtml(html) {
    if (!html) return "No summary available.";
    return html.replace(/<[^>]+>/g, "");
}