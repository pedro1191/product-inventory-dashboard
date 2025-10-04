import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useProductFilters } from '../../hooks/useProductFilters';
import type { Product } from '../../models';

describe('useProductFilters', () => {
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

  const mockProducts: Product[] = [
    createMockProduct({
      id: '1',
      name: 'iPhone',
      description: 'Apple smartphone',
      price: 999,
      category: 'Electronics',
      stock: 10
    }),
    createMockProduct({
      id: '2',
      name: 'T-Shirt',
      description: 'Cotton t-shirt',
      price: 25,
      category: 'Clothing',
      stock: 3
    }),
    createMockProduct({
      id: '3',
      name: 'Laptop',
      description: 'Gaming laptop',
      price: 1500,
      category: 'Electronics',
      stock: 0
    }),
    createMockProduct({
      id: '4',
      name: 'Bread',
      description: 'Fresh bread loaf',
      price: 3.50,
      category: 'Grocery',
      stock: 20
    }),
    createMockProduct({
      id: '5',
      name: 'Jeans',
      description: 'Blue denim jeans',
      price: 80,
      category: 'Clothing',
      stock: 5
    }),
  ];

  it('should initialize with empty filters and return all products', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    expect(result.current.filters).toEqual({
      category: null,
      stockStatus: null,
      search: '',
      minPrice: null,
      maxPrice: null,
    });
    expect(result.current.filteredProducts).toHaveLength(5);
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });

  describe('category filtering', () => {
    it('should filter by Electronics category', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          category: 'Electronics'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.every(p => p.category === 'Electronics')).toBe(true);
    });

    it('should filter by Clothing category', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          category: 'Clothing'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.every(p => p.category === 'Clothing')).toBe(true);
    });

    it('should filter by Grocery category', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          category: 'Grocery'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(1);
      expect(result.current.filteredProducts[0].category).toBe('Grocery');
    });
  });

  describe('stock status filtering', () => {
    it('should filter by In Stock status', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          stockStatus: 'In Stock'
        });
      });

      // Products with stock > 5: iPhone (10), Bread (20)
      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.map(p => p.name)).toEqual(['iPhone', 'Bread']);
    });

    it('should filter by Low Stock status', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          stockStatus: 'Low Stock'
        });
      });

      // Products with stock 1-5: T-Shirt (3), Jeans (5)
      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.map(p => p.name)).toEqual(['T-Shirt', 'Jeans']);
    });

    it('should filter by Out of Stock status', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          stockStatus: 'Out of Stock'
        });
      });

      // Products with stock 0: Laptop (0)
      expect(result.current.filteredProducts).toHaveLength(1);
      expect(result.current.filteredProducts[0].name).toBe('Laptop');
    });
  });

  describe('price range filtering', () => {
    it('should filter by minimum price', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          minPrice: 100
        });
      });

      // Products with price >= 100: iPhone (999), Laptop (1500)
      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.every(p => p.price >= 100)).toBe(true);
    });

    it('should filter by maximum price', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          maxPrice: 50
        });
      });

      // Products with price <= 50: T-Shirt (25), Bread (3.50)
      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.every(p => p.price <= 50)).toBe(true);
    });

    it('should filter by price range', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          minPrice: 20,
          maxPrice: 100
        });
      });

      // Products with price 20-100: T-Shirt (25), Jeans (80)
      expect(result.current.filteredProducts).toHaveLength(2);
      expect(result.current.filteredProducts.every(p => p.price >= 20 && p.price <= 100)).toBe(true);
    });
  });

  describe('search filtering', () => {
    it('should filter by product name (case insensitive)', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'iphone'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(1);
      expect(result.current.filteredProducts[0].name).toBe('iPhone');
    });

    it('should filter by product description (case insensitive)', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'GAMING'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(1);
      expect(result.current.filteredProducts[0].name).toBe('Laptop');
    });

    it('should filter by partial matches in name or description', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'shirt'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(1);
      expect(result.current.filteredProducts[0].name).toBe('T-Shirt');
    });

    it('should return empty array when search term matches nothing', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'nonexistent'
        });
      });

      expect(result.current.filteredProducts).toHaveLength(0);
    });

    it('should handle empty search string', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: ''
        });
      });

      expect(result.current.filteredProducts).toHaveLength(5);
    });
  });

  describe('combined filtering', () => {
    it('should handle complex filter combinations', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          category: 'Clothing',
          stockStatus: null,
          search: 'jeans',
          minPrice: 50,
          maxPrice: 100,
        });
      });

      // Clothing AND name contains 'jeans' AND price 50-100: Jeans
      expect(result.current.filteredProducts).toHaveLength(1);
      expect(result.current.filteredProducts[0].name).toBe('Jeans');
    });

    it('should return empty array when no products match all filters', () => {
      const { result } = renderHook(() => useProductFilters(mockProducts));

      act(() => {
        result.current.setFilters({
          category: 'Electronics',
          stockStatus: 'Out of Stock',
          search: 'iPhone',
          minPrice: null,
          maxPrice: null,
        });
      });

      // Electronics AND Out of Stock AND name contains 'iPhone': none
      expect(result.current.filteredProducts).toHaveLength(0);
    });
  });
});
