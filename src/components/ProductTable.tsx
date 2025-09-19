import type { Product, TableViewMode } from "../models";
import ProductTableRow from "./ProductTableRow";
import ProductTableHeader from "./ProductTableHeader";
import { useState } from "react";
import ProductTableCard from "./ProductTableCard";

interface ProductTableProps {
  products: Product[];
  onClickAddProduct?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickEditProduct?: (productId: Product['id']) => void;
  onClickDeleteProduct?: (productId: Product['id']) => void;
}

export default function ProductTable({ products, onClickAddProduct, onClickEditProduct, onClickDeleteProduct }: ProductTableProps) {
  const [viewMode, setViewMode] = useState<TableViewMode>('table');

  return (
    <div>
      <ProductTableHeader onClickAddProduct={onClickAddProduct} viewMode={viewMode} onChangeViewMode={setViewMode} />
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
              products.map((product) => (
                <ProductTableRow
                  product={product}
                  key={product.id}
                  onClickEdit={onClickEditProduct}
                  onClickDelete={onClickDeleteProduct}
                />
              ))
            }
          </tbody>
        </table>
      )
        : (
          <div className="product-grid">
            {
              products.map((product) => (
                <ProductTableCard
                  product={product}
                  key={product.id}
                  onClickEdit={onClickEditProduct}
                  onClickDelete={onClickDeleteProduct}
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
}
