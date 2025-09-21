import { useCallback, useEffect, useRef } from "react";
import { useToastContext, useToastDispatchContext } from "../contexts";
import { TOAST_DURATION_IN_MS } from "../constants";

export function useToast() {
  const { isVisible, message } = useToastContext();
  const timeoutRef = useRef<number | null>(null);
  const dispatch = useToastDispatchContext();

  const handleClose = useCallback(() => {
    dispatch({ type: 'hid_toast' });
  }, [dispatch]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (isVisible) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, TOAST_DURATION_IN_MS);
    }
  }, [isVisible, dispatch, handleClose]);

  return {
    isVisible,
    message,
    handleClose,
  }
}
