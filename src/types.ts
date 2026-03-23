export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  stock: number
}

export type Order = "asc" | "desc";