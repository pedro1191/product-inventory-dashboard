import type { Product } from "../models";
import { formatPrice } from "../utils";
import { useInventoryStats } from "../hooks";

interface InventoryStatsProps {
  isLoading?: boolean;
  products: Product[];
}

export default function InventoryStats({ isLoading, products }: InventoryStatsProps) {
  const stats = useInventoryStats(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
