import { useCallback, useEffect, useState } from "react";
import type { Nullable, Product, ProductForm } from "../models";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { categoryOptions, emptyProductForm } from "../constants";
import ProductImage from "./ProductImage";
import { useProductSelectionDispatchContext } from "../contexts";
import Button from "./Button";

interface ProductFormProps {
  product: Nullable<Product>
  onSave?: (product: Product) => void;
}

export default function ProductForm({ product, onSave }: ProductFormProps) {
  const [productForm, setProductForm] = useState<ProductForm>(product ?? emptyProductForm);
  const dispatch = useProductSelectionDispatchContext();

  useEffect(() => {
    setProductForm(product ?? emptyProductForm);
  }, [product]);

  const handleFieldChange = useCallback(<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K]
  ) => {
    setProductForm(prevState => ({ ...prevState, [field]: value }));
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'closed_product_modal' });
  }, [dispatch])

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave?.(productForm as Product);
  }

  return (
    <form onSubmit={handleSave}>
      <TextInput
        id="name"
        label="Name"
        value={productForm.name}
        onChange={handleFieldChange}
        required
      />
      <TextInput
        id="description"
        label="Description"
        value={productForm.description}
        onChange={handleFieldChange}
        required
      />
      <TextInput
        id="imageUrl"
        label="Image URL"
        value={productForm.imageUrl}
        onChange={handleFieldChange}
        required
      />
      {
        productForm.imageUrl && (
          <ProductImage src={productForm.imageUrl} alt={productForm.name} />
        )
      }
      <NumberInput
        id="price"
        label="Price"
        value={productForm.price}
        onChange={handleFieldChange}
        required
      />
      <SelectInput
        id="category"
        label="Category"
        options={categoryOptions}
        value={productForm.category}
        onChange={handleFieldChange}
        required
      />
      <NumberInput
        id="stock"
        label="Stock"
        value={productForm.stock}
        onChange={handleFieldChange}
      />
      <Button type="button" label="Cancel" onClick={handleCancel} />
      <Button type="submit" label="Save" />
    </form>
  );
};
