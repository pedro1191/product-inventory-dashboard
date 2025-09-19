import { useCallback } from "react";
import { useProductSelectionDispatchContext } from "../contexts";
import type { Product } from "../models";
import { getStockStatus, formatPrice } from "../utils";
import Button from "./Button";
import ProductImage from "./ProductImage";

interface ProductTableCardProps {
  product: Product;
}

export default function ProductTableCard({ product }: ProductTableCardProps) {
  const dispatch = useProductSelectionDispatchContext();
  const stockStatus = getStockStatus(product.stock);

  const handleEdit = useCallback(() => {
    dispatch({ type: 'opened_edit_product_modal', productId: product.id });
  }, [dispatch, product.id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: 'opened_delete_confirmation_modal', productId: product.id });
  }, [dispatch, product.id]);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <p>Price: {formatPrice(product.price)}</p>
      <p>Category: {product.category}</p>
      <p>Stock Status: {stockStatus}</p>
      <Button label="Edit" onClick={handleEdit} />
      <Button label="Delete" onClick={handleDelete} />
    </div>
  );
}
