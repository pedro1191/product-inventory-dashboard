import { useCallback, useEffect } from 'react';

/**
 * Custom hook for managing AbortController instances
 */
export function useAbortController(abortControllersMap: Map<string, AbortController>) {
  const cancelRequest = useCallback((key: string) => {
    const controller = abortControllersMap.get(key);
    if (controller) {
      controller.abort();
      abortControllersMap.delete(key);
    }
  }, [abortControllersMap]);

  const createAbortController = useCallback((key: string): AbortController => {
    cancelRequest(key);
    const controller = new AbortController();
    abortControllersMap.set(key, controller);
    return controller;
  }, [abortControllersMap, cancelRequest]);

  const cancelAllRequests = useCallback(() => {
    abortControllersMap.forEach((controller) => {
      controller.abort();
    });
    abortControllersMap.clear();
  }, [abortControllersMap]);

  useEffect(() => {
    return () => {
      cancelAllRequests();
    };
  }, [cancelAllRequests]);

  return {
    createAbortController,
    cancelRequest,
    cancelAllRequests,
  };
}
