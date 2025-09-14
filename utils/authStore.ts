import {createJSONStorage, persist} from "zustand/middleware";
import {deleteItemAsync, getItem, setItem} from "expo-secure-store";
import {create} from "zustand";

type userState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    hasCompletedOnboarding: boolean;
    logIn: () => void;
    logOut: () => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
}

export const useAuthStore = create(persist<userState>((set) => ({
    isLoggedIn: false,
    shouldCreateAccount: false,
    hasCompletedOnboarding: false,

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
    completeOnboarding: () => set((state) => {
        return {
            ...state,
            hasCompletedOnboarding: true,
        }
    }),
    resetOnboarding: () => set((state) => {
        return {
            ...state,
            hasCompletedOnboarding: false,
        }
    }),

}), {
    "name": "auth-storage",
    storage: createJSONStorage(() => ({
        setItem, getItem, removeItem: deleteItemAsync
    }))
}))