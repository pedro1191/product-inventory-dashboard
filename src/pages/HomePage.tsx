import ProductTableFilters from '../components/ProductTableFilters'
import ProductTable from '../components/ProductTable'
import InventoryStats from '../components/InventoryStats';
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
    <>
      <h1>Product Inventory Dashboard</h1>
      <InventoryStats isLoading={loadingStates.loading} products={products} />
      <ProductTableFilters filters={filters} onFiltersChange={setFilters} />
      <ProductTable isLoading={loadingStates.loading} products={filteredProducts} />
      <ProductFormModal isOpen={isProductModalOpen} isLoading={loadingStates.adding || loadingStates.updating} product={selectedProduct} onSave={saveProduct} />
      <ProductDeleteConfirmationModal isOpen={isConfirmationModalOpen} isLoading={loadingStates.deleting} product={selectedProduct} onConfirm={deleteProduct} />
    </>
  )
}
