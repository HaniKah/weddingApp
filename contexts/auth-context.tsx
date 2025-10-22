import {AuthError} from "expo-auth-session";
import React from "react";
import {useAuthStore} from "@/utils/authStore";
import * as WebBrowser from "expo-web-browser";
import {useApi} from "@/utils/api";


export type AuthUser = {
    id: string;
    email: string;
    name: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
    provider?: string;
    exp?: number;
    cookieExpiration?: number; // Added for web cookie expiration tracking
};

const AuthContext = React.createContext({
    user: null as AuthUser | null,
    signInWithGoogle: () => {
    },
    signOut: () => {
    },
    // fetchWithAuth: async (url: string, options: RequestInit) =>
    //     Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
})


export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);
    const auth = useAuth()
    const API = useApi()
    // this is the function that will call the backend
    // const [request, response, promptAsync] = useAuthRequest(config, discovery)

    const {logIn} = useAuthStore()

    WebBrowser.maybeCompleteAuthSession(); // still not sure what this does

    const signInWithGoogle = async () => {
        try {
            const response = await WebBrowser.openAuthSessionAsync(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/google/login`);
            if (response.type === "success") {
                const url = new URL(response.url);
                await exchangeWithToken(url.searchParams.get("exchangeToken")!)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const signOut = () => {
        // should call the sign out controller
    }

    const exchangeWithToken = async (code: string) => {
        const response = await API.authControllerExchangeToken({
            headers: {
                Authorization: `Bearer ${code}`,
            },
        })
        // const {accessToken, refreshToken} = response.data
        // console.log("access token :", accessToken)
        // console.log("refresh token :", refreshToken)
        logIn(response.data.accessToken, response.data.refreshToken)
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOut,
            isLoading,
            error

        }}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}