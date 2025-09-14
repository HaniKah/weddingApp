import {createJSONStorage, persist} from "zustand/middleware";
import {deleteItemAsync, getItem, setItem} from "expo-secure-store";
import {create} from "zustand";

type userState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    logIn: () => void;
    logOut: () => void;

}

export const useAuthStore = create(persist<userState>((set) => ({
    isLoggedIn: false,
    shouldCreateAccount: false,
    logIn: () => set((state) => {
        return {
            ...state,
            isLoggedIn: true,
        }
    }),
    logOut: () => set((state) => {
        return {
            ...state,
            isLoggedIn: false,
        }
    }),

}), {
    "name": "auth-storage",
    storage: createJSONStorage(() => ({
        setItem, getItem, removeItem: deleteItemAsync
    }))
}))