import { create } from "zustand";

interface ProductSearchState {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const useProductSearchStore = create<ProductSearchState>((set) => ({
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
}));
