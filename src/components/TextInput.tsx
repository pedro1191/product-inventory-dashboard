interface TextInputProps<T extends string = string> {
  id: T;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (id: T, value: string) => void;
  required?: boolean;
}

export default function TextInput<T extends string = string>({ id, label, placeholder, value, onChange, required }: TextInputProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        required={required}
      />
    </div>
  );
}
