import type { Product } from "../models";
import { formatPrice } from "../utils";
import { useInventoryStats } from "../hooks";
import { InventoryStatsLoader } from "./loaders/InventoryStatsLoader";

interface InventoryStatsProps {
  isLoading?: boolean;
  products: Product[];
}

export default function InventoryStats({ isLoading, products }: InventoryStatsProps) {
  const stats = useInventoryStats(products);

  if (isLoading) {
    return <InventoryStatsLoader />;
  }

  return (
    <div className="flex flex-col gap-1 card">
      <p className="text-base sm:text-lg font-normal">Total Products: <span className="text-base sm:text-lg font-bold"> {stats.totalCount}</span></p>
      <p className="text-base sm:text-lg font-normal">In Stock: <span className="text-base sm:text-lg font-bold"> {stats.inStockCount}</span></p>
      <p className="text-base sm:text-lg font-normal">Low Stock: <span className="text-base sm:text-lg font-bold"> {stats.lowStockCount}</span></p>
      <p className="text-base sm:text-lg font-normal">Out of Stock: <span className="text-base sm:text-lg font-bold"> {stats.outOfStockCount}</span></p>
      <p className="text-base sm:text-lg font-normal">Average Product Price: <span className="text-base sm:text-lg font-bold"> {formatPrice(stats.averagePrice)}</span></p>
    </div>
  );
};
