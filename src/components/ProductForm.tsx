import { useEffect, useState } from "react";
import type { Nullable, Product, ProductCategory } from "../models";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { categoryOptions, defaultCategory } from "../constants";
import ProductImage from "./ProductImage";

interface ProductFormProps {
  product: Nullable<Product>
  onCancel: () => void;
  onSave: (product: Product) => void;
}

const emptyProduct: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  category: 'Electronics',
  stock: 0,
  imageUrl: ''
};

export default function ProductForm({ product, onCancel, onSave }: ProductFormProps) {
  const [productForm, setProductForm] = useState<Product>(product ?? emptyProduct);

  useEffect(() => {
    setProductForm(product ?? emptyProduct);
  }, [product]);

  const handleOnSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(productForm);
  }

  return (
    <form onSubmit={handleOnSave}>
      <TextInput id="name" label="Name" value={productForm.name} onChange={(value) => setProductForm(prev => ({ ...prev, name: value }))} required />
      <TextInput id="description" label="Description" value={productForm.description} onChange={(value) => setProductForm(prev => ({ ...prev, description: value }))} required />
      <TextInput id="imageUrl" label="Image URL" value={productForm.imageUrl} onChange={(value) => setProductForm(prev => ({ ...prev, imageUrl: value }))} required />
      {
        productForm.imageUrl && (
          <ProductImage src={productForm.imageUrl} alt={productForm.name} />
        )
      }
      <NumberInput id="price" label="Price" value={productForm.price} onChange={(value) => setProductForm(prev => ({ ...prev, price: value ?? 0 }))} required />
      <SelectInput
        id="category"
        label="Category"
        options={categoryOptions}
        value={productForm.category}
        onChange={(value) => setProductForm(prev => ({ ...prev, category: value ?? defaultCategory }))}
        required
      />
      <NumberInput id="stock" label="Stock" value={productForm.stock} onChange={(value) => setProductForm(prev => ({ ...prev, stock: value ?? 0 }))} />
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};
