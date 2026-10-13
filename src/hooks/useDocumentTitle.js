import { useEffect } from "react";

/**
 * Sets the browser document title.
 * Pass a full title, or an object { title } for structured pages.
 */
export function useDocumentTitle(title, { suffix = true } = {}) {
  useEffect(() => {
    document.title = suffix ? `${title} — MOVIE EXPLORER` : title;
    return () => {
      document.title = "MOVIE EXPLORER — Stream & Download Movies Online";
    };
  }, [title, suffix]);
}
