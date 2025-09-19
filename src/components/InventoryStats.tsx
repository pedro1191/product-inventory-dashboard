import type { Product } from "../models";
import { matchesStockStatus } from "../utils";

interface InventoryStatsProps {
  products: Product[];
}

export default function InventoryStats({ products }: InventoryStatsProps) {
  const inStockCount = products.filter(p => matchesStockStatus(p.stock, 'In Stock')).length;
  const lowStockCount = products.filter(p => matchesStockStatus(p.stock, 'Low Stock')).length;
  const outOfStockCount = products.filter(p => matchesStockStatus(p.stock, 'Out of Stock')).length;

  return (
    <div>
      <p>Total Products: {products.length}</p>
      <p>In Stock: {inStockCount}</p>
      <p>Low Stock: {lowStockCount}</p>
      <p>Out of Stock: {outOfStockCount}</p>
      <p>Average Product Price: ${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : 0}</p>
    </div>
  );
};
