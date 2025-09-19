import React, { useReducer } from 'react';
import { ProductSelectionContext, ProductSelectionDispatchContext } from './productSelectionContext';
import {
  productSelectionReducer,
  initialProductSelectionState
} from '../reducers';

interface ProductSelectionProviderProps {
  children: React.ReactNode;
}

export function ProductSelectionProvider({ children }: ProductSelectionProviderProps) {
  const [state, dispatch] = useReducer(productSelectionReducer, initialProductSelectionState);

  return (
    <ProductSelectionContext.Provider value={state}>
      <ProductSelectionDispatchContext.Provider value={dispatch}>
        {children}
      </ProductSelectionDispatchContext.Provider>
    </ProductSelectionContext.Provider>
  );
}
