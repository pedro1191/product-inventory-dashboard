import type { Product } from "../models";

export class ProductService {
  static async fetchProducts(): Promise<Product[]> {
    const data = localStorage.getItem('products');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  static async addProduct(product: Product): Promise<void> {
    const data = localStorage.getItem('products');
    const currentProducts: Product[] = data ? JSON.parse(data) : [];
    localStorage.setItem('products', JSON.stringify([...currentProducts, { ...product, id: Date.now().toString() }]));
  }

  static async updateProduct(product: Product): Promise<void> {
    const data = localStorage.getItem('products');
    const currentProducts: Product[] = data ? JSON.parse(data) : [];
    const updatedProducts = currentProducts.map((p) => (p.id === product.id ? product : p));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  }

  static async deleteProduct(productId: Product['id']): Promise<void> {
    const data = localStorage.getItem('products');
    const currentProducts: Product[] = data ? JSON.parse(data) : [];
    const updatedProducts = currentProducts.filter((p) => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  }
}
