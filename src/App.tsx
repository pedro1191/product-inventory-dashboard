import { useEffect, useState } from 'react'
import './App.css'
import ProductTableFilters from './components/ProductTableFilters'
import ProductTable from './components/ProductTable'
import type { Product, ProductFilters } from './models';
import Modal from './components/Modal';
import ProductForm from './components/ProductForm';
import { ProductService } from './services';
import InventoryStats from './components/InventoryStats';
import { emptyFilters } from './constants';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({ ...emptyFilters });
  const [selectedProductId, setSelectedProductId] = useState<Product['id'] | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null;

  const filteredProducts = products.filter(product => {
    if (filters.category !== null && product.category !== filters.category) {
      return false;
    }
    if (filters.stockStatus === 'In Stock' && product.stock <= 0) {
      return false;
    }
    if (filters.stockStatus === 'Low Stock' && !(product.stock > 0 && product.stock <= 5)) {
      return false;
    }
    if (filters.stockStatus === 'Out of Stock' && product.stock > 0) {
      return false;
    }
    if (filters.priceRange.min !== null && product.price < filters.priceRange.min) {
      return false;
    }
    if (filters.priceRange.max !== null && product.price > filters.priceRange.max) {
      return false;
    }
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) && !product.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    async function loadProducts() {
      const fetchedProducts = await ProductService.fetchProducts();
      setProducts(fetchedProducts);
    }
    loadProducts();

    return () => {
      // TODO cleanup if necessary
    };
  }, []);

  const handleSaveProduct = async (product: Product): Promise<void> => {
    if (product.id) {
      await ProductService.updateProduct(product);
    } else {
      await ProductService.addProduct(product);
    }
    handleCloseModal();
    const updatedProducts = await ProductService.fetchProducts();
    setProducts(updatedProducts);
  }

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
  }

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  }

  const handleClickAddProduct = () => {
    setSelectedProductId(null);
    setIsProductModalOpen(true);
  }

  const handleClickEditProduct = (productId: Product['id']) => {
    setSelectedProductId(productId);
    setIsProductModalOpen(true);
  }

  const handleClickDeleteProduct = (productId: Product['id']) => {
    setSelectedProductId(productId);
    setIsConfirmationModalOpen(true);
  }

  const handleClickCancelDeleteProduct = () => {
    setSelectedProductId(null);
    setIsConfirmationModalOpen(false);
  }

  const handleClickConfirmDeleteProduct = async () => {
    if (!selectedProductId) return;
    await ProductService.deleteProduct(selectedProductId);
    const updatedProducts = await ProductService.fetchProducts();
    setProducts(updatedProducts);
    setIsConfirmationModalOpen(false);
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
      <ProductTable
        products={filteredProducts}
        onClickAddProduct={handleClickAddProduct}
        onClickEditProduct={handleClickEditProduct}
        onClickDeleteProduct={handleClickDeleteProduct}
      />
      <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
        <ProductForm
          product={selectedProduct}
          onCancel={handleCloseModal}
          onSave={handleSaveProduct}
        />
      </Modal>
      <Modal isOpen={isConfirmationModalOpen} onClose={handleCloseConfirmationModal}>
        <div>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?</p>
          <button onClick={handleClickCancelDeleteProduct}>No</button>
          <button onClick={handleClickConfirmDeleteProduct}>Yes</button>
        </div>
      </Modal>
    </>
  )
}

export default App
