import {createJSONStorage, persist} from 'zustand/middleware';
import {deleteItemAsync, getItemAsync, setItemAsync} from 'expo-secure-store';
import {create} from 'zustand';
import axios from 'axios';
import {Platform} from 'react-native';
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
        return async (rehydratedState, error) => {
            if (error) {
                console.error('Failed to rehydrate auth store:', error);
            }

            const refreshToken = rehydratedState?.refreshToken;
            if (!refreshToken) {
                useAuthStore.setState({isLoggedIn: false, hasHydrated: true});
                return;
            }

            // A persisted refresh token only proves a session existed on this
            // device, not that it's still valid server-side (it may have been
            // revoked, expired, or rotated elsewhere). Confirm it against the
            // backend before optimistically rendering any authenticated screen -
            // otherwise a dead token flips `isLoggedIn` true until some unrelated
            // API call happens to 401 later.
            try {
                const baseURL = process.env.NODE_ENV === 'development' && Platform.OS === 'android'
                    ? process.env.EXPO_PUBLIC_API_URL_ANDROID
                    : process.env.EXPO_PUBLIC_API_URL;
                const res = await axios.post(`${baseURL}/api/auth/refresh`, null, {
                    headers: {Authorization: `Bearer ${refreshToken}`},
                });
                useAuthStore.setState({
                    isLoggedIn: true,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    hasHydrated: true,
                });
            } catch {
                useAuthStore.setState({
                    isLoggedIn: false,
                    accessToken: null,
                    refreshToken: null,
                    hasHydrated: true,
                });
            }
        };
    },

    partialize: (state): PersistedAuthState => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
    }),
}));