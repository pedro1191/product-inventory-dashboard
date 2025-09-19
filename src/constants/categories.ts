import type { OptionModel, ProductCategory } from "../models";

export const categoryOptions: OptionModel<ProductCategory>[] = [
  { key: 'Electronics', label: 'Electronics' },
  { key: 'Clothing', label: 'Clothing' },
  { key: 'Grocery', label: 'Grocery' }
] as const;
