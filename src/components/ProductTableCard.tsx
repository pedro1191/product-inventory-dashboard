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
    <div className="flex flex-col gap-4 card">
      <div className="text-lg font-bold">{product.name}</div>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-base font-bold">Price: <span className="font-normal">{formatPrice(product.price)}</span></p>
          <p className="text-base font-bold">Category: <span className="font-normal">{product.category}</span></p>
          <p className="text-base font-bold">Stock Status: <span className="font-normal">{stockStatus}</span></p>
        </div>
        <div className="flex flex-row gap-3">
          <Button className="primary-button" label="Edit" onClick={handleEdit} />
          <Button className="primary-button-outline" label="Delete" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
