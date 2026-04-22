import {CountryCode} from "@/types/open-api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyName = 'countryCode';
const storeData = async (value: CountryCode) => {
    try {
        await AsyncStorage.setItem(keyName, value);
    } catch (error) {
        console.log("unable to set location in store", error)
    }
};

const getData = async () => {
    try {
        return await AsyncStorage.getItem(keyName);
    } catch (err) {
        return null
    }

};
const removeData = async () => {
    try {
        await AsyncStorage.removeItem(keyName);
        console.log("removing location from store")
    } catch (error) {
        console.log("unable to remove location from store", error)
    }
}


export const useLocationStore = () => ({
    setLocation: storeData,
    getLocation: getData,
    removeLocation: removeData,
})