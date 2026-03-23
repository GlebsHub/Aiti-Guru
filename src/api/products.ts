import type { Product } from "../types";

export async function fetchProductsList(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) throw new Error("Не удалось загрузить товары");
  const data = await response.json();
  return data.products as Product[];
}

export async function searchProductsApi(query: string): Promise<Product[]> {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
  );
  if (!response.ok) throw new Error("Ошибка поиска");
  const data = await response.json();
  return data.products as Product[];
}
