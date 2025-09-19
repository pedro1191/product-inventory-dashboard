import { useMemo } from 'react';
import type { Product } from '../models';
import { matchesStockStatus } from '../utils';

export function useInventoryStats(products: Product[]) {
  return useMemo(() => {
    const totalCount = products.length;
    const inStockCount = products.filter(p => matchesStockStatus(p.stock, 'In Stock')).length;
    const lowStockCount = products.filter(p => matchesStockStatus(p.stock, 'Low Stock')).length;
    const outOfStockCount = products.filter(p => matchesStockStatus(p.stock, 'Out of Stock')).length;

    const averagePrice = totalCount > 0
      ? products.reduce((sum, product) => sum + product.price, 0) / totalCount
      : 0;

    return {
      totalCount,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      averagePrice,
    };
  }, [products]);
}
