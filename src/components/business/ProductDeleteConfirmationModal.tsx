import { useCallback } from "react";

import { useProductSelectionDispatchContext } from "../../contexts";
import type { Nullable, Product } from "../../models";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface ProductDeleteConfirmationModalProps {
  isLoading?: boolean;
  product: Nullable<Product>;
  isOpen?: boolean;
  onConfirm: (productId: Product['id']) => Promise<void>;
}

export default function ProductDeleteConfirmationModal({ isOpen, product, isLoading, onConfirm }: ProductDeleteConfirmationModalProps) {
  const dispatch = useProductSelectionDispatchContext();

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'closed_delete_confirmation_modal' });
  }, [dispatch]);

  const handleConfirm = useCallback(() => {
    if (!product) return;
    void onConfirm(product.id);
  }, [onConfirm, product]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete <strong>{product?.name}</strong>?</p>
        </div>
        <div className="action-buttons">
          <Button className="primary-button-outline" disabled={isLoading} label="No" onClick={handleCloseModal} />
          <Button className="primary-button" disabled={isLoading} label={isLoading ? "Deleting..." : "Yes"} onClick={handleConfirm} isLoading={isLoading} />
        </div>
      </div>
    </Modal>
  );
}
