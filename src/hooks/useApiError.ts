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
    operation: 'loading' | 'adding' | 'updating' | 'deleting'
  ): ApiError => {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      let message = error.message || 'An unexpected error occurred';
      if (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const responseData = error.response.data as { error: string };
        message = responseData.error;
      }
      const code = error.code;

      return { name: 'ApiError', message, code, status, operation };
    }

    return {
      name: 'ApiError',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      operation
    };
  }, []);

  const handleApiError = useCallback((
    error: unknown,
    operation: 'loading' | 'adding' | 'updating' | 'deleting',
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
