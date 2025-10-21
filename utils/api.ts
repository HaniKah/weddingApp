import {Api} from "@/types/open-api";
import {getItem} from "expo-secure-store";

const headers = {Authorization: ` Bearer ${getItem("accessToken")}`}

export const API = new Api({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true,
    headers: headers,
}).api

