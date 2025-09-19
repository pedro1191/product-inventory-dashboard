import type { OptionModel, ProductStockStatus } from "../models";

export const stockStatusOptions: OptionModel<ProductStockStatus>[] = [
  { key: 'In Stock', label: 'In Stock' },
  { key: 'Low Stock', label: 'Low Stock' },
  { key: 'Out of Stock', label: 'Out of Stock' },
] as const;

export const STOCK_THRESHOLDS = {
  LOW_STOCK: 5,
  OUT_OF_STOCK: 0,
} as const;
