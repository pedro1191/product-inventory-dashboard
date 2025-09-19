import type { OptionModel, TableViewMode } from "../models";

export const tableViewOptions: OptionModel<TableViewMode>[] = [
  { key: 'table', label: 'Table' },
  { key: 'card', label: 'Card' }
] as const;
