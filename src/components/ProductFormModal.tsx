import { useProductSelectionDispatchContext } from "../contexts";
import type { Nullable, Product } from "../models";
import Modal from "./Modal";
import ProductForm from "./ProductForm";

interface ProductFormModalProps {
  product: Nullable<Product>;
  isOpen?: boolean;
  onSave?: (product: Product) => Promise<void>;
}

export default function ProductFormModal({ isOpen, product, onSave }: ProductFormModalProps) {
  const dispatch = useProductSelectionDispatchContext();

  const handleCloseModal = () => {
    dispatch({ type: 'closed_product_modal' });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ProductForm product={product} onSave={onSave} />
    </Modal>
  );
}
