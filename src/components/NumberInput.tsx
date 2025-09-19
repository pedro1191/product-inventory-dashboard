import type { Nullable } from "../models";

interface NumberInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: Nullable<number>;
  onChange: (e: Nullable<number>) => void;
  required?: boolean;
}

export default function NumberInput({ id, label, placeholder, value, onChange, required }: NumberInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        required={required}
      />
    </div>
  );
}
