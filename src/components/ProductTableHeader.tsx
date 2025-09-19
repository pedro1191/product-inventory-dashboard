import Toggle from "./Toggle";
import Button from "./Button";
import { tableViewOptions } from "../constants";
import type { TableViewMode } from "../models";

interface ProductTableHeaderProps {
  viewMode: TableViewMode;
  onChangeViewMode?: (mode: TableViewMode) => void;
  onClickAddProduct?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ProductTableHeader({ onClickAddProduct, viewMode, onChangeViewMode }: ProductTableHeaderProps) {
  return (
    <div>
      <Button label="Add Product" onClick={onClickAddProduct} />
      <Toggle options={tableViewOptions} value={viewMode} onChange={onChangeViewMode} />
    </div>
  );
}
