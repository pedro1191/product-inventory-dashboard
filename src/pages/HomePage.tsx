import { useCallback, useEffect, useState } from 'react'
import ProductTableFilters from '../components/ProductTableFilters'
import ProductTable from '../components/ProductTable'
import type { Product } from '../models';
import InventoryStats from '../components/InventoryStats';
import { isAbortError } from '../utils';
import {
  useProductSelectionContext,
  useProductSelectionDispatchContext,
  useToastDispatchContext
} from '../contexts';
import ProductFormModal from '../components/ProductFormModal';
import ProductDeleteConfirmationModal from '../components/ProductDeleteConfirmationModal';
import { useProductApi, useProductFilters } from '../hooks';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const { selectedProductId, isProductModalOpen, isConfirmationModalOpen } = useProductSelectionContext();
  const dispatch = useProductSelectionDispatchContext();
  const toastDispatch = useToastDispatchContext();
  const { loadProducts, addProduct, updateProduct, deleteProduct } = useProductApi();
  const { filters, setFilters, filteredProducts } = useProductFilters(products);

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null;

  const showToast = useCallback((message: string) => {
    toastDispatch({ type: 'showed_toast', message });
  }, [toastDispatch]);

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await loadProducts();
      setProducts(fetchedProducts);
    } catch (e) {
      if (isAbortError(e)) {
        return;
      }
      console.error(e);
      showToast('An unexpected error occurred while fetching products.');
    }
  }, [loadProducts, showToast, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSaveProduct = async (product: Product): Promise<void> => {
    try {
      if (product.id) {
        await updateProduct(product);
      } else {
        await addProduct(product);
      }
      dispatch({ type: 'closed_product_modal' });
      const updatedProducts = await loadProducts();
      setProducts(updatedProducts);
      showToast("Product saved successfully");
    } catch (e) {
      if (isAbortError(e)) {
        return;
      }
      console.error(e);
      showToast('An unexpected error occurred while saving the product.');
    }
  }

  const handleDeleteProduct = async (id: Product['id']) => {
    try {
      await deleteProduct(id);
      const updatedProducts = await loadProducts();
      setProducts(updatedProducts);
      dispatch({ type: 'cleared_selection' });
      showToast("Product deleted successfully");
    } catch (e) {
      if (isAbortError(e)) {
        return;
      }
      console.error(e);
      showToast('An unexpected error occurred while deleting the product.');
    }
  }

  return (
    <>
      <h1>Product Inventory Dashboard</h1>
      <InventoryStats products={products} />
      <ProductTableFilters filters={filters} onFiltersChange={setFilters} />
      <ProductTable products={filteredProducts} />
      <ProductFormModal isOpen={isProductModalOpen} product={selectedProduct} onSave={handleSaveProduct} />
      <ProductDeleteConfirmationModal isOpen={isConfirmationModalOpen} product={selectedProduct} onConfirm={handleDeleteProduct} />
    </>
  )
}
