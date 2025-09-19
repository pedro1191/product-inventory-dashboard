import apiClient from '../api/client';
import type { Product } from "../models";

export class ProductService {
  static async fetchProducts(): Promise<Product[]> {
    const response = await apiClient.get('/products');
    return response.data;
  }

  static async addProduct(product: Product): Promise<Product> {
    const response = await apiClient.post('/products', product);
    return response.data;
  }

  static async updateProduct(product: Product): Promise<Product> {
    const response = await apiClient.put(`/products/${product.id}`, product);
    return response.data;
  }

  static async deleteProduct(productId: Product['id']): Promise<void> {
    await apiClient.delete(`/products/${productId}`);
  }
}
