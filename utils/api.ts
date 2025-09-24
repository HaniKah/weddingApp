import {Api} from "@/types/open-api";

export const API = new Api({baseURL: process.env.EXPO_PUBLIC_API_URL, withCredentials: true}).api