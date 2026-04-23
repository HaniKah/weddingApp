import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationGeocodedAddress} from 'expo-location';
import {ErrorMsg} from "@/types/general";
import {CountryCode} from "@/types/open-api";
import {useRouter} from "expo-router";
import {useLocationStore} from "@/utils/locationStore";
import {COUNTRIES} from "@/constants/countries";
import {useAuthStore} from "@/utils/authStore";

type LocationContextType = {
    isLocationGranted: boolean,
    errorMsg: ErrorMsg | null,
    setErrorMsg: Dispatch<SetStateAction<ErrorMsg | null>>,
    isoCountry: CountryCode | null
    setIsoCountry: Dispatch<SetStateAction<CountryCode | null>>

}

const LocationContext = createContext<LocationContextType>({
    isLocationGranted: false,
    errorMsg: {title: "", msg: ""},
    setErrorMsg: () => {
    },
    isoCountry: null,
    setIsoCountry: () => {
    },


})

export function LocationProvider({children}: { children: React.ReactNode }) {

    const [isLocationGranted, setIsLocationGranted] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<ErrorMsg | null>(null);
    const [isoCountry, setIsoCountry] = useState<CountryCode | null>(null)

    const router = useRouter();
    const {setLocation, getLocation, removeLocation} = useLocationStore()
    const {isLoggedIn} = useAuthStore()

    useEffect(() => {
        if (!isLoggedIn) {
            removeLocation()
            return

        }
        const getCurrentLocation = async () => {
            const countryCode = await getLocation()
            if (countryCode) {
                if (!COUNTRIES.has(countryCode as CountryCode)) {
                    router.dismissTo("/pick-location")
                }
                setIsoCountry(countryCode as CountryCode)
                return
            }

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
                    // setErrorMsg({
                    //     title: "Location not found",
                    //     msg: 'We were unable to get your location, please check your settings'
                    // });
                    router.dismissTo("/pick-location")
                } else {
                    setIsLocationGranted(true);

                    const postalAddress: LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    });
                    //todo: iso Countries should actually match
                    if (!COUNTRIES.has(postalAddress[0].isoCountryCode as CountryCode)) {
                        console.log(`country: ${postalAddress[0].isoCountryCode} is not supported `)
                        router.dismissTo("/pick-location")
                    }
                    setIsoCountry(postalAddress[0].isoCountryCode as CountryCode)
                    setLocation(postalAddress[0].isoCountryCode as CountryCode)
                }
            } catch (e) {
                setErrorMsg({
                    title: "Location not found",
                    msg: 'We were unable to get your location, please check your settings'
                });
            }


        }

        getCurrentLocation();
    }, [isLoggedIn]);

    return (
        <LocationContext.Provider
            value={{
                isLocationGranted,
                errorMsg,
                setErrorMsg,
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