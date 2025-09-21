import ProductTableFilters from '../components/ProductTableFilters'
import ProductTable from '../components/ProductTable'
import InventoryStats from '../components/InventoryStats';
import ThemeToggle from '../components/ThemeToggle';
import { useProductSelectionContext } from '../contexts';
import ProductFormModal from '../components/ProductFormModal';
import ProductDeleteConfirmationModal from '../components/ProductDeleteConfirmationModal';
import { useProductFilters, useHomePageProducts } from '../hooks';
import { useMemo } from 'react';

export default function HomePage() {
  const { products, loadingStates, saveProduct, deleteProduct } = useHomePageProducts();
  const { selectedProductId, isProductModalOpen, isConfirmationModalOpen } = useProductSelectionContext();
  const { filters, setFilters, filteredProducts } = useProductFilters(products);

  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId) ?? null, [products, selectedProductId]);

  return (
    <div className="flex flex-col mx-auto p-10 bg-brand-surface">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1>Product Inventory Dashboard</h1>
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="order-last md:order-first md:col-span-2">
            <ProductTableFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="sm:colspan-1">
            <InventoryStats isLoading={loadingStates.loading} products={products} />
          </div>
        </div>
        <ProductTable isLoading={loadingStates.loading} products={filteredProducts} />
        <ProductFormModal isOpen={isProductModalOpen} isLoading={loadingStates.adding || loadingStates.updating} product={selectedProduct} onSave={saveProduct} />
        <ProductDeleteConfirmationModal isOpen={isConfirmationModalOpen} isLoading={loadingStates.deleting} product={selectedProduct} onConfirm={deleteProduct} />
      </div>
    </div>
  )
}
