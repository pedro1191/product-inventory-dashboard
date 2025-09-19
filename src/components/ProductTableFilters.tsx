import { useCallback } from 'react';
import type { ProductFilters } from '../models';
import NumberInput from './NumberInput';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';
import { categoryOptions, stockStatusOptions } from '../constants';

interface ProductTableFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export default function ProductTableFilters({ filters, onFiltersChange }: ProductTableFiltersProps) {

  const handleFieldChange = useCallback(<K extends keyof ProductFilters>(
    field: K,
    value: ProductFilters[K]
  ) => {
    onFiltersChange({ ...filters, [field]: value });
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
        onChange={handleFieldChange}
      />
      <div>
        <NumberInput id="minPrice" label="Min Price:" placeholder="Min price..." value={filters.minPrice} onChange={handleFieldChange} />
        <NumberInput id="maxPrice" label="Max Price:" placeholder="Max price..." value={filters.maxPrice} onChange={handleFieldChange} />
      </div>
      <SelectInput
        id="stockStatus"
        label="Stock Status"
        value={filters.stockStatus}
        options={stockStatusOptions}
        onChange={handleFieldChange}
      />
      <SearchInput
        id="search"
        placeholder="Search by name or description..."
        value={filters.search}
        onChange={handleFieldChange}
      />
    </div>
  );
}
