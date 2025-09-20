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
      <td className="text-lg py-2 px-1">{product.name}</td>
      <td className="text-lg py-2 px-1">
        <ProductImage src={product.imageUrl} alt={product.name} />
      </td>
      <td className="text-lg py-2 px-1">{formatPrice(product.price)}</td>
      <td className="text-lg py-2 px-1">{product.category}</td>
      <td className="text-lg py-2 px-1">{stockStatus}</td>
      <td className="text-lg py-2 px-1">
        <div className="flex flex-row gap-2">
          <Button className="primary-button" label="Edit" onClick={handleEdit} />
          <Button className="primary-button-outline" label="Delete" onClick={handleDelete} />
        </div>
      </td>
    </tr>
  );
}
