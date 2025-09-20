import { useState, useCallback, useRef } from "react";
import type { LoadingStates, Product } from "../models";
import apiClient from "../api/client";
import { useAbortController } from "./useAbortController";
import { useApiError } from "./useApiError";

export function useProductApi() {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    loading: false,
    adding: false,
    editing: false,
    deleting: false,
  });

  const abortControllersRef = useRef(new Map<string, AbortController>());

  const { createAbortController } = useAbortController(abortControllersRef.current);
  const { handleApiError } = useApiError();

  const setLoading = useCallback((operation: keyof LoadingStates, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [operation]: isLoading }));
  }, []);

  const loadProducts = useCallback(async (): Promise<Product[]> => {
    const controller = createAbortController('loadProducts');

    try {
      setLoading('loading', true);

      const response = await apiClient.get('/products', {
        signal: controller.signal
      });
      return response.data;
    } catch (e) {
      return handleApiError(e, 'loading', controller);
    } finally {
      setLoading('loading', false);
    }
  }, [setLoading, handleApiError, createAbortController]);

  const addProduct = useCallback(async (product: Product): Promise<Product> => {
    const controller = createAbortController('addProduct');

    try {
      setLoading('adding', true);

      const response = await apiClient.post('/products', product, {
        signal: controller.signal
      });
      return response.data;
    } catch (e) {
      return handleApiError(e, 'adding', controller);
    } finally {
      setLoading('adding', false);
    }
  }, [setLoading, handleApiError, createAbortController]);

  const updateProduct = useCallback(async (product: Product): Promise<Product> => {
    const controller = createAbortController('updateProduct');

    try {
      setLoading('editing', true);

      const response = await apiClient.put(`/products/${product.id}`, product, {
        signal: controller.signal
      });
      return response.data;
    } catch (e) {
      return handleApiError(e, 'editing', controller);
    } finally {
      setLoading('editing', false);
    }
  }, [setLoading, handleApiError, createAbortController]);

  const deleteProduct = useCallback(async (id: Product['id']): Promise<void> => {
    const controller = createAbortController('deleteProduct');

    try {
      setLoading('deleting', true);

      await apiClient.delete(`/products/${id}`, {
        signal: controller.signal
      });
    } catch (e) {
      return handleApiError(e, 'deleting', controller);
    } finally {
      setLoading('deleting', false);
    }
  }, [setLoading, handleApiError, createAbortController]);

  return {
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loadingStates,
  };
}
