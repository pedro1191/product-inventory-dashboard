import { createContext, useContext } from 'react';

import type { ProductSelectionAction, ProductSelectionState } from '../reducers';

export const ProductSelectionContext = createContext<ProductSelectionState | undefined>(undefined);
export const ProductSelectionDispatchContext = createContext<React.Dispatch<ProductSelectionAction> | undefined>(undefined);

export function useProductSelectionContext(): ProductSelectionState {
  const context = useContext(ProductSelectionContext);
  if (context === undefined) {
    throw new Error('useProductSelectionContext must be used within a ProductSelectionProvider');
  }
  return context;
}

export function useProductSelectionDispatchContext(): React.Dispatch<ProductSelectionAction> {
  const context = useContext(ProductSelectionDispatchContext);
  if (context === undefined) {
    throw new Error('useProductSelectionDispatchContext must be used within a ProductSelectionProvider');
  }
  return context;
}
