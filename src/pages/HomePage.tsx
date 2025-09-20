import { useCallback, useEffect, useState } from 'react'
import ProductTableFilters from '../components/ProductTableFilters'
import ProductTable from '../components/ProductTable'
import type { Product, ProductFilters } from '../models';
import InventoryStats from '../components/InventoryStats';
import { emptyFilters } from '../constants';
import { matchesStockStatus, isAbortError } from '../utils';
import {
  useProductSelectionContext,
  useProductSelectionDispatchContext,
  useToastDispatchContext
} from '../contexts';
import ProductFormModal from '../components/ProductFormModal';
import ProductDeleteConfirmationModal from '../components/ProductDeleteConfirmationModal';
import { useProductApi } from '../hooks';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({ ...emptyFilters });

  const { selectedProductId, isProductModalOpen, isConfirmationModalOpen } = useProductSelectionContext();
  const dispatch = useProductSelectionDispatchContext();
  const toastDispatch = useToastDispatchContext();
  const { loadProducts, addProduct, updateProduct, deleteProduct } = useProductApi();

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null;

  const showToast = useCallback((message: string) => {
    toastDispatch({ type: 'showed_toast', message });
  }, [toastDispatch]);

  const filteredProducts = products.filter(product => {
    if (filters.category !== null && product.category !== filters.category) {
      return false;
    }
    if (filters.stockStatus !== null && !matchesStockStatus(product.stock, filters.stockStatus)) {
      return false;
    }
    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) && !product.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

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
