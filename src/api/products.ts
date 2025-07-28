import { ProductApiResponse } from '../types/product';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

export async function fetchProducts(): Promise<ProductApiResponse> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  
  return res.json();
} 