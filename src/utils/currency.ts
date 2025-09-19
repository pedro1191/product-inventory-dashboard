import { CURRENCY_DECIMAL_PLACES, CURRENCY_SYMBOL } from "../constants";
import type { PriceFormatterOptions } from "../models";

export function formatPrice(
  price: number,
  options: PriceFormatterOptions = {}
): string {
  const { currency = CURRENCY_SYMBOL, decimals = CURRENCY_DECIMAL_PLACES } = options;
  return `${currency}${price.toFixed(decimals)}`;
}
