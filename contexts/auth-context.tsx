import {AuthError} from "expo-auth-session";
import React from "react";
import {useAuthStore} from "@/utils/authStore";
import * as WebBrowser from "expo-web-browser";
import {API} from "@/utils/api";


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

// const config: AuthRequestConfig = {
//     clientId: "google",
//     scopes: ["openid", "profile", "email"],
//     redirectUri: makeRedirectUri(),
//     state: "mobile"
//
//
// }
//
// let discovery: DiscoveryDocument = {
//     authorizationEndpoint: process.env.EXPO_PUBLIC_API_URL + "/api/auth/google/login",
//     tokenEndpoint: process.env.EXPO_PUBLIC_API_URL + "/api/auth/token"
// };


export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);
    const auth = useAuth()
    // this is the function that will call the backend
    // const [request, response, promptAsync] = useAuthRequest(config, discovery)

    const {logIn} = useAuthStore()


    // const exchangeCode = async (code: string) => {
    //
    // }


    // useEffect(() => {
    //     const handleResponse = async () => {
    //         if (response?.type === "success") {

    //         } else if (response?.type === "error") {
    //             setError(response.error as AuthError)
    //
    //         }
    //     }
    //     handleResponse()
    // }, [response]);


    // const signInWithGoogle = async () => {
    //     try {
    //         if (!request) {
    //
    //             return;
    //         }
    //         await promptAsync();
    //     } catch (error) {
    //         console.error(error);
    //         setError(error as AuthError);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

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
    }

    const exchangeWithToken = async (code: string) => {
        const response = await API.authControllerExchangeToken({
            headers: {
                Authorization: `Bearer ${code}`,
            },
        })
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