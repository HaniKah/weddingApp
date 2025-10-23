import {createJSONStorage, persist} from "zustand/middleware";
import {deleteItemAsync, getItem, setItem} from "expo-secure-store";
import {create} from "zustand";
import {Role} from "@/types/open-api";


type userState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    hasCompletedOnboarding: boolean;
    logIn: (accessToken: string, refreshToken: string) => void;
    logOut: () => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
    role: Role
    switchRole: (role: Role) => void
}

export const useAuthStore = create(persist<userState>((set) => ({
    isLoggedIn: false,
    shouldCreateAccount: false,
    hasCompletedOnboarding: false,
    role: Role.User,

    logIn: (accessToken: string, refreshToken: string) => set((state) => {
        setItem("accessToken", accessToken)
        setItem("refreshToken", refreshToken)
        return {
            ...state,
            isLoggedIn: true,
        }
    }),
    logOut: () => set((state) => {
        deleteItemAsync("accessToken")
        deleteItemAsync("refreshToken")
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
    switchRole: (role: Role) => set((state) => {
        return {
            ...state,
            role: role
        }
    })

}), {
    "name": "auth-storage",
    storage: createJSONStorage(() => ({
        setItem, getItem, removeItem: deleteItemAsync
    }))
}))