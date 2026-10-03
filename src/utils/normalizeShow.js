/**
 * Flattens a raw TVMaze show object into the shape MovieCard/MovieModal expect.
 */
export function normalizeShow(show) {
    if (!show) return null;
    
    // Calculate a realistic Netflix-style match % (e.g. 8.8 rating -> 96% Match, default 85-98%)
    const ratingVal = show.rating?.average;
    const matchPercentage = ratingVal 
        ? Math.min(99, Math.max(75, Math.round(ratingVal * 10 + 8))) 
        : Math.floor(Math.random() * 15) + 84;

    return {
        id: show.id,
        title: show.name,
        poster: show.image?.medium ?? null,
        backdrop: show.image?.original ?? show.image?.medium ?? null,
        year: show.premiered ? show.premiered.slice(0, 4) : "—",
        rating: show.rating?.average ?? null,
        matchPercentage,
        summary: stripHtml(show.summary),
        genres: show.genres ?? [],
        network: show.network?.name ?? show.webChannel?.name ?? "MovieExplorer Originals",
        runtime: show.runtime || show.averageRuntime || 45,
        status: show.status ?? "Ended",
        language: show.language ?? "English",
        officialSite: show.officialSite ?? null,
    };
}

function stripHtml(html) {
    if (!html) return "No summary available for this title.";
    return html.replace(/<[^>]+>/g, "").trim();
}