import { useState } from "react";
import type { Product, TableViewMode } from "../models";
import ProductTableRow from "./ProductTableRow";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableCard from "./ProductTableCard";
import { ProductTableLoader } from "./loaders/ProductTableLoader";

interface ProductTableProps {
  isLoading?: boolean;
  products: Product[];
}

export default function ProductTable({ isLoading, products }: ProductTableProps) {
  const [viewMode, setViewMode] = useState<TableViewMode>('table');

  if (isLoading) {
    return <ProductTableLoader viewMode={viewMode} />;
  }

  return (
    <div>
      <ProductTableHeader viewMode={viewMode} onChangeViewMode={setViewMode} />
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
            {
              products.length === 0 && (
                <tr><td colSpan={5}>No products found</td></tr>
              )
            }
            {
              products.map((product) => (
                <ProductTableRow key={product.id} product={product} />
              ))
            }
          </tbody>
        </table>
      )
        : (
          <div>
            {
              products.map((product) => (
                <ProductTableCard key={product.id} product={product} />
              ))
            }
          </div>
        )
      }
    </div>
  );
}
