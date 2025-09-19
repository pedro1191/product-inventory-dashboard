import { useProductSelectionDispatchContext } from "../contexts";
import type { Product } from "../models";
import Button from "./Button";
import ProductImage from "./ProductImage";

interface ProductTableRowProps {
  product: Product;
}

export default function ProductTableRow({ product }: ProductTableRowProps) {
  const stockStatus = product.stock <= 0
    ? 'Out of Stock'
    : product.stock > 0 && product.stock <= 5
      ? 'Low Stock'
      : 'In Stock';
  const dispatch = useProductSelectionDispatchContext();

  return (
    <tr>
      <td>
        <ProductImage src={product.imageUrl} alt={product.name} />
      </td>
      <td>{product.name}</td>
      <td>{`$${product.price.toFixed(2)}`}</td>
      <td>{product.category}</td>
      <td>{stockStatus}</td>
      <td>
        <Button label="Edit" onClick={() => dispatch({ type: 'opened_edit_product_modal', productId: product.id })} />
        <Button label="Delete" onClick={() => dispatch({ type: 'opened_delete_confirmation_modal', productId: product.id })} />
      </td>
    </tr>
  );
}
