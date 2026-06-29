import {AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import React, {useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import {useApi} from '@/utils/api';
import {useAuthStore} from '@/utils/authStore';
import {SignInDto, SignUpDto, VerifyEmailDto} from '@/types/open-api';
import {showSnackbar} from "@/components/Snackbar";
import {AxiosError} from "axios";
import {router} from "expo-router";
import {Platform} from "react-native";

interface AuthContextType {
    signInWithApple: () => void,
    signInWithGoogle: () => void,
    signInWithEmail: (data: SignInDto) => void,
    signUpWithEmail: (data: SignUpDto) => void,
    verifyEmail: (data: VerifyEmailDto) => void,
    resendVerification: (email: string) => void,
    clearPendingVerification: () => void,
    pendingVerificationEmail: string | null,
    signOut: () => void,
    deleteUser: () => void,
    isLoading: boolean,
    errorMessage: string | null
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContext = React.createContext<AuthContextType>({
    // user: null as AuthUser | null,
    signInWithApple: () => {
    },
    signInWithGoogle: () => {
    },
    signInWithEmail: () => {
    },
    signUpWithEmail: () => {
    },
    verifyEmail: () => {
    },
    resendVerification: () => {
    },
    clearPendingVerification: () => {
    },
    pendingVerificationEmail: null,
    signOut: () => {
    },
    deleteUser: () => {

    },
    setErrorMessage: () => {
    },
    isLoading: false,
    errorMessage: null,
});


export const AuthProvider = ({children}: { children: React.ReactNode }) => {

    // this is just for performance
    useEffect(() => {
        WebBrowser.maybeCompleteAuthSession();

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
        redirectUri: makeRedirectUri({
            path: "complete-oauth"
        }),
        scopes: ["openid", "name", "email"], //defined in the backend
    };

    const discoveryIOS: DiscoveryDocument = {
        authorizationEndpoint: `${API.instance.getUri()}/api/auth/apple/login`,

    };
    const configIOS: AuthRequestConfig = {
        clientId: 'apple',
        redirectUri: makeRedirectUri({
            path: "complete-oauth"
        }),
        scopes: ["openid", "name", "email"], //defined in the backend

    };

    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const [pendingVerificationEmail, setPendingVerificationEmail] = React.useState<string | null>(null);
    const [request, response, promptAsync] = useAuthRequest(config, discovery);
    const [requestIOS, responseIOS, promptAsyncIOS] = useAuthRequest(configIOS, discoveryIOS);


    const {logIn, logOut} = useAuthStore();


    const signInWithEmail = async (data: SignInDto) => {
        try {
            setIsLoading(true);
            const res = await API.api.authControllerSignIn({email: data.email, password: data.password});
            if (res.data) {
                logIn(res.data.accessToken, res.data.refreshToken, res.data.user.firstName, res.data.user.lastName, res.data.user.email);
            }
        } catch (err: any) {
            // The backend returns 403 + requiresVerification when the email isn't
            // verified yet (and re-sends a fresh code). Move the UI to the OTP step.
            if (err?.response?.data?.requiresVerification) {
                setPendingVerificationEmail(err.response.data.email ?? data.email);
                return;
            }
            setErrorMessage(err?.response?.data?.message);

        } finally {
            setIsLoading(false);
        }
    };


    const signUpWithEmail = async (signUpData: SignUpDto) => {
        try {
            setIsLoading(true);
            // Signup no longer returns tokens — the user must verify their email
            // first. A verification code has been emailed by the backend.
            await API.api.authControllerSignUp(signUpData);
            setPendingVerificationEmail(signUpData.email);
        } catch (err: any) {
            setErrorMessage(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const verifyEmail = async (data: VerifyEmailDto) => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            const res = await API.api.authControllerVerifyEmail(data);
            if (res.data) {
                await logIn(res.data.accessToken, res.data.refreshToken, res.data.user.firstName, res.data.user.lastName, res.data.user.email);
                setPendingVerificationEmail(null);
            }
        } catch (err: any) {
            setErrorMessage(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resendVerification = async (email: string) => {
        try {
            setErrorMessage(null);
            await API.api.authControllerResendVerification({email});
        } catch (err: any) {
            setErrorMessage(err?.response?.data?.message);
        }
    };

    const clearPendingVerification = () => {
        setPendingVerificationEmail(null);
        setErrorMessage(null);
    };


    const signInWithGoogle = async () => {
        try {
            if (!request) {
                console.log('No request from google sign in');
                return;
            }
            const result = await promptAsync();
            if (result.type === "success") {
                await exchangeWithToken(result.params.exchangeToken)
            }
            if (result.type === "error") {
                throw new AxiosError()
            }
        } catch {

            router.dismissTo("/profile")
            showSnackbar("login was not successful, please try again later", "error")

        }
    }

    const signInWithApple = async () => {
        try {
            if (!requestIOS) {
                console.log('No request from Apple sign in');
                return;
            }
            const result = await promptAsyncIOS();
            if (result.type === "success") {
                await exchangeWithToken(result.params.exchangeToken)
            }
            if (result.type === "error") {
                throw new AxiosError()
            }
        } catch {

            router.dismissTo("/profile")
            showSnackbar("login was not successful, please try again later", "error")
        }
    };


    const signOut = async () => {
        try {
            await API.api.authControllerSignOut();
            logOut();
        } catch (error) {
            console.error(error);
        }

    };

    const deleteUser = async () => {
        try {
            await API.api.usersControllerDeleteUser();
            logOut();
        } catch (err) {
            console.error(err);
        }
    };


    const exchangeWithToken = async (token: string) => {
        if (!token) {
            console.error('No token to exchange');
            return;
        }
        try {
            const res = await API.api.authControllerExchangeToken({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await logIn(res.data.accessToken, res.data.refreshToken, res.data.user.firstName, res.data.user.lastName, res.data.user.email);
            if (Platform.OS === "android") {
                setTimeout(() => {
                    router.dismissTo("/profile")
                    showSnackbar("Logged in successfully", "success")
                }, 3000)
            }
            showSnackbar("Logged in successfully", "success")
        } catch {
            if (Platform.OS === "android") {
                setTimeout(() => {
                    router.dismissTo("/profile")
                    showSnackbar("couldn't login, please try again later", "error")
                }, 3000)
            }
            showSnackbar("couldn't login, please try again later", "error")
        }
    };

    //
    // useEffect(() => {
    //     const exchangeToken = async () => {
    //         if (response?.type === 'success') {
    //             await exchangeWithToken(response.params.exchangeToken);
    //         }
    //     };
    //     exchangeToken();
    // }, [response]);
    //
    // useEffect(() => {
    //     const exchangeToken = async () => {
    //         if (responseIOS?.type === 'success') {
    //
    //             await exchangeWithToken(responseIOS.params.exchangeToken);
    //         }
    //         if (responseIOS?.type === 'error') {
    //             console.error(responseIOS?.errorCode);
    //         }
    //     };
    //     exchangeToken();
    // }, [responseIOS]);

    return (
        <AuthContext.Provider value={{
            signInWithApple,
            signInWithGoogle,
            signInWithEmail,
            signUpWithEmail,
            verifyEmail,
            resendVerification,
            clearPendingVerification,
            pendingVerificationEmail,
            signOut,
            deleteUser,
            isLoading,
            errorMessage,
            setErrorMessage,
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