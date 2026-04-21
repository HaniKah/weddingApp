import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationGeocodedAddress} from 'expo-location';
import {ErrorMsg} from "@/types/general";
import {CountryCode} from "@/types/open-api";
import {useRouter} from "expo-router";

type LocationContextType = {
    isLocationGranted: boolean,
    errorMsg: ErrorMsg | null,
    isoCountry: CountryCode | null
    setIsoCountry: Dispatch<SetStateAction<CountryCode | null>>

}

const LocationContext = createContext<LocationContextType>({
    isLocationGranted: false,
    errorMsg: {title: "", msg: ""},
    isoCountry: null,
    setIsoCountry: () => {
    },


})

export function LocationProvider({children}: { children: React.ReactNode }) {

    const [isLocationGranted, setIsLocationGranted] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<ErrorMsg | null>(null);
    const [isoCountry, setIsoCountry] = useState<CountryCode | null>(null)

    const router = useRouter();
    useEffect(() => {


        const getCurrentLocation = async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // setErrorMsg({
                //     msg: 'Permission to access location was denied , please change location accessibility in your phone settings to be able to use this app properly',
                //     title: "Access denied"
                // });
                router.dismissTo("/pick-location")
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                if (!location) {
                    setErrorMsg({
                        title: "Location not found",
                        msg: 'We were unable to get your location, please check your settings'
                    });
                } else {
                    setIsLocationGranted(true);

                    const postalAddress: LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    });
                    //todo: iso Countries should actually match
                    setIsoCountry(postalAddress[0].isoCountryCode as CountryCode)
                }
            } catch (e) {
                setErrorMsg({
                    title: "Location not found",
                    msg: 'We were unable to get your location, please check your settings'
                });
            }

        }

        getCurrentLocation();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                isLocationGranted,
                errorMsg,
                isoCountry,
                setIsoCountry
            }}>
            {children}
        </LocationContext.Provider>
    )
}

export function useLocationContext() {
    return useContext(LocationContext)
}