export type Nullable<T> = T | null;

export interface OptionModel<T = string> {
  key: T;
  label: string;
}
