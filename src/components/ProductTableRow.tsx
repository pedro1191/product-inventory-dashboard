import type { Product } from "../models";
import ProductImage from "./ProductImage";

interface ProductTableRowProps {
  product: Product;
  onClickEdit?: (productId: Product['id']) => void;
  onClickDelete?: (productId: Product['id']) => void;
}

export default function ProductTableRow({ product, onClickEdit, onClickDelete }: ProductTableRowProps) {
  const stockStatus = product.stock <= 0
    ? 'Out of Stock'
    : product.stock > 0 && product.stock <= 5
      ? 'Low Stock'
      : 'In Stock';

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
        <button onClick={() => onClickEdit?.(product.id)}>Edit</button>
        <button onClick={() => onClickDelete?.(product.id)}>Delete</button>
      </td>
    </tr>
  );
}
