import { createJSONStorage, persist } from 'zustand/middleware';
import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { UserType } from '@/types/user-type';

type UserInfo = {
  firstName: string | null
  lastName: string | null
  email: string | null
}

type userState = {
  isLoggedIn: boolean;
  logIn: (accessToken: string, refreshToken: string, firstName?: string, lastName?: string, email?: string) => void;
  logOut: () => void;
  userType: UserType
  user: UserInfo
}

export const useAuthStore = create(persist<userState>((set) => ({
  isLoggedIn: false,
  userType: UserType.User,
  user: {
    firstName: null,
    lastName: null,
    email: null,
  },


  logIn: (accessToken: string, refreshToken: string, firstName?: string, lastName?: string, email?: string) => set((state) => {
    setItem('accessToken', accessToken);
    setItem('refreshToken', refreshToken);
    if (firstName) {
      setItem('firstName', firstName);
    }
    if (lastName) {
      setItem('lastName', lastName);
    }
    if (email) {
      setItem('email', email);
    }
    return {
      ...state,
      isLoggedIn: true,
      user: {
        firstName: firstName ?? null, lastName: lastName ?? null, email: email ?? null,
      },
    };
  }),
  logOut: () => {
    deleteItemAsync('accessToken');
    deleteItemAsync('refreshToken');
    deleteItemAsync('firstName');
    deleteItemAsync('lastName');
    deleteItemAsync('email');
    set((state) => ({
      ...state,
      isLoggedIn: false,
    }));
  },
}), {
  'name': 'auth-storage',
  storage: createJSONStorage(() => ({
    setItem, getItem, removeItem: deleteItemAsync,
  })),

}));