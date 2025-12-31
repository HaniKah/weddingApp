import {AuthError} from "expo-auth-session";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import {useApi} from "@/utils/api";
import {useAuthStore} from "@/utils/authStore";


// export type AuthUser = {
//     id: string;
//     email: string;
//     name: string;
//     picture?: string;
//     given_name?: string;
//     family_name?: string;
//     email_verified?: boolean;
//     provider?: string;
//     exp?: number;
//     cookieExpiration?: number; // Added for web cookie expiration tracking
// };

// export type AuthUser = {
//     firstName: string,
//     lastName: string,
//     email: string,
// }

const AuthContext = React.createContext({
    // user: null as AuthUser | null,
    signInWithGoogle: () => {
    },
    signOut: () => {
    },
    isLoading: false,
    error: null as AuthError | null,
})


export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    // const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);
    const API = useApi()
    // we are not using useAuthRequest because we are implementing oAuth2.0 with passport in the backend
    // const [request, response, promptAsync] = useAuthRequest(config, discovery)

    const {logIn, logOut} = useAuthStore()

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

    const signOut = async () => {
        try {
            await API.authControllerSignOut()
            logOut()
        } catch (error) {
            console.error(error)
        }

    }

    const exchangeWithToken = async (code: string) => {
        const response = await API.authControllerExchangeToken({
            headers: {
                Authorization: `Bearer ${code}`,
            }
        })
        logIn(response.data.accessToken, response.data.refreshToken, response.data.user.firstName, response.data.user.lastName, response.data.user.email)

    }

    return (
        <AuthContext.Provider value={{

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