import type { Nullable, OptionModel } from "../models";

interface SelectInputProps<TValue extends string = string, TId extends string = string> {
  id: TId;
  label: string;
  value: Nullable<TValue>;
  options: OptionModel<TValue>[];
  onChange: (id: TId, value: Nullable<TValue>) => void;
  required?: boolean;
}

export default function SelectInput<TValue extends string = string, TId extends string = string>({ id, label, value, options, onChange, required }: SelectInputProps<TValue, TId>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(id, selectedValue ? (selectedValue as TValue) : null);
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value ?? ''} onChange={handleChange} required={required}>
        <option value="">Select an item</option>
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
