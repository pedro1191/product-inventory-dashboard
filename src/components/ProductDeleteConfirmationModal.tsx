import { useCallback } from "react";
import { useProductSelectionDispatchContext } from "../contexts";
import type { Nullable, Product } from "../models";
import Button from "./Button";
import Modal from "./Modal";

interface ProductDeleteConfirmationModalProps {
  product: Nullable<Product>;
  isOpen?: boolean;
  onConfirm: (productId: Product['id']) => Promise<void>;
}

export default function ProductDeleteConfirmationModal({ isOpen, product, onConfirm }: ProductDeleteConfirmationModalProps) {
  const dispatch = useProductSelectionDispatchContext();

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'closed_delete_confirmation_modal' });
  }, [dispatch]);

  const handleConfirm = useCallback(() => {
    if (!product) return;
    onConfirm(product.id);
  }, [onConfirm, product]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete <strong>{product?.name}</strong>?</p>
        <Button label="No" onClick={handleCloseModal} />
        <Button label="Yes" onClick={handleConfirm} />
      </div>
    </Modal>
  );
}
