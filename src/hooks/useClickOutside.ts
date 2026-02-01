import { useEffect, RefObject } from 'react';

/**
 * Hook to detect clicks outside of specified elements
 */
export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void,
  enabled = true
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, enabled]);
};

export default useClickOutside;
