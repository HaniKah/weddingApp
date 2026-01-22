import {createContext, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationGeocodedAddress} from 'expo-location';
import {ErrorMsg} from "@/types/general";

type LocationContextType = {
    isLocationGranted: boolean,
    location: Location.LocationObject | null,
    errorMsg: ErrorMsg | null,
    address: LocationGeocodedAddress | null
}

const LocationContext = createContext<LocationContextType>({
    isLocationGranted: false,
    location: null,
    errorMsg: {title: "", msg: ""},
    address: null,

})

export function LocationProvider({children}: { children: React.ReactNode }) {

    const [isLocationGranted, setIsLocationGranted] = useState<boolean>(false)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<ErrorMsg | null>(null);
    const [address, setAddress] = useState<LocationGeocodedAddress | null>(null)


    useEffect(() => {

        const getCurrentLocation = async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            console.log("status", status)
            if (status !== 'granted') {
                setErrorMsg({
                    msg: 'Permission to access location was denied , please change location accessibility in your phone settings to be able to use this app properly',
                    title: "Access denied"
                });
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                console.log("location", location)
                if (!location) {
                    setErrorMsg({
                        title: "Location not found",
                        msg: 'We were unable to get your location, please check your settings'
                    });
                } else {
                    setLocation(location);
                    setIsLocationGranted(true);

                    const postalAddress: LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    });
                    setAddress(postalAddress[0])
                }
            } catch (e) {
                setErrorMsg({
                    title: "Location not found",
                    msg: 'We were unable to get your location, please check your settings'
                });
            }

        }

        getCurrentLocation();
    }, [location]);

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