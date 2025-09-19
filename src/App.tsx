import { useEffect, useState } from 'react'
import './App.css'
import ProductTableFilters from './components/ProductTableFilters'
import ProductTable from './components/ProductTable'
import type { Nullable, Product, ProductFilters } from './models';
import { ProductService } from './services';
import InventoryStats from './components/InventoryStats';
import { emptyFilters } from './constants';
import Toast from './components/Toast';
import type { ErrorResponse } from './models/api';
import { matchesStockStatus } from './utils';
import {
  ProductSelectionProvider,
  useProductSelectionContext,
  useProductSelectionDispatchContext
} from './contexts';
import ProductFormModal from './components/ProductFormModal';
import ProductDeleteConfirmationModal from './components/ProductDeleteConfirmationModal';

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({ ...emptyFilters });
  const [toastMessage, setToastMessage] = useState<Nullable<string>>(null);

  const { selectedProductId, isProductModalOpen, isConfirmationModalOpen } = useProductSelectionContext();
  const dispatch = useProductSelectionDispatchContext();

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null;

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

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

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await ProductService.fetchProducts();
        setProducts(fetchedProducts);
      } catch (e: unknown) {
        const errorMessage = (e as ErrorResponse).error ?? 'An unexpected error occurred while fetching products.';
        showToast(errorMessage);
      }
    }
    loadProducts();

    return () => {
      // TODO cleanup if necessary
    };
  }, []);

  const handleSaveProduct = async (product: Product): Promise<void> => {
    try {
      if (product.id) {
        await ProductService.updateProduct(product);
      } else {
        await ProductService.addProduct(product);
      }
      dispatch({ type: 'closed_product_modal' });
      const updatedProducts = await ProductService.fetchProducts();
      setProducts(updatedProducts);
      showToast("Product saved successfully");
    } catch (e: unknown) {
      const errorMessage = (e as ErrorResponse).error ?? 'An unexpected error occurred while saving the product.';
      showToast(errorMessage);
    }
  }

  const handleClickConfirmDeleteProduct = async () => {
    if (!selectedProductId) return;

    try {
      await ProductService.deleteProduct(selectedProductId);
      const updatedProducts = await ProductService.fetchProducts();
      setProducts(updatedProducts);
      dispatch({ type: 'cleared_selection' });
      showToast("Product deleted successfully");
    } catch (e: unknown) {
      const errorMessage = (e as ErrorResponse).error ?? 'An unexpected error occurred while deleting the product';
      showToast(errorMessage);
    }
  }

  return (
    <>
      <h1>Product Inventory Dashboard</h1>
      <InventoryStats products={products} />
      <div>
        <ProductTableFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
      <ProductTable products={filteredProducts} />
      <ProductFormModal isOpen={isProductModalOpen} product={selectedProduct} onSave={handleSaveProduct} />
      <ProductDeleteConfirmationModal isOpen={isConfirmationModalOpen} product={selectedProduct} onConfirm={handleClickConfirmDeleteProduct} />
      <Toast message={toastMessage} onClose={hideToast} />
    </>
  )
}

function App() {
  return (
    <ProductSelectionProvider>
      <AppContent />
    </ProductSelectionProvider>
  );
}

export default App
