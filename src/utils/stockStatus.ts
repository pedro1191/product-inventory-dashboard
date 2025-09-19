import { STOCK_THRESHOLDS } from "../constants";
import type { ProductStockStatus } from "../models";

export function getStockStatus(stock: number): ProductStockStatus {
  if (stock <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
    return 'Out of Stock';
  }

  if (stock > STOCK_THRESHOLDS.OUT_OF_STOCK && stock <= STOCK_THRESHOLDS.LOW_STOCK) {
    return 'Low Stock';
  }

  return 'In Stock';
}

export function matchesStockStatus(stock: number, filterStatus: ProductStockStatus): boolean {
  return getStockStatus(stock) === filterStatus;
}
