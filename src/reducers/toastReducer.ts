import type { Nullable } from '../models';

export interface ToastState {
  message: Nullable<string>;
  isVisible: boolean;
}

export type ToastAction =
  | { type: 'showed_toast'; message: string }
  | { type: 'hid_toast' };

export const initialToastState: ToastState = {
  message: null,
  isVisible: false,
};

export function toastReducer(
  state: ToastState,
  action: ToastAction
): ToastState {
  switch (action.type) {
    case 'showed_toast':
      return {
        message: action.message,
        isVisible: true,
      };

    case 'hid_toast':
      return {
        message: null,
        isVisible: false,
      };

    default:
      return state;
  }
}
