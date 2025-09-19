export type Nullable<T> = T | null;

export interface OptionModel<T = string> {
  key: T;
  label: string;
}

export interface PriceFormatterOptions {
  currency?: string;
  decimals?: number;
}
