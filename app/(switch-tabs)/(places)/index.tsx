import AppView from '@/components/appComponents/AppView';
import PlacesToolbar from '@/components/toolbars/PlacesToolbar';
import {useApi} from '@/utils/api';
import {Alert, SectionList, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useEffect, useState} from 'react';
import AddPlaceModal from '@/components/modals/AddPlaceModal';
import {PlaceStatus, VendorPlaceDto, VendorPlaceViewModel} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {Link, Stack} from "expo-router";
import AppBottomSheet from "@/components/appComponents/AppBottomSheet";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppIf from "@/components/appComponents/AppIf";

export default function Index() {
    const API = useApi();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [places, setPlaces] = useState<VendorPlaceViewModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState<boolean>(false);

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<VendorPlaceDto>();

    useEffect(() => {
        const getPlaces = async () => {
            try {
                const res = await API.placesControllerGetPlaces();
                setPlaces(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getPlaces();
    }, [trigger]);

    useEffect(() => {
        !isBottomSheetVisible && setSelectedPlace(undefined)
    }, [isBottomSheetVisible]);

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

    function handleDeletePlace() {
        Alert.alert("Delete place", "Are you sure you want to delete this place? All promotions for this place will be cancelled as well.", [{
            text: "Cancel", style: "default",
        }, {
            text: "Delete",
            onPress: () => deletePlace(),
            style: "destructive"
        }])
    }

    function handleUnpublishPlace() {
        Alert.alert("Unpublish place", "Are you sure you want to unpublish this place?, visitors will not be able to see your listing anymore", [{
            text: "Cancel", style: "default",
        }, {
            text: "Unpublish",
            onPress: () => toggleStatus(PlaceStatus.Unpublished),
        }
        ])
    }

    async function deletePlace(): Promise<void> {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await API.placesControllerDeletePlace({id: selectedPlace.id})
        } catch (err) {
            console.error(err)
        } finally {
            setTrigger((prev: boolean) => !prev)
            setIsLoading(false)
            setIsBottomSheetVisible(false)
        }


    }

    async function toggleStatus(newStatus: PlaceStatus) {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await API.placesControllerToggleStatus({placeId: selectedPlace.id, status: newStatus})
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setTrigger((prev: boolean) => !prev)
            setIsBottomSheetVisible(false)
        }
    }

    function SectionHeaderItem({title}: { title: string }) {
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text
                    style={[styles.sectionHeader, title === PlaceStatus.Published ? styles.publishedSectionHeader : styles.unpublishedSectionHeader]}>{title}</Text>

                <AppIf value={title === PlaceStatus.Published}>
                    <IconSymbol name="checkmark.circle" size={20} color={Theme.colors.green.S700}/>
                </AppIf>
            </View>

        )

    }


    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <PlacesToolbar onCreatePlace={() => setOpenModal(true)}/>

            <AppView withPadding isLoading={isLoading}>
                {places &&
                    <SectionList
                        renderSectionHeader={({section}) => (<SectionHeaderItem title={section.title}/>)}
                        contentContainerStyle={styles.flatlist}
                        keyExtractor={(item) => item.id.toString()}
                        sections={[places.published, places.unpublished]}
                        renderItem={(item) => <VendorPlaceItem onPress={handlePlacePress}
                                                               setTrigger={setTrigger} data={item.item}/>
                        }/>
                }

            </AppView>

            <AddPlaceModal setTrigger={setTrigger} placeId={selectedPlace?.id} setIsVisible={setOpenModal}
                           isVisible={openModal}/>
            <AppBottomSheet setIsVisible={setIsBottomSheetVisible} isVisible={isBottomSheetVisible}>
                {selectedPlace &&
                    <View>

                        {selectedPlace.status === PlaceStatus.Unpublished &&
                            <View style={styles.actionBtn}>
                                <AppButton onPress={() => toggleStatus(PlaceStatus.Published)}
                                           icon="square.and.arrow.up"
                                           buttonType={ButtonType.PLAIN}
                                           confirmative>
                                    Publish
                                </AppButton>
                            </View>

                        }
                        <View style={styles.actionBtn}>
                            <Link asChild push href={{
                                pathname: "/(switch-tabs)/(places)/[id]",
                                params: {id: selectedPlace.id?.toString()}
                            }}>

                                <AppButton icon="eye" buttonType={ButtonType.PLAIN}
                                           onPress={handleViewPlace}>
                                    View place
                                </AppButton>
                            </Link>
                        </View>

                        <View style={styles.actionBtn}>
                            <AppButton icon="square.and.pencil" buttonType={ButtonType.PLAIN}
                                       onPress={handleEditPlace}>
                                Edit place
                            </AppButton>
                        </View>

                        {selectedPlace.status === PlaceStatus.Published &&
                            <View style={styles.actionBtn}>
                                <AppButton
                                    onPress={handleUnpublishPlace}
                                    icon="square.and.arrow.down" buttonType={ButtonType.PLAIN}>
                                    Unpublish
                                </AppButton>
                            </View>
                        }


                        <View style={styles.actionBtn}>
                            <AppButton icon="trash"
                                       onPress={handleDeletePlace} destructive
                                       buttonType={ButtonType.PLAIN}>
                                Delete place
                            </AppButton>
                        </View>


                    </View>}
            </AppBottomSheet>
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
        borderBottomWidth: 1,
        padding: 20,
        borderColor: Theme.colors.gray.S200,
    },
    publishBtn: {
        paddingVertical: 20,
        borderColor: Theme.colors.gray.S300,
        borderStyle: "dashed",
        borderTopWidth: 1
    },
    sectionHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    sectionHeader: {
        fontWeight: "bold",
    },
    publishedSectionHeader: {
        color: Theme.colors.green.S700,
    },
    unpublishedSectionHeader: {
        color: Theme.colors.gray.S500,
    },
});