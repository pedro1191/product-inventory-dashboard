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
  isLoading?: boolean;
  product: Nullable<Product>
  onSave: (product: Product) => void;
}

export default function ProductForm({ isLoading, product, onSave }: ProductFormProps) {
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
    onSave(productForm as Product);
  }

  return (
    <form className="flex flex-col gap-10 w-full max-w-lg min-w-xs" onSubmit={handleSave}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
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
        <div className="flex flex-col gap-2">
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
        </div>
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
      </div>
      <div className="flex flex-row gap-2">
        <Button className="primary-button-outline" disabled={isLoading} type="button" label="Cancel" onClick={handleCancel} />
        <Button className="primary-button" disabled={isLoading} type="submit" label={isLoading ? "Saving..." : "Save"} />
      </div>
    </form>
  );
};
