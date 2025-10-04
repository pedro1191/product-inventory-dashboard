import React, { useReducer } from 'react';

import {
  toastReducer,
  initialToastState
} from '../reducers/toastReducer';

import { ToastContext, ToastDispatchContext } from './toastContext';

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
