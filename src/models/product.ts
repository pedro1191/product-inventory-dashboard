import type { Nullable } from "./common";

export type ProductCategory = 'Electronics' | 'Clothing' | 'Grocery';
export type ProductStockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  imageUrl: string;
}

export interface ProductFilters {
  category: Nullable<ProductCategory>;
  stockStatus: Nullable<ProductStockStatus>;
  search: string;
  minPrice: Nullable<number>;
  maxPrice: Nullable<number>;
}

export interface ProductForm {
  id: string;
  name: string;
  description: string;
  price: Nullable<number>;
  category: Nullable<ProductCategory>;
  stock: Nullable<number>;
  imageUrl: string;
}
