import type { TableViewMode } from "../../models";
import { ProductTableCardLoader } from "./ProductTableCardLoader";

interface ProductTableLoaderProps {
  viewMode: TableViewMode;
}

export function ProductTableLoader({ viewMode }: ProductTableLoaderProps) {
  return (
    <div>
      {viewMode === 'table' ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>
          <ProductTableCardLoader />
          <ProductTableCardLoader />
          <ProductTableCardLoader />
        </div>
      )}
    </div>
  );
}
