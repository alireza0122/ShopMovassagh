// store/useUserStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set) => ({
            userName: "",
            number: "",
            biography: "",
            activity: "",
            favorites: "",
            urlImg: "",
            isLoggedIn: false,

            login: (userData) => set({ ...userData, isLoggedIn: true }),
            logout: () =>
                set({
                    userName: "",
                    number: "",
                    biography: "",
                    activity: "",
                    favorites: "",
                    urlImg: "",
                    isLoggedIn: false,
                }),
        }),
        { name: "user-storage" }
    )
);


export const useSimpleStore = create(
    persist(
        (set) => ({
            cart: [],

            setCount: (product) =>
                set((state) => {
                    const existingProduct = state.cart.find((item) => item.id === product.id);

                    if (existingProduct) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id ? {...item, qty: item.qty + 1} : item
                            )
                        };
                    } else {
                        return {
                            cart: [...state.cart, {...product, qty: 1}]
                        };
                    }
                }),
            decreaseCount: (productId) =>
                set((state) => ({
                    cart: state.cart.map(item =>
                        item.id === productId
                            ? {...item, qty: item.qty > 1 ? item.qty - 1 : 1}
                            : item
                    )
                })),

            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter(item => item.id !== productId)
                })),
        }),
        {
            name: 'shopping-cart-storage',
        }
    )
);
