import type { ProductFilters } from "../models";

export const emptyFilters: ProductFilters = {
  category: null,
  stockStatus: null,
  search: '',
  priceRange: {
    min: null,
    max: null
  }
};
