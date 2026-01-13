import {createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {Platform} from "react-native";
import * as Device from "expo-device";

type LocationContextType = {
    isLocationGranted: boolean,
    setIsLocationGranted: Dispatch<SetStateAction<boolean>>
    location: Location.LocationObject | null,
    setLocation: Dispatch<SetStateAction<Location.LocationObject | null>>
    errorMsg: string | null,
    setErrorMsg: Dispatch<SetStateAction<string | null>>
}

const LocationContext = createContext<LocationContextType>({
    isLocationGranted: false,
    setIsLocationGranted: () => {
    },
    location: null,
    setLocation: () => {
    },
    errorMsg: "",
    setErrorMsg: () => {
    },
})

export function LocationProvider({children}: { children: React.ReactNode }) {

    const [isLocationGranted, setIsLocationGranted] = useState<boolean>(false)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);


    const getCurrentLocation = useCallback(async () => {
        if (Platform.OS === 'android' && !Device.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
            );
            return;
        }
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied , please change location accessibility in your phone settings to be able to use this app properly');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLocation(location);
        setIsLocationGranted(true);

    }, [])

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                isLocationGranted,
                setIsLocationGranted,
                location,
                setLocation,
                setErrorMsg,
                errorMsg,
            }}>
            {children}
        </LocationContext.Provider>
    )
}

export function useLocationContext() {
    return useContext(LocationContext)
}