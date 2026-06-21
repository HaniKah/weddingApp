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
    accessToken: string | null;
    refreshToken: string | null;
    userType: UserType;
    user: UserInfo;
    setHasHydrated: (value: boolean) => void;
    logIn: (accessToken: string, refreshToken: string, firstName?: string, lastName?: string, email?: string, userType?: UserType) => Promise<void>;
    logOut: () => Promise<void>;
    updateUser: (updates: Partial<UserInfo>) => void;
}

// Only the tokens are persisted to secure storage. Keeping this type narrow
// guarantees that no other state (names, email, flags) can leak into the
// Keychain/Keystore blob, and keeps the value well under SecureStore's 2KB limit.
type PersistedAuthState = Pick<userState, 'accessToken' | 'refreshToken'>;

export const useAuthStore = create(persist<userState, [], [], PersistedAuthState>((set) => ({
    isLoggedIn: false,
    hasHydrated: false,
    accessToken: null,
    refreshToken: null,
    userType: UserType.User,
    user: {
        firstName: null,
        lastName: null,
        email: null,
    },

    setHasHydrated: (value: boolean) => set({hasHydrated: value}),

    logIn: async (accessToken: string, refreshToken: string, firstName?: string, lastName?: string, email?: string, userType?: UserType) => {
        set({
            isLoggedIn: true,
            accessToken,
            refreshToken,
            userType: userType ?? UserType.User,
            user: {
                firstName: firstName ?? null,
                lastName: lastName ?? null,
                email: email ?? null,
            },
        });
    },

    logOut: async () => {
        set({
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
            user: {
                firstName: null,
                lastName: null,
                email: null,
            },
        });
    },

    updateUser: (updates: Partial<UserInfo>) => {
        set((state) => ({
            user: {...state.user, ...updates}
        }));
    },
} satisfies userState), {
    name: 'auth-storage',
    storage: createJSONStorage(() => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
    })),

    onRehydrateStorage: () => {
        return (rehydratedState, error) => {
            if (error) {
                console.error('Failed to rehydrate auth store:', error);
            }
            // Only the tokens are persisted, so `isLoggedIn` must be derived from
            // the rehydrated token rather than read from storage. The token is the
            // source of truth; the boolean is computed state.
            useAuthStore.setState({
                isLoggedIn: !!rehydratedState?.accessToken,
                hasHydrated: true,
            });
        };
    },

    partialize: (state): PersistedAuthState => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
    }),
}));