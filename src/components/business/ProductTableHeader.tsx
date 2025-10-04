import { useCallback } from "react";

import { tableViewOptions } from "../../constants";
import { useProductSelectionDispatchContext } from "../../contexts";
import type { TableViewMode } from "../../models";
import Button from "../ui/Button";
import Toggle from "../ui/Toggle";

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
    <div className="flex flex-row justify-between gap-6">
      <Button className="primary-button button-lg" label="Add Product" onClick={handleClickAddProduct} />
      <Toggle options={tableViewOptions} value={viewMode} onChange={onChangeViewMode} />
    </div>
  );
}
