import { createContext, useContext } from 'react';

import type { ToastAction, ToastState } from '../reducers/toastReducer';

export const ToastContext = createContext<ToastState | undefined>(undefined);
export const ToastDispatchContext = createContext<React.Dispatch<ToastAction> | undefined>(undefined);

export function useToastContext(): ToastState {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

export function useToastDispatchContext(): React.Dispatch<ToastAction> {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error('useToastDispatchContext must be used within a ToastProvider');
  }
  return context;
}
