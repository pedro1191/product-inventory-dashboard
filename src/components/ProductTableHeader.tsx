import { useCallback } from "react";
import Toggle from "./Toggle";
import Button from "./Button";
import { tableViewOptions } from "../constants";
import type { TableViewMode } from "../models";
import { useProductSelectionDispatchContext } from "../contexts";

interface ProductTableHeaderProps {
  viewMode: TableViewMode;
  onChangeViewMode: (mode: TableViewMode) => void;
}

export default function ProductTableHeader({ viewMode, onChangeViewMode }: ProductTableHeaderProps) {
  const dispatch = useProductSelectionDispatchContext();

  const handleClickAddProduct = useCallback(() => {
    dispatch({ type: 'opened_add_product_modal' });
  }, [dispatch]);

  return (
    <div>
      <Button label="Add Product" onClick={handleClickAddProduct} />
      <Toggle options={tableViewOptions} value={viewMode} onChange={onChangeViewMode} />
    </div>
  );
}
