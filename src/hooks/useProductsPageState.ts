import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProductsList, searchProductsApi } from "../api/products";
import { queryKeys } from "../queryKeys";
import { useProductSearchStore } from "../store/useProductSearchStore";

export function useProductsListQuery() {
  return useQuery({
    queryKey: queryKeys.products.list,
    queryFn: fetchProductsList,
  });
}

export function useSearchProductsQuery(searchValue: string) {
  const q = searchValue.trim();
  return useQuery({
    queryKey: queryKeys.products.search(q),
    queryFn: () => searchProductsApi(q),
    enabled: q.length > 0,
  });
}

export function useProductsPageState() {
  const searchValue = useProductSearchStore((s) => s.searchValue);
  const listQuery = useProductsListQuery();
  const searchQuery = useSearchProductsQuery(searchValue);
  const trimmed = searchValue.trim();
  const isSearch = trimmed.length > 0;

  const loading = isSearch ? searchQuery.isPending : listQuery.isPending;
  const err = isSearch ? searchQuery.error : listQuery.error;
  const errorMessage =
    err instanceof Error ? err.message : err ? String(err) : null;

  const qc = useQueryClient();
  const refetch = () => {
    void qc.invalidateQueries({ queryKey: queryKeys.products.list });
    if (trimmed) {
      void qc.invalidateQueries({
        queryKey: queryKeys.products.search(trimmed),
      });
    }
  };

  const displayed = isSearch
    ? (searchQuery.data ?? [])
    : (listQuery.data ?? []);

  return {
    searchValue,
    displayed,
    loading,
    error: errorMessage,
    refetch,
  };
}

export function useInvalidateProducts() {
  const qc = useQueryClient();
  const searchValue = useProductSearchStore((s) => s.searchValue);

  return () => {
    void qc.invalidateQueries({ queryKey: queryKeys.products.list });
    const q = searchValue.trim();
    if (q) {
      void qc.invalidateQueries({ queryKey: queryKeys.products.search(q) });
    }
  };
}
