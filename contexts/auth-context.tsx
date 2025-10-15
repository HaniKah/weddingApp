import {AuthError, AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest} from "expo-auth-session";
import React, {useEffect} from "react";
import * as WebBrowser from 'expo-web-browser';


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
    fetchWithAuth: async (url: string, options: RequestInit) =>
        Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
})

const config: AuthRequestConfig = {
    clientId: "google",
    scopes: ["openid", "profile", "email"],
    redirectUri: makeRedirectUri(),
    state: "mobile"

}

const discovery: DiscoveryDocument = {
    authorizationEndpoint: process.env.EXPO_PUBLIC_API_URL + "/api/auth/google/login",
    tokenEndpoint: process.env.EXPO_PUBLIC_API_URL + "/api/auth/token"
}

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);

    // this is the function that will call the backend for us
    const [request, response, promptAsync] = useAuthRequest(config, discovery)

    useEffect(() => {
        handleResponse()
    }, [response]);

    const handleResponse = async () => {
        if (response?.type === "success") {
            const {code} = response.params
            console.log(code)
        } else if (response?.type === "error") {
            setError(response.error as AuthError)
        }
    }

    const signInWithGoogle = async () => {

        await WebBrowser.openBrowserAsync(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/google/login`);

    }
    const signOut = () => {
    }

    const fetchWithAuth = async (url: string, options: RequestInit) => {
        return Promise.resolve(new Response())
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOut,
            fetchWithAuth,
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