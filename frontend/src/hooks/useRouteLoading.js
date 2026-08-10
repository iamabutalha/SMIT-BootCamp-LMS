import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that tracks route changes and provides a smooth `isRouteLoading` status.
 *
 * @param {number} [transitionDuration=180] - Duration in ms before hiding loader
 * @returns {{ isRouteLoading: boolean, location: object }}
 */
export function useRouteLoading(transitionDuration = 180) {
  const location = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const previousPath = useRef(location.pathname);
  const timerRef = useRef(null);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      setIsRouteLoading(true);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setIsRouteLoading(false);
      }, transitionDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname, transitionDuration]);

  return { isRouteLoading, location };
}

export default useRouteLoading;
