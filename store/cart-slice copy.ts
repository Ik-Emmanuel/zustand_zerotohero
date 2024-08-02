// will be used to store user information

import { CartProduct } from "@/types/cart";
import { Product } from "@/types/products";
import { StateCreator } from "zustand";

type Cart = {
    products: CartProduct[];
    totalPrice: number;
};

type CartActions = {
    addProduct: (product: Product) => void;
    removeProduct: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    getProductById: (productId: string) => CartProduct | undefined;
    setTotal: (total: number) => void;
    reset: () => void;
};
export type CartSlice = Cart & CartActions;

// initial state
const initialState: Cart = {
    products: [],
    totalPrice: 0,
};

export const createCartSlice: StateCreator<
    CartSlice,
    [["zustand/immer", never]],
    [],
    CartSlice
> = (set, get) => ({
    ...initialState,
    increaseQuantity: (productId) =>
        set((state) => {
            const product = state.products.find((p: Product) => p.id === productId);
            if (product) {
                product.quantity++;
                // state.totalPrice += product.price;
            }
        }),

    decreaseQuantity: (productId) =>
        set((state) => {
            const productIndex = state.products.findIndex(
                (p: Product) => p.id === productId
            );
            if (productIndex !== -1) {
                if (state.products[productIndex].quantity === 1) {
                    state.products.splice(productIndex, 1);
                } else {
                    state.products[productIndex].quantity--;
                }
            }
        }),

    addProduct: (product) =>
        set((state) => {
            state.products.push({ ...product, quantity: 1 });
        }),

    removeProduct: (productId) =>
        set((state) => {
            state.products = state.products.filter(
                (p: Product) => p.id !== productId
            );
        }),
    getProductById: (productId) =>
        get().products.find((p: Product) => p.id === productId),
    setTotal: (total) =>
        set((state) => {
            state.totalPrice = total;
        }),
    reset: () => set(initialState),
});
