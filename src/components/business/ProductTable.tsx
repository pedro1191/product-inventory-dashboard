import { useState } from "react";

import { columnNames } from "../../constants";
import type { Product, TableViewMode } from "../../models";
import { ProductTableLoader } from "../loaders/ProductTableLoader";

import ProductTableCard from "./ProductTableCard";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
  isLoading?: boolean;
  products: Product[];
}

export default function ProductTable({ isLoading, products }: ProductTableProps) {
  const [viewMode, setViewMode] = useState<TableViewMode>('table');

  return (
    <div className="flex flex-col gap-6 card">
      <ProductTableHeader viewMode={viewMode} onChangeViewMode={setViewMode} />
      {
        isLoading
          ? <ProductTableLoader viewMode={viewMode} />
          : viewMode === 'table' ? (
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {
                      columnNames.map((column) => (
                        <th key={column} className="text-left whitespace-nowrap px-1 text-base sm:text-lg w-75">{column}</th>
                      ))
                    }
                    <th className="px-1 w-75"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.length === 0 ? (
                      <tr><td className="text-center text-lg p-10" colSpan={6}>No products found =/</td></tr>
                    ) : products.map((product) => (
                      <ProductTableRow key={product.id} product={product} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
            : products.length === 0 ? (
              <div className="text-center text-lg p-10">No products found =/</div>
            ) : (
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
