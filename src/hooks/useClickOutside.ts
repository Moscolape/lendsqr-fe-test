import { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  ignoreRefs: RefObject<HTMLElement | null>[] = []
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!ref.current || ref.current.contains(target)) return;

      for (const ignoreRef of ignoreRefs) {
        if (ignoreRef.current?.contains(target)) return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, ignoreRefs]);
}
