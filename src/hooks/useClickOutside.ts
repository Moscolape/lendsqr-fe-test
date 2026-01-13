import { type RefObject, useEffect } from "react";

/**
 * Custom hook to detect clicks outside a referenced element and execute a callback.
 * Useful for closing modals, dropdowns, or popovers when clicking outside.
 *
 * @param ref - The main element to detect outside clicks for
 * @param handler - Callback function to execute when a click outside is detected
 * @param ignoreRefs - Optional array of additional elements to ignore clicks on
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  ignoreRefs: RefObject<HTMLElement | null>[] = []
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;

      // Ignore clicks inside the main element
      if (!ref.current || ref.current.contains(target)) return;

      // Ignore clicks inside any specified ignoreRefs elements
      for (const ignoreRef of ignoreRefs) {
        if (ignoreRef.current?.contains(target)) return;
      }

      // Trigger the callback if click is outside
      handler();
    };

    // Attach mousedown listener
    document.addEventListener("mousedown", listener);

    // Clean up listener on unmount or dependency change
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, ignoreRefs]);
}