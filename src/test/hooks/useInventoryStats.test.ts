import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useInventoryStats } from '../../hooks/useInventoryStats';
import type { Product } from '../../models';

describe('useInventoryStats', () => {
  const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'Electronics',
    stock: 10,
    imageUrl: 'https://example.com/image.jpg',
    ...overrides,
  });

  it('should return correct stats for empty product list', () => {
    const { result } = renderHook(() => useInventoryStats([]));

    expect(result.current.totalCount).toBe(0);
    expect(result.current.inStockCount).toBe(0);
    expect(result.current.lowStockCount).toBe(0);
    expect(result.current.outOfStockCount).toBe(0);
    expect(result.current.averagePrice).toBe(0);
  });

  it('should calculate correct totalCount', () => {
    const products = [
      createMockProduct({ id: '1' }),
      createMockProduct({ id: '2' }),
      createMockProduct({ id: '3' }),
    ];

    const { result } = renderHook(() => useInventoryStats(products));

    expect(result.current.totalCount).toBe(3);
  });

  it('should calculate correct stock counts based on stock levels', () => {
    const products = [
      createMockProduct({ id: '1', stock: 10 }), // In Stock (> 5)
      createMockProduct({ id: '2', stock: 3 }),  // Low Stock (1-5)
      createMockProduct({ id: '3', stock: 0 }),  // Out of Stock (0)
      createMockProduct({ id: '4', stock: 15 }), // In Stock (> 5)
      createMockProduct({ id: '5', stock: 5 }),  // Low Stock (1-5)
    ];

    const { result } = renderHook(() => useInventoryStats(products));

    expect(result.current.totalCount).toBe(5);
    expect(result.current.inStockCount).toBe(2);
    expect(result.current.lowStockCount).toBe(2);
    expect(result.current.outOfStockCount).toBe(1);
  });

  it('should calculate correct averagePrice with multiple products', () => {
    const products = [
      createMockProduct({ id: '1', price: 100 }),
      createMockProduct({ id: '2', price: 200 }),
      createMockProduct({ id: '3', price: 300 }),
    ];

    const { result } = renderHook(() => useInventoryStats(products));

    expect(result.current.averagePrice).toBe(200); // (100 + 200 + 300) / 3
  });

  it('should recalculate when products array changes', () => {
    const initialProducts = [createMockProduct({ id: '1', price: 100 })];
    const { result, rerender } = renderHook(
      ({ products }) => useInventoryStats(products),
      { initialProps: { products: initialProducts } }
    );

    expect(result.current.totalCount).toBe(1);
    expect(result.current.averagePrice).toBe(100);

    const updatedProducts = [
      createMockProduct({ id: '1', price: 100 }),
      createMockProduct({ id: '2', price: 200 }),
    ];

    rerender({ products: updatedProducts });

    expect(result.current.totalCount).toBe(2);
    expect(result.current.averagePrice).toBe(150);
  });
});
