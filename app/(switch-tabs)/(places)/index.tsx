import AppView from '@/components/appComponents/AppView';
import PlacesToolbar from '@/components/toolbars/PlacesToolbar';
import {useApi} from '@/utils/api';
import {FlatList, StyleSheet} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useEffect, useState} from 'react';
import AddPlaceModal from '@/components/modals/AddPlaceModal';
import {VendorPlaceDto} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {Stack} from "expo-router";

export default function Index() {
    const API = useApi();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [places, setPlaces] = useState<VendorPlaceDto[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        const getPlaces = async () => {
            try {
                const res = await API.placesControllerGetPlaces();
                setPlaces(res.data.result);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getPlaces();
    }, [trigger]);


    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <PlacesToolbar onCreatePlace={() => setOpenModal(true)}/>
            <AppView withPadding isLoading={isLoading}>
                <FlatList contentContainerStyle={styles.flatlist} keyExtractor={(item) => item.id.toString()}
                          data={places}
                          renderItem={(item) => <VendorPlaceItem setTrigger={setTrigger} data={item.item}/>
                          }/>
            </AppView>

            <AddPlaceModal setIsVisible={setOpenModal} isVisible={openModal}/>
        </>
    );
}
const styles = StyleSheet.create({
    flatlist: {
        gap: 10,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        padding: 10,
    },
});