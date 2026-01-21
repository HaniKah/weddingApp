import {AuthError, AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest} from "expo-auth-session";
import React, {useEffect} from "react";
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

const config: AuthRequestConfig = {
    clientId: "google",
    redirectUri: makeRedirectUri(),
    // scopes: ["openid", "profile", "email"], //defined in the backend
};


const discovery: DiscoveryDocument = {
    authorizationEndpoint: `${process.env.EXPO_PUBLIC_API_URL}/api/auth/google/login`,
    // tokenEndpoint: `${process.env.EXPO_PUBLIC_API_URL}/api/auth/google/token`,

};


export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    // const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);
    const [request, response, promptAsync] = useAuthRequest(config, discovery);

    const API = useApi()
    // we are not using useAuthRequest because we are implementing oAuth2.0 with passport in the backend
    // const [request, response, promptAsync] = useAuthRequest(config, discovery)

    const {logIn, logOut} = useAuthStore()

    WebBrowser.maybeCompleteAuthSession(); // still not sure what this does


    const signInWithGoogle = async () => {
        console.log("sign in with google");
        try {
            if (!request) {
                console.log("No request fon google sign in");
                return;
            }
            await promptAsync();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const exchangeToken = async () => {

            if (response?.type === "success") {
                console.log("response", response)

                await exchangeWithToken(response.params.exchangeToken)
            }
        }
        exchangeToken()
    }, [response]);


    useEffect(() => {
        console.log("request", request)
    }, [request]);


    const signOut = async () => {
        try {
            await API.api.authControllerSignOut()
            logOut()
        } catch (error) {
            console.error(error)
        }

    }

    const exchangeWithToken = async (code: string) => {
        const response = await API.api.authControllerExchangeToken({
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