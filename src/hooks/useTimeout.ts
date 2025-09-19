import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Custom hook for managing timeouts with automatic cleanup and reset functionality
 * 
 * @param callback - Function to execute when timeout expires. Callback changes won't restart the timeout.
 * @param delay - Delay in milliseconds
 * @returns Object with reset and clear functions
 * @returns returns.reset - Function to restart the timeout from the beginning
 * @returns returns.clear - Function to cancel the timeout completely
 */
export function useTimeout(
  callback: () => void,
  delay: number
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    clear();

    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return clear;
  }, [delay, resetTrigger, clear]);

  const reset = useCallback(() => {
    setResetTrigger(prev => prev + 1);
  }, []);

  return { reset, clear };
}
