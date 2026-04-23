import {AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import React, {useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import {useApi} from '@/utils/api';
import {useAuthStore} from '@/utils/authStore';
import {ErrorsDto, SignInDto, SignUpDto} from '@/types/open-api';
import {AxiosError} from "axios";

interface AuthContextType {
    signInWithGoogle: () => void,
    signInWithEmail: (data: SignInDto) => void,
    signUpWithEmail: (data: SignUpDto) => void,
    signOut: () => void,
    isLoading: boolean,
    error: ErrorsDto
}

const AuthContext = React.createContext<AuthContextType>({
    // user: null as AuthUser | null,
    signInWithGoogle: () => {
    },
    signInWithEmail: () => {
    },
    signUpWithEmail: () => {
    },
    signOut: () => {
    },
    isLoading: false,
    error: null as ErrorsDto | null,
});


export const AuthProvider = ({children}: { children: React.ReactNode }) => {

    // this is just for performance
    useEffect(() => {
        WebBrowser.warmUpAsync();

        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    const API = useApi();

    const discovery: DiscoveryDocument = {
        authorizationEndpoint: `${API.instance.getUri()}/api/auth/google/login`,
        // tokenEndpoint: `${process.env.EXPO_PUBLIC_API_URL}/api/auth/google/token`,

    };
    const config: AuthRequestConfig = {
        clientId: 'google',
        redirectUri: makeRedirectUri(),
        // scopes: ["openid", "profile", "email"], //defined in the backend
    };

    // const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AxiosError | null>(null);
    const [request, response, promptAsync] = useAuthRequest(config, discovery);

    // we are not using useAuthRequest because we are implementing oAuth2.0 with passport in the backend
    // const [request, response, promptAsync] = useAuthRequest(config, discovery)

    const {logIn, logOut, isLoggedIn} = useAuthStore();


    WebBrowser.maybeCompleteAuthSession();

    const signInWithEmail = async (data: SignInDto) => {
        try {
            setIsLoading(true);
            await API.api.authControllerSignIn({email: data.email, password: data.password});
        } catch (err: any) {
            console.log("this is the Error: ", error?.response?.data?.message)
            setError(err)

        } finally {
            setIsLoading(false);
        }
    };

    const signUpWithEmail = async (signUpData: SignUpDto) => {
        try {
            setIsLoading(true);
            const res = await API.api.authControllerSignUp(signUpData);
            logIn(res.data.accessToken, res.data.refreshToken, res.data.user.firstName, res.data.user.lastName, res.data.user.email);

        } catch (err: ErrorsDto) {
            setError(err)
        } finally {
            setIsLoading(false);
        }
    };


    const signInWithGoogle = async () => {
        try {
            if (!request) {
                console.log('No request fon google sign in');
                return;
            }
            await promptAsync();
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        const exchangeToken = async () => {
            if (response?.type === 'success') {
                await exchangeWithToken(response.params.exchangeToken);
            }
        };
        exchangeToken();
    }, [response]);

    const signOut = async () => {
        try {
            await API.api.authControllerSignOut();
            logOut();
        } catch (error) {
            console.error(error);
        }

    };

    const exchangeWithToken = async (code: string) => {
        const response = await API.api.authControllerExchangeToken({
            headers: {
                Authorization: `Bearer ${code}`,
            },
        });
        logIn(response.data.accessToken, response.data.refreshToken, response.data.user.firstName, response.data.user.lastName, response.data.user.email);

    };

    return (
        <AuthContext.Provider value={{

            signInWithGoogle,
            signInWithEmail,
            signUpWithEmail,
            signOut,
            isLoading,
            error,

        }}>
            {children}
        </AuthContext.Provider>

    );
};


export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};