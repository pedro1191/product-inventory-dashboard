import { useProductSelectionDispatchContext } from "../contexts";
import type { Product } from "../models";
import { getStockStatus } from "../utils";
import Button from "./Button";
import ProductImage from "./ProductImage";

interface ProductTableCardProps {
  product: Product;
}

export default function ProductTableCard({ product }: ProductTableCardProps) {
  const dispatch = useProductSelectionDispatchContext();
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>Stock Status: {stockStatus}</p>
      <Button label="Edit" onClick={() => dispatch({ type: 'opened_edit_product_modal', productId: product.id })} />
      <Button label="Delete" onClick={() => dispatch({ type: 'opened_delete_confirmation_modal', productId: product.id })} />
    </div>
  );
}
