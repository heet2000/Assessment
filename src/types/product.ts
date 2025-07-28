export interface Product {
  id: string | number;
  title: string;
  userName: string;
  photoUrl: string;
  pricingOption: 'Paid' | 'Free' | 'View Only';
  price?: number;
}

export interface ProductApiResponse {
  data: Product[];
  total: number;
  searchAfter: any[];
} 