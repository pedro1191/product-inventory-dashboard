import { useState, useMemo } from 'react';
import type { Product, ProductFilters } from '../models';
import { emptyFilters } from '../constants';
import { matchesStockStatus } from '../utils';

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>({ ...emptyFilters });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category !== null && product.category !== filters.category) {
        return false;
      }

      if (filters.stockStatus !== null && !matchesStockStatus(product.stock, filters.stockStatus)) {
        return false;
      }

      if (filters.minPrice !== null && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }

      if (filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  return {
    filters,
    setFilters,
    filteredProducts,
  };
}
