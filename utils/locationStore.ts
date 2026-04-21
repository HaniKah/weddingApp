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


export const useLocationStore = () => ({
    setLocation: storeData,
    getLocation: getData
})