import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values (such as search inputs)
 * @template T
 * @param {T} value
 * @param {number} delayMs
 * @returns {T} Debounced value
 */
export function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}

export default useDebounce;
