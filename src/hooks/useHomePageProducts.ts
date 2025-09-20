import { useCallback, useEffect, useState } from "react";
import type { Product } from "../models";
import { useProductApi } from "./useProductApi";
import { isAbortError } from "../utils";
import { useProductSelectionDispatchContext, useToastDispatchContext } from "../contexts";

export function useHomePageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { loadingStates, loadProducts, addProduct, updateProduct, deleteProduct: deleteProductApi } = useProductApi();
  const dispatch = useProductSelectionDispatchContext();
  const toastDispatch = useToastDispatchContext();

  const handleError = useCallback((e: unknown, message: string): void => {
    if (isAbortError(e)) {
      return;
    }
    console.error(e);
    toastDispatch({ type: 'showed_toast', message });
  }, [toastDispatch]);

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await loadProducts();
      setProducts(fetchedProducts);
    } catch (e) {
      handleError(e, 'An unexpected error occurred while fetching products.');
    }
  }, [loadProducts, setProducts, handleError]);

  const handleSuccess = useCallback((message: string) => {
    dispatch({ type: 'cleared_selection' });
    toastDispatch({ type: 'showed_toast', message });
    dispatch({ type: 'closed_product_modal' });
    fetchProducts();
  }, [dispatch, toastDispatch, fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const saveProduct = useCallback(async (product: Product): Promise<void> => {
    try {
      if (product.id) {
        await updateProduct(product);
      } else {
        await addProduct(product);
      }
      handleSuccess("Product saved successfully");
    } catch (e) {
      handleError(e, 'An unexpected error occurred while saving the product.');
    }
  }, [updateProduct, addProduct, handleSuccess, handleError]);

  const deleteProduct = useCallback(async (id: Product['id']) => {
    try {
      await deleteProductApi(id);
      handleSuccess("Product deleted successfully");
    } catch (e) {
      handleError(e, 'An unexpected error occurred while deleting the product.');
    }
  }, [deleteProductApi, handleSuccess, handleError]);

  return {
    products,
    loadingStates,
    saveProduct,
    deleteProduct,
  }
}
