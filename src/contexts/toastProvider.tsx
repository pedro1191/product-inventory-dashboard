import React, { useReducer } from 'react';
import { ToastContext, ToastDispatchContext } from './toastContext';
import {
  toastReducer,
  initialToastState
} from '../reducers/toastReducer';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);

  return (
    <ToastContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastContext.Provider>
  );
}
