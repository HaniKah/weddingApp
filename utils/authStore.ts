import {createJSONStorage, persist} from 'zustand/middleware';
import {deleteItemAsync, getItemAsync, setItemAsync} from 'expo-secure-store';
import {create} from 'zustand';
import {UserType} from '@/types/user-type';

type UserInfo = {
    firstName: string | null
    lastName: string | null
    email: string | null
}

type userState = {
    isLoggedIn: boolean;
    hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
    logIn: (accessToken: string, refreshToken: string, firstName?: string, lastName?: string, email?: string) => Promise<void>;
    logOut: () => Promise<void>;
    userType: UserType
    user: UserInfo
}

export const useAuthStore = create(persist<userState>((set) => ({
    isLoggedIn: false,
    hasHydrated: false,
    setHasHydrated: (value: boolean) => set({hasHydrated: value}),
    userType: UserType.User,
    user: {
        firstName: null,
        lastName: null,
        email: null,
    },

    logIn: async (accessToken: string, refreshToken: string, firstName?: string, lastName?: string, email?: string) => {
        await setItemAsync('accessToken', accessToken);
        await setItemAsync('refreshToken', refreshToken);

        if (firstName) {
            await setItemAsync('firstName', firstName);
        }

        if (lastName) {
            await setItemAsync('lastName', lastName);
        }

        if (email) {
            await setItemAsync('email', email);
        }

        set((state) => ({
            ...state,
            isLoggedIn: true,
            user: {
                firstName: firstName ?? null,
                lastName: lastName ?? null,
                email: email ?? null,
            },
        }));
    },

    logOut: async () => {
        await deleteItemAsync('accessToken');
        await deleteItemAsync('refreshToken');
        await deleteItemAsync('firstName');
        await deleteItemAsync('lastName');
        await deleteItemAsync('email');

        set((state) => ({
            ...state,
            isLoggedIn: false,
            user: {
                firstName: null,
                lastName: null,
                email: null,
            },
        }));
    },
}), {
    name: 'auth-storage',
    storage: createJSONStorage(() => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
    })),
    onRehydrateStorage: () => () => {
        // Mark hydration complete regardless of success/error so the UI never
        // hangs waiting on a persisted value that will never arrive.
        useAuthStore.getState().setHasHydrated(true);
    },
}));