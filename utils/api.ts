import {Api} from "@/types/open-api";
import {useAuthStore} from "@/utils/authStore";
import axios from "axios";
import {Platform} from "react-native";


export function useApi() {
    const api = new Api({
        baseURL: process.env.NODE_ENV === "development" && Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL
    })


    const {logOut, accessToken, refreshToken} = useAuthStore()

    //request interceptor to add access token to header
    api.instance.interceptors.request.use(config => {
        const token = accessToken
        if (token && !config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config

    }, (error) => {
        Promise.reject(error)
    })

    // response interceptor to handle token refresh
    api.instance.interceptors.response.use(response => response, async (error) => {
        const originalRequest = error.config
        // if 401 error and not already retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            // attempt to refresh token
            try {
                const oldRefreshToken = refreshToken
                const res = await axios.post(`${api.instance.getUri()}/api/auth/refresh`, null, {headers: {Authorization: `Bearer ${oldRefreshToken}`}})
                const {accessToken: newAccessToken, refreshToken: newRefreshToken} = res.data

                // Update the store with new tokens. Since we are in a hook, we can use the actions if we had one for just tokens, 
                // but we can also use useAuthStore.setState or just call logIn if we have all info.
                // Given the current store, let's use setState for a surgical update.
                useAuthStore.setState({accessToken: newAccessToken, refreshToken: newRefreshToken});

                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                return api.instance(originalRequest)
            } catch (err) {
                logOut()
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    })


    return api
}





