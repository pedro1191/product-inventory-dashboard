import type { OptionModel } from "../models";

interface ToggleProps<T extends string = string> {
  value: T;
  options: OptionModel<T>[];
  onChange: (value: T) => void;
}

export default function Toggle<T extends string = string>({ value, options, onChange }: ToggleProps<T>) {
  return (
    <div className="flex flex-row flex-wrap gap-4 items-center">
      {
        options.map(option => (
          <label key={option.key} className="flex flex-row gap-2 text-lg font-normal">
            <input
              className="w-6 h-6"
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
