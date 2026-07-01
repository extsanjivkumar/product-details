import { productInfo, inventory, availability, network } from './mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockFetch = async (data) => {
  await delay(800);
  // throw new Error('Failed to fetch data');
  return data;
};

export const fetchProductInfo = () => mockFetch(productInfo);
export const fetchInventory = () => mockFetch(inventory);
export const fetchAvailability = () => mockFetch(availability);
export const fetchNetwork = () => mockFetch(network);
