import { productInfo, inventory, availability, network } from './mockData';

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
});

const mockFetch = async (data) => {
  await delay(800);
  return data;
};

export const getDataPage = (data = [], page = 1, pageSize = 5) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: data.slice(startIndex, endIndex),
    total: data.length,
    current: page,
    pageSize,
    totalPages: Math.ceil(data.length / pageSize),
  };
};

export const fetchProductInfo = () => mockFetch(productInfo);
export const fetchInventory = (page, pageSize) => mockFetch(getDataPage(inventory, page, pageSize));
export const fetchAvailability = (page, pageSize) => mockFetch(getDataPage(availability, page, pageSize));
export const fetchNetwork = (page, pageSize) => mockFetch(getDataPage(network, page, pageSize));
