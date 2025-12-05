import AppView from '@/components/appComponents/AppView';
import PlacesToolbar from '@/components/toolbars/PlacesToolbar';
import {useApi} from '@/utils/api';
import {FlatList, StyleSheet, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useEffect, useState} from 'react';
import AddPlaceModal from '@/components/modals/AddPlaceModal';
import {PlaceStatus, VendorPlaceDto} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {Link, Stack} from "expo-router";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";

export default function Index() {
    const API = useApi();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [places, setPlaces] = useState<VendorPlaceDto[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState<boolean>(false);

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<VendorPlaceDto>();

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

    function handlePlacePress(place: VendorPlaceDto) {
        setSelectedPlace(place);
        setIsBottomSheetVisible(true);

    }

    function handleViewPlace() {
        setTimeout(() => {
            setSelectedPlace(undefined);
            setIsBottomSheetVisible(false);
        }, 700)

    }

    function handleEditPlace() {
        setOpenModal(true)
        setIsBottomSheetVisible(false);
    }

    async function publish() {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await API.placesControllerToggleStatus({placeId: selectedPlace.id, status: PlaceStatus.Published})
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setTrigger((prev: boolean) => !prev)
        }
    }


    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <PlacesToolbar onCreatePlace={() => setOpenModal(true)}/>

            <AppView withPadding isLoading={isLoading}>
                <FlatList contentContainerStyle={styles.flatlist} keyExtractor={(item) => item.id.toString()}
                          data={places}
                          renderItem={(item) => <VendorPlaceItem onPress={handlePlacePress}
                                                                 setTrigger={setTrigger} data={item.item}/>
                          }/>
            </AppView>

            <AddPlaceModal setIsVisible={setOpenModal} isVisible={openModal}/>
            <BottomSheet setIsVisible={setIsBottomSheetVisible} isVisible={isBottomSheetVisible}>
                {selectedPlace &&
                    <View>
                        <Link asChild push href={{
                            pathname: "/(switch-tabs)/(places)/[id]",
                            params: {id: selectedPlace?.toString()}
                        }}>
                            <AppButton extraStylesBtn={styles.actionBtn} fullWidth onPress={handleViewPlace}>
                                View place
                            </AppButton>
                        </Link>

                        <AppButton extraStylesBtn={styles.actionBtn} fullWidth buttonType={ButtonType.PLAIN}
                                   onPress={handleEditPlace}>
                            Edit place
                        </AppButton>


                        {selectedPlace.status === PlaceStatus.Unpublished &&
                            <View style={styles.publishBtn}>
                                <AppButton fullWidth confirmative>
                                    Publish
                                </AppButton>
                            </View>

                        }

                    </View>}
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
    actionBtn: {
        marginBottom: 20
    },
    publishBtn: {
        paddingVertical: 20,
        borderColor: Theme.colors.gray.S300,
        borderStyle: "dashed",
        borderTopWidth: 1
    }


});