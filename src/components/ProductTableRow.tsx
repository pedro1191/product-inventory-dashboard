import { useCallback } from "react";
import { useProductSelectionDispatchContext } from "../contexts";
import type { Product } from "../models";
import { getStockStatus, formatPrice } from "../utils";
import Button from "./Button";
import ProductImage from "./ProductImage";

interface ProductTableRowProps {
  product: Product;
}

export default function ProductTableRow({ product }: ProductTableRowProps) {
  const dispatch = useProductSelectionDispatchContext();
  const stockStatus = getStockStatus(product.stock);

  const handleEdit = useCallback(() => {
    dispatch({ type: 'opened_edit_product_modal', productId: product.id });
  }, [dispatch, product.id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: 'opened_delete_confirmation_modal', productId: product.id });
  }, [dispatch, product.id]);

  return (
    <tr>
      <td>
        <ProductImage src={product.imageUrl} alt={product.name} />
      </td>
      <td>{product.name}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.category}</td>
      <td>{stockStatus}</td>
      <td>
        <Button label="Edit" onClick={handleEdit} />
        <Button label="Delete" onClick={handleDelete} />
      </td>
    </tr>
  );
}
