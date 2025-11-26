import AppView from '@/components/appComponents/AppView';
import PlacesToolbar from '@/components/toolbars/PlacesToolbar';
import {useApi} from '@/utils/api';
import {FlatList, StyleSheet, Switch} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useEffect, useState} from 'react';
import AddPlaceModal from '@/components/modals/AddPlaceModal';
import {VendorPlaceDto} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {Stack} from "expo-router";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";

export default function Index() {
    const API = useApi();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [places, setPlaces] = useState<VendorPlaceDto[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState<boolean>(false);

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

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
            <Switch value={bottomSheetVisible} onValueChange={() => setBottomSheetVisible(!bottomSheetVisible)}/>

            <AppView withPadding isLoading={isLoading}>
                <FlatList contentContainerStyle={styles.flatlist} keyExtractor={(item) => item.id.toString()}
                          data={places}
                          renderItem={(item) => <VendorPlaceItem setTrigger={setTrigger} data={item.item}/>
                          }/>
            </AppView>

            <AddPlaceModal setIsVisible={setOpenModal} isVisible={openModal}/>
            <BottomSheet setIsVisible={setBottomSheetVisible} isVisible={bottomSheetVisible}>
                <AppButton buttonType={ButtonType.PLAIN} fullWidth>
                    View place
                </AppButton>
                <AppButton buttonType={ButtonType.PLAIN} fullWidth>
                    View place
                </AppButton>
                <AppButton buttonType={ButtonType.PLAIN} fullWidth>
                    View place
                </AppButton>
            </BottomSheet>


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