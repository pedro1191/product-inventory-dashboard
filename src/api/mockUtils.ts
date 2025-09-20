import type { Product } from "../models";

interface ErrorResponse {
  error: string;
}

// Utility to generate unique IDs for products
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11);
};

// Utility to simulate random failures (10% chance)
export const shouldFail = (): boolean => {
  return Math.random() < 0.1;
};

// Utility to get random error response
export const getRandomError = (): [number, ErrorResponse] => {
  const errors = [
    { status: 500, error: 'Internal server error' },
    { status: 503, error: 'Service temporarily unavailable' },
    { status: 408, error: 'Request timeout' },
    { status: 502, error: 'Bad gateway' }
  ];

  const randomError = errors[Math.floor(Math.random() * errors.length)];
  return [randomError.status, { error: randomError.error }];
};

// Utility to manage localStorage for products
const storageProductsKey = 'products';

export const getDataFromStorage = (): Product[] => {
  const data = localStorage.getItem(storageProductsKey);
  return data ? JSON.parse(data) : [];
};

export const saveDataToStorage = (data: Product[]) => {
  localStorage.setItem(storageProductsKey, JSON.stringify(data));
};
