import type { OptionModel } from "../models";

interface ToggleProps<T extends string = string> {
  value: T;
  options: OptionModel<T>[];
  onChange: (value: T) => void;
}

export default function Toggle<T extends string = string>({ value, options, onChange }: ToggleProps<T>) {
  return (
    <div>
      {
        options.map(option => (
          <label key={option.key}>
            <input
              type="radio"
              checked={value === option.key}
              onChange={() => onChange(option.key)}
            />
            {option.label}
          </label>
        ))
      }
    </div>
  );
};
