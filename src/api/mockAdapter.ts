import MockAdapter from 'axios-mock-adapter';
import apiClient from './client';
import { generateId, getDataFromStorage, getRandomError, saveDataToStorage, shouldFail } from './mockUtils';
import type { Product } from '../models';

const mock = new MockAdapter(apiClient, { delayResponse: 500 });

export const setupMocks = () => {
  const products: Product[] = getDataFromStorage();

  mock.onGet('/products').reply(() => {
    if (shouldFail()) {
      console.log('Mock: Simulating fetch failure');
      return getRandomError();
    }

    console.log('Mock: Fetching products');

    return [200, products];
  });

  mock.onPost('/products').reply((config) => {
    if (shouldFail()) {
      console.log('Mock: Simulating create failure');
      return getRandomError();
    }

    console.log('Mock: Adding product');
    const newProduct: Product = JSON.parse(config.data);
    newProduct.id = generateId();
    products.push(newProduct);
    saveDataToStorage(products);

    return [201, newProduct];
  });

  mock.onPut(/\/products\/\w+/).reply((config) => {
    if (shouldFail()) {
      console.log('Mock: Simulating update failure');
      return getRandomError();
    }

    const id = config.url?.split('/').pop();
    console.log(`Mock: Updating product ${id}`);
    const updatedProduct: Product = JSON.parse(config.data);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return [404, { error: 'Product not found' }];
    }
    products[index] = { ...updatedProduct, id: id! };
    saveDataToStorage(products);

    return [200, products[index]];
  });

  mock.onDelete(/\/products\/\w+/).reply((config) => {
    if (shouldFail()) {
      console.log('Mock: Simulating delete failure');
      return getRandomError();
    }

    const id = config.url?.split('/').pop();
    console.log(`Mock: Deleting product ${id}`);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return [404, { error: 'Product not found' }];
    }
    products.splice(index, 1);
    saveDataToStorage(products);

    return [204];
  });

  console.log('Mock adapter setup complete');
};

export const disableMocks = () => {
  mock.restore();
  console.log('Mock adapter disabled');
};

export default mock;
