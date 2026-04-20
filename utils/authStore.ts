import {createJSONStorage, persist} from 'zustand/middleware';
import {deleteItemAsync, getItem, setItem} from 'expo-secure-store';
import {create} from 'zustand';
import {UserType} from '@/types/user-type';

type UserInfo = {
    firstName: string | null
    lastName: string | null
    email: string | null

}

type userState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    hasCompletedOnboarding: boolean;
    logIn: (accessToken: string, refreshToken: string, firstName: string, lastName: string, email: string) => void;
    logOut: () => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
    userType: UserType
    switchRole: (role: UserType) => void
    user: UserInfo
}

export const useAuthStore = create(persist<userState>((set) => ({
    isLoggedIn: false,
    shouldCreateAccount: false,
    hasCompletedOnboarding: false,
    userType: UserType.User,
    user: {
        firstName: null,
        lastName: null,
        email: null,
    },

    logIn: (accessToken: string, refreshToken: string, firstName: string, lastName: string, email: string) => set((state) => {
        setItem('accessToken', accessToken);
        setItem('refreshToken', refreshToken);
        setItem('firstName', firstName);
        setItem('lastName', lastName);
        setItem('email', email);
        return {
            ...state,
            isLoggedIn: true,
            user: {
                firstName, lastName, email,
            },
        };
    }),
    logOut: () => set((state) => {
        deleteItemAsync('accessToken');
        deleteItemAsync('refreshToken');
        deleteItemAsync('firstName');
        deleteItemAsync('lastName');
        deleteItemAsync('email');
        return {
            ...state,
            isLoggedIn: false,
        };
    }),
    completeOnboarding: () => set((state) => {
        return {
            ...state,
            hasCompletedOnboarding: true,
        };
    }),
    resetOnboarding: () => set((state) => {
        return {
            ...state,
            hasCompletedOnboarding: false,
        };
    }),
    switchRole: (userType: UserType) => set((state) => {
        return {
            ...state,
            userType: userType,
        };
    }),

}), {
    'name': 'auth-storage',
    storage: createJSONStorage(() => ({
        setItem, getItem, removeItem: deleteItemAsync,
    })),
}));