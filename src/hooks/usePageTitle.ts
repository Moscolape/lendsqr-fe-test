import { useEffect } from "react";

/**
 * Custom hook to update the document title dynamically.
 *
 * @param title - The title to set for the page
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Update title whenever it changes
}
