import { useEffect } from "react";

/**
 * Sets the browser document title.
 * Pass a full title, or an object { title } for structured pages.
 */
export function useDocumentTitle(title, { suffix = true } = {}) {
  useEffect(() => {
    document.title = suffix ? `${title} — CineboxBD` : title;
    return () => {
      document.title = "CineboxBD — Stream & Download Movies Online";
    };
  }, [title, suffix]);
}
