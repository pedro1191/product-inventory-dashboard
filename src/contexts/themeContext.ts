import { createContext, useContext } from 'react';

export interface ToastState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ToastState | undefined>(undefined);

export function useThemeContext(): ToastState {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
