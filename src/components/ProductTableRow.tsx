import { useProductSelectionDispatchContext } from "../contexts";
import type { Product } from "../models";
import { getStockStatus } from "../utils";
import Button from "./Button";
import ProductImage from "./ProductImage";

interface ProductTableRowProps {
  product: Product;
}

export default function ProductTableRow({ product }: ProductTableRowProps) {
  const dispatch = useProductSelectionDispatchContext();
  const stockStatus = getStockStatus(product.stock);

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
