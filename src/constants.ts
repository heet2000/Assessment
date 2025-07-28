// App-wide constants for categories, pricing, sort options, and value enums

export const CATEGORY_TABS = [
  { label: 'All', value: 'all' },
];

export const CATEGORY_ALL = 'all';

export const PRICING_PAID = 'Paid';
export const PRICING_FREE = 'Free';
export const PRICING_VIEW_ONLY = 'View Only';
export const PRICING_OPTIONS = [
  { label: PRICING_PAID, value: PRICING_PAID },
  { label: PRICING_FREE, value: PRICING_FREE },
  { label: PRICING_VIEW_ONLY, value: PRICING_VIEW_ONLY },
];

export const SORT_FEATURED = 'featured';
export const SORT_NEWEST = 'newest';
export const SORT_HIGH = 'high';
export const SORT_LOW = 'low';
export const SORT_OPTIONS = [
  { label: 'Featured', value: SORT_FEATURED },
  { label: 'Newest', value: SORT_NEWEST },
  { label: 'Higher Price', value: SORT_HIGH },
  { label: 'Lower Price', value: SORT_LOW },
]; 

export const PAGE_SIZE = 20;