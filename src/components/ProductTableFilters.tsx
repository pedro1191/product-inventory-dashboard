import { useCallback } from 'react';
import type { Nullable, ProductCategory, ProductFilters, ProductStockStatus } from '../models';
import NumberInput from './NumberInput';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';
import { categoryOptions, stockStatusOptions } from '../constants';

interface ProductTableFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export default function ProductTableFilters({ filters, onFiltersChange }: ProductTableFiltersProps) {

  const onCategoryChange = useCallback((value: Nullable<ProductCategory>) => {
    onFiltersChange({ ...filters, category: value });
  }, [filters, onFiltersChange]);

  const onStockStatusChange = useCallback((value: Nullable<ProductStockStatus>) => {
    onFiltersChange({ ...filters, stockStatus: value });
  }, [filters, onFiltersChange]);

  const onMinPriceChange = useCallback((value: Nullable<number>) => {
    onFiltersChange({ ...filters, priceRange: { ...filters.priceRange, min: value } });
  }, [filters, onFiltersChange]);

  const onMaxPriceChange = useCallback((value: Nullable<number>) => {
    onFiltersChange({ ...filters, priceRange: { ...filters.priceRange, max: value } });
  }, [filters, onFiltersChange]);

  const onSearchChange = useCallback((value: string) => {
    onFiltersChange({ ...filters, search: value });
  }, [filters, onFiltersChange]);

  return (
    <div>
      <div>
        <span>Filters</span>
      </div>
      <SelectInput
        id="category"
        label="Category"
        value={filters.category}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
      <div>
        <NumberInput id="minPrice" label="Min Price:" placeholder="Min price..." value={filters.priceRange.min} onChange={onMinPriceChange} />
        <NumberInput id="maxPrice" label="Max Price:" placeholder="Max price..." value={filters.priceRange.max} onChange={onMaxPriceChange} />
      </div>
      <SelectInput
        id="stockStatus"
        label="Stock Status"
        value={filters.stockStatus}
        options={stockStatusOptions}
        onChange={onStockStatusChange}
      />
      <SearchInput
        placeholder="Search by name or description..."
        value={filters.search}
        onChange={onSearchChange}
      />
    </div>
  );
}
