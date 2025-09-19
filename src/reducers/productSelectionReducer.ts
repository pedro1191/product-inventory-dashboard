import type { Nullable, Product } from '../models';

export interface ProductSelectionState {
  selectedProductId: Nullable<Product['id']>;
  isProductModalOpen: boolean;
  isConfirmationModalOpen: boolean;
}

export type ProductSelectionAction =
  | { type: 'opened_add_product_modal' }
  | { type: 'opened_edit_product_modal'; productId: Product['id'] }
  | { type: 'opened_delete_confirmation_modal'; productId: Product['id'] }
  | { type: 'closed_product_modal' }
  | { type: 'closed_delete_confirmation_modal' }
  | { type: 'cleared_selection' };

export const initialProductSelectionState: ProductSelectionState = {
  selectedProductId: null,
  isProductModalOpen: false,
  isConfirmationModalOpen: false,
};

export function productSelectionReducer(
  state: ProductSelectionState,
  action: ProductSelectionAction
): ProductSelectionState {
  switch (action.type) {
    case 'opened_add_product_modal':
      return {
        ...state,
        selectedProductId: null,
        isProductModalOpen: true,
        isConfirmationModalOpen: false,
      };

    case 'opened_edit_product_modal':
      return {
        ...state,
        selectedProductId: action.productId,
        isProductModalOpen: true,
        isConfirmationModalOpen: false,
      };

    case 'opened_delete_confirmation_modal':
      return {
        ...state,
        selectedProductId: action.productId,
        isProductModalOpen: false,
        isConfirmationModalOpen: true,
      };

    case 'closed_product_modal':
      return {
        ...state,
        isProductModalOpen: false,
      };

    case 'closed_delete_confirmation_modal':
      return {
        ...state,
        isConfirmationModalOpen: false,
      };

    case 'cleared_selection':
      return {
        ...state,
        selectedProductId: null,
        isProductModalOpen: false,
        isConfirmationModalOpen: false,
      };

    default:
      return state;
  }
}
