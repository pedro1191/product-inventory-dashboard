import type { Nullable } from "../models";

interface NumberInputProps<T extends string = string> {
  id: T;
  label: string;
  placeholder?: string;
  value: Nullable<number>;
  onChange: (id: T, value: Nullable<number>) => void;
  required?: boolean;
}

export default function NumberInput<T extends string = string>({ id, label, placeholder, value, onChange, required }: NumberInputProps<T>) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange(id, e.target.value ? Number(e.target.value) : null)}
        required={required}
      />
    </div>
  );
}
