import type { Product } from "../models";

interface InventoryStatsProps {
  products: Product[];
}

export default function InventoryStats({ products }: InventoryStatsProps) {
  return (
    <div>
      <p>Total Products: {products.length}</p>
      <p>In Stock: {products.filter(p => p.stock > 0).length}</p>
      <p>Low Stock: {products.filter(p => p.stock > 0 && p.stock <= 5).length}</p>
      <p>Out of Stock: {products.filter(p => p.stock <= 0).length}</p>
      <p>Average Product Price: ${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : 0}</p>
    </div>
  );
};
