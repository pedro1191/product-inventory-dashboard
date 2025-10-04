import { useCallback } from "react";

import { useProductSelectionDispatchContext } from "../../contexts";
import type { Nullable, Product } from "../../models";
import Modal from "../ui/Modal";

import ProductForm from "./ProductForm";

interface ProductFormModalProps {
  isLoading?: boolean;
  product: Nullable<Product>;
  isOpen?: boolean;
  onSave: (product: Product) => Promise<void>;
}

export default function ProductFormModal({ isOpen, product, isLoading, onSave }: ProductFormModalProps) {
  const dispatch = useProductSelectionDispatchContext();

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'closed_product_modal' });
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div className="flex flex-col gap-10">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
        <ProductForm isLoading={isLoading} product={product} onSave={onSave} />
      </div>
    </Modal>
  );
}
