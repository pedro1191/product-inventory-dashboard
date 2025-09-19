import type { Nullable, OptionModel } from "../models";

interface SelectInputProps<T extends string = string> {
  id: string;
  label: string;
  value: Nullable<T>;
  options: OptionModel<T>[];
  onChange: (value: Nullable<T>) => void;
  required?: boolean;
}

export default function SelectInput<T extends string = string>({ id, label, value, options, onChange, required }: SelectInputProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue ? (selectedValue as T) : null);
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select name={id} id={id} value={value ?? ''} onChange={handleChange} required={required}>
        <option value="">All</option>
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
