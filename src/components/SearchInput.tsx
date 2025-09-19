interface SearchInputProps<T extends string = string> {
  id: T;
  placeholder?: string;
  value: string;
  onChange: (id: T, value: string) => void;
}

export default function SearchInput<T extends string = string>({ id, placeholder, value, onChange }: SearchInputProps<T>) {
  return (
    <div>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(id, e.target.value)}
      />
    </div>
  );
}
