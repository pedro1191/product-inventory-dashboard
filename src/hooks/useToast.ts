import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

/**
 * Custom hook for managing toast timeout that automatically resets when message changes
 * 
 * @param onClose - Function to call when timeout expires
 * @param delay - Delay in milliseconds
 * @param message - Message content (timeout resets when this changes and is truthy)
 */
export function useToast(
  message: string | null,
  delay: number,
  onClose: () => void,
) {
  const { reset, clear } = useTimeout(onClose, delay);

  useEffect(() => {
    if (message) {
      reset();
    } else {
      clear();
    }
  }, [message, reset, clear]);
}
