import type { Product } from "../models";
import { formatPrice } from "../utils";
import { useInventoryStats } from "../hooks";

interface InventoryStatsProps {
  products: Product[];
}

export default function InventoryStats({ products }: InventoryStatsProps) {
  const stats = useInventoryStats(products);

  return (
    <div>
      <p>Total Products: {stats.totalCount}</p>
      <p>In Stock: {stats.inStockCount}</p>
      <p>Low Stock: {stats.lowStockCount}</p>
      <p>Out of Stock: {stats.outOfStockCount}</p>
      <p>Average Product Price: {formatPrice(stats.averagePrice)}</p>
    </div>
  );
};
