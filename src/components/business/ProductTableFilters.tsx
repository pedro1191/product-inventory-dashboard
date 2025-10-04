import { useCallback } from 'react';

import { categoryOptions, stockStatusOptions } from '../../constants';
import type { ProductFilters } from '../../models';
import NumberInput from '../ui/NumberInput';
import SearchInput from '../ui/SearchInput';
import SelectInput from '../ui/SelectInput';

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
    <div className="flex flex-col gap-6 card">
      <h2>Filters</h2>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <SelectInput
            id="category"
            label="Category"
            value={filters.category}
            options={categoryOptions}
            onChange={handleFieldChange}
          />
          <NumberInput id="minPrice" label="Min Price" placeholder="Min price..." value={filters.minPrice} onChange={handleFieldChange} />
          <NumberInput id="maxPrice" label="Max Price" placeholder="Max price..." value={filters.maxPrice} onChange={handleFieldChange} />
          <SelectInput
            id="stockStatus"
            label="Stock Status"
            value={filters.stockStatus}
            options={stockStatusOptions}
            onChange={handleFieldChange}
          />
        </div>
        <SearchInput
          id="search"
          placeholder="Search by name or description..."
          value={filters.search}
          onChange={handleFieldChange}
        />
      </div>
    </div>
  );
}
