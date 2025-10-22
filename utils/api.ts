import {Api} from "@/types/open-api";
import {getItem, setItem} from "expo-secure-store";
import {useAuthStore} from "@/utils/authStore";
import axios from "axios";


export function useApi() {
    const api = new Api({
        baseURL: process.env.EXPO_PUBLIC_API_URL,
    })


    const {logOut} = useAuthStore()

    //request interceptor to add access token to header
    api.instance.interceptors.request.use(config => {
        const token = getItem("accessToken")
        if (token) {
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
                const oldRefreshToken = getItem("refreshToken")
                const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/refresh`, null, {headers: {Authorization: `Bearer ${oldRefreshToken}`}})
                const {accessToken, refreshToken} = res.data

                setItem("accessToken", accessToken)
                setItem("refreshToken", refreshToken)
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`
                return api.instance(originalRequest)
            } catch (err) {
                logOut()
                console.error(err)
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    })


    return api.api
}





