import type { ProductForm } from "../models";

export const emptyProductForm: ProductForm = {
  id: '',
  name: '',
  description: '',
  price: null,
  category: null,
  stock: null,
  imageUrl: ''
};
