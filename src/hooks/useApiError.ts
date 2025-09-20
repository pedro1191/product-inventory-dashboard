import { useCallback } from 'react';
import { AxiosError } from 'axios';
import type { ApiError } from '../models';

/**
 * Custom hook for managing API error creation and handling
 * Provides utilities to create standardized error objects from various error sources
 */
export function useApiError() {
  const createError = useCallback((
    error: unknown,
    operation: 'loading' | 'adding' | 'editing' | 'deleting'
  ): ApiError => {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message || 'An unexpected error occurred';
      const code = error.code;

      return { message, code, status, operation };
    }

    return {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      operation
    };
  }, []);

  const handleApiError = useCallback((
    error: unknown,
    operation: 'loading' | 'adding' | 'editing' | 'deleting',
    controller: AbortController
  ): never => {
    if (controller.signal.aborted) {
      throw new DOMException('Request cancelled', 'AbortError');
    }

    const apiError = createError(error, operation);
    throw apiError;
  }, [createError]);

  return {
    createError,
    handleApiError,
  };
}
