import {createContext, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationGeocodedAddress} from 'expo-location';

type LocationContextType = {
    isLocationGranted: boolean,
    location: Location.LocationObject | null,
    errorMsg: string | null,
    address: LocationGeocodedAddress | null
}

const LocationContext = createContext<LocationContextType>({
    isLocationGranted: false,
    location: null,
    errorMsg: "",
    address: null,

})

export function LocationProvider({children}: { children: React.ReactNode }) {

    const [isLocationGranted, setIsLocationGranted] = useState<boolean>(false)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [address, setAddress] = useState<LocationGeocodedAddress | null>(null)


    useEffect(() => {

        const getCurrentLocation = async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied , please change location accessibility in your phone settings to be able to use this app properly');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                setLocation(location);
                setIsLocationGranted(true);

                const postalAddress: LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
                setAddress(postalAddress[0])
            }


        }

        getCurrentLocation();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                isLocationGranted,
                location,
                errorMsg,
                address,
            }}>
            {children}
        </LocationContext.Provider>
    )
}

export function useLocationContext() {
    return useContext(LocationContext)
}