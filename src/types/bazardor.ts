export interface MarketPrice {
  bazar?: string;
  market?: string;
  marketName?: string;
  name?: string;
  price?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
  averagePrice?: number | string;
}

export interface Category {
  id?: string | number;
  slug: string;
  nameBn?: string;
  name?: string;
  title?: string;
  icon?: string;
  emoji?: string;
}

export interface Product {
  id: string | number;
  slug?: string;
  nameBn?: string;
  name?: string;
  title?: string;
  description?: string;
  category?: string | Category;
  categoryId?: string;
  categorySlug?: string;
  unit?: string;
  price: number | string;
  previousPrice?: number | string;
  priceChange?: number | string;
  changePercentage?: number | string;
  priceChangePercent?: number | string;
  image?: string;
  imageUrl?: string;
  emoji?: string;
  prices?: MarketPrice[];
  marketPrices?: MarketPrice[];
  markets?: MarketPrice[];
}

export type SortOption = "default" | "asc" | "desc";