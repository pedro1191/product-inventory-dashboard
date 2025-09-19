import type { Product } from "../models";
import ProductImage from "./ProductImage";

interface ProductTableCardProps {
  product: Product;
  onClickEdit?: (productId: Product['id']) => void;
  onClickDelete?: (productId: Product['id']) => void;
}

export default function ProductTableCard({ product, onClickEdit, onClickDelete }: ProductTableCardProps) {
  const stockStatus = product.stock <= 0
    ? 'Out of Stock'
    : product.stock > 0 && product.stock <= 5
      ? 'Low Stock'
      : 'In Stock';

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>Stock Status: {stockStatus}</p>
      <button onClick={() => onClickEdit?.(product.id)}>Edit</button>
      <button onClick={() => onClickDelete?.(product.id)}>Delete</button>
    </div>
  );
}
