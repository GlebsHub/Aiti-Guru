import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../queryKeys";
import type { Product } from "../types";
import { useProductSearchStore } from "../store/useProductSearchStore";

export function useAddProductToCache() {
  const qc = useQueryClient();
  const searchValue = useProductSearchStore((s) => s.searchValue);

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: Date.now(),
      ...productData,
    };
    qc.setQueryData(queryKeys.products.list, (old: Product[] | undefined) =>
      old ? [newProduct, ...old] : [newProduct],
    );
    const q = searchValue.trim();
    if (q) {
      void qc.invalidateQueries({ queryKey: queryKeys.products.search(q) });
    }
  };

  return { addProduct };
}
