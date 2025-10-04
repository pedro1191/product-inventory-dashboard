import type { TableViewMode } from "../../models";

import { ProductTableCardLoader } from "./ProductTableCardLoader";
import { ProductTableRowLoader } from "./ProductTableRowLoader";
import { SkeletonLoader } from "./SkeletonLoader";

interface ProductTableLoaderProps {
  viewMode: TableViewMode;
}

export function ProductTableLoader({ viewMode }: ProductTableLoaderProps) {
  return (
    <div>
      {viewMode === 'table' ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-1 w-75"><SkeletonLoader /></th>
              <th className="px-1 w-75"><SkeletonLoader /></th>
              <th className="px-1 w-75"><SkeletonLoader /></th>
              <th className="px-1 w-75"><SkeletonLoader /></th>
              <th className="px-1 w-75"><SkeletonLoader /></th>
              <th className="px-1 w-75"><SkeletonLoader /></th>
            </tr>
          </thead>
          <tbody>
            <ProductTableRowLoader />
            <ProductTableRowLoader />
            <ProductTableRowLoader />
            <ProductTableRowLoader />
            <ProductTableRowLoader />
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <ProductTableCardLoader />
          <ProductTableCardLoader />
          <ProductTableCardLoader />
          <ProductTableCardLoader />
          <ProductTableCardLoader />
        </div>
      )}
    </div>
  );
}
