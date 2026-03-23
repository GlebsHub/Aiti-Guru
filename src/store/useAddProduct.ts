import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type useAddProductType = {
    isOpen: boolean;
    isAdded: boolean;
    toggle: () => void;
    add: () => void;
    close:() => void;
}

const useAddProduct = create<useAddProductType>()(
    immer(
        (set) => ({
        isOpen: false,
        isAdded: false,
        add: () => set((state) => {
            state.isAdded = true
        }),
        toggle: () => set((state) => {
            state.isOpen = !state.isOpen;
        }),
        close: () => set((state) => {state.isAdded = false})
    }))
);

export default useAddProduct;