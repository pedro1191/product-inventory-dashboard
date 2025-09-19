export type Nullable<T> = T | null;

export interface OptionModel<T = string> {
  key: T;
  label: string;
}

export interface PriceRange {
  min: Nullable<number>;
  max: Nullable<number>;
}
