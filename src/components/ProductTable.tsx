import { useState } from "react";
import type { Product, TableViewMode } from "../models";
import ProductTableRow from "./ProductTableRow";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableCard from "./ProductTableCard";
import { ProductTableLoader } from "./loaders/ProductTableLoader";
import { columnNames } from "../constants";

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
    <div className="flex flex-col gap-6 card">
      <ProductTableHeader viewMode={viewMode} onChangeViewMode={setViewMode} />
      {viewMode === 'table' ? (
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                {
                  columnNames.map((column) => (
                    <th key={column} className="text-left whitespace-nowrap px-1 text-lg">{column}</th>
                  ))
                }
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
        </div>
      )
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
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
