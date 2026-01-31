import AppView from '@/components/appComponents/AppView';
import PlacesToolbar from '@/components/toolbars/PlacesToolbar';
import {useApi} from '@/utils/api';
import {Alert, RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useCallback, useEffect, useState} from 'react';
import CreatePlaceModal from '@/components/modals/CreatePlaceModal';
import {VendorPlaceDto, VendorPlaceViewModel} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {Link, Stack} from "expo-router";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppIf from "@/components/appComponents/AppIf";
import {CommonStyles} from "@/styles/Common";
import PromotePlaceModal from "@/components/modals/PromotePlaceModal";
import {REFRESH_DELAY} from "@/constants/general";
import AppBottomSheet from "@/components/appComponents/AppBottomSheet";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";

export default function Index() {
    const {api} = useApi()
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showPromoteModal, setShowPromoteModal] = useState<boolean>(false);

    const [places, setPlaces] = useState<VendorPlaceViewModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<VendorPlaceDto>();


    const getPlaces = useCallback(async () => {
        try {
            const res = await api.placesControllerGetPlaces();
            setPlaces(res.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    }, [])

    useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    const refreshPlaces = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(async () => {
            await getPlaces()
            setIsRefreshing(false)
        }, REFRESH_DELAY)
    }, [getPlaces])

    const reloadPlaces = useCallback(() => {
        setIsLoading(true)
        setTimeout(async () => {
            await getPlaces()
            setIsLoading(false)
        }, REFRESH_DELAY)
    }, [getPlaces])


    function handlePlacePress(place: VendorPlaceDto) {
        setSelectedPlace(place);
        setIsBottomSheetVisible(true);

    }

    function handleViewPlace() {
        setSelectedPlace(undefined);
        setIsBottomSheetVisible(false);
    }

    function handleEditPlace() {
        setShowCreateModal(true)
        setIsBottomSheetVisible(false);
    }

    function handlePromotePlace() {
        setShowPromoteModal(true)
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
            onPress: () => toggleStatus(false),
        }
        ])
    }

    async function deletePlace(): Promise<void> {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await api.placesControllerDeletePlace({id: selectedPlace.id})
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setIsBottomSheetVisible(false)
        }
    }

    async function toggleStatus(ispublished: boolean) {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await api.placesControllerToggleStatus({placeId: selectedPlace.id, isPublished: ispublished})
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setIsBottomSheetVisible(false)
        }
    }


    function SectionHeaderItem({title}: { title: string | null }) {
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text
                    style={[styles.sectionHeader, title === "Published" ? styles.publishedSectionHeader : styles.unpublishedSectionHeader]}>{title}</Text>
                <AppIf value={title === "Published"}>
                    <IconSymbol name="checkmark.circle" size={20} color={Theme.colors.green.S700}/>
                </AppIf>
            </View>

        )

    }

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <PlacesToolbar onCreatePlace={() => setShowCreateModal(true)}/>

            <AppView isLoading={isLoading} withPadding>


                {
                    places && Object.values(places).flatMap(s => s.data).length > 0 ?
                        <SectionList
                            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshPlaces}/>}
                            renderSectionHeader={({section}) => (
                                <SectionHeaderItem title={section.data.length > 0 ? section.title : null}/>)}
                            contentContainerStyle={styles.flatlist}
                            keyExtractor={(item) => item.id.toString()}
                            sections={[places.published, places.unpublished, places.uncompleted]}
                            renderItem={(item) => <VendorPlaceItem onPress={handlePlacePress}
                                                                   setTrigger={setIsLoading} data={item.item}/>
                            }/>
                        :
                        <Text style={[{marginVertical: "auto"}, CommonStyles.dataNotFound]}>You dont have places yet ,
                            create one
                            now</Text>

                }


            </AppView>


            <CreatePlaceModal onFinish={reloadPlaces}
                              placeId={selectedPlace?.id}
                              setIsVisible={setShowCreateModal}
                              isVisible={showCreateModal}/>


            <PromotePlaceModal placeId={selectedPlace?.id}
                               setIsVisible={setShowPromoteModal}
                               isVisible={showPromoteModal}/>


            <AppBottomSheet setIsVisible={setIsBottomSheetVisible} isVisible={isBottomSheetVisible}>
                {selectedPlace &&
                    <View>
                        {selectedPlace.isPublished &&
                            <AppButton extraStylesBtn={styles.actionBtn}
                                       informative
                                       fullWidth
                                       textPosition="LEFT"
                                       onPress={handlePromotePlace}
                                       buttonType={ButtonType.PLAIN}
                                       icon="horn.blast"
                            >
                                Promote
                            </AppButton>

                        }


                        {!selectedPlace.isPublished && selectedPlace.isCompleted &&
                            <AppButton
                                extraStylesBtn={styles.actionBtn}
                                fullWidth
                                textPosition='LEFT'
                                onPress={() => toggleStatus(true)}
                                icon="square.and.arrow.up"
                                buttonType={ButtonType.PLAIN}
                                confirmative>
                                Publish
                            </AppButton>

                        }


                        {selectedPlace.isCompleted &&
                            <Link
                                asChild push href={{
                                pathname: "/(switch-tabs)/(places)/[id]",
                                params: {id: selectedPlace.id?.toString()}
                            }}>
                                <AppButton
                                    extraStylesBtn={styles.actionBtn}
                                    fullWidth
                                    textPosition="LEFT"
                                    icon="eye"
                                    buttonType={ButtonType.PLAIN}
                                    onPress={handleViewPlace}>
                                    View place
                                </AppButton>
                            </Link>
                        }


                        <AppButton
                            extraStylesBtn={styles.actionBtn}
                            fullWidth
                            textPosition="LEFT"
                            icon="square.and.pencil"
                            buttonType={ButtonType.PLAIN}
                            onPress={handleEditPlace}>
                            {selectedPlace.isCompleted ? "Edit place" : "Continue"}
                        </AppButton>

                        {selectedPlace.isPublished &&
                            <AppButton
                                fullWidth
                                textPosition="LEFT"
                                extraStylesBtn={styles.actionBtn}
                                destructive
                                onPress={handleUnpublishPlace}
                                icon="square.and.arrow.down" buttonType={ButtonType.PLAIN}>
                                Unpublish
                            </AppButton>
                        }


                        <AppButton
                            fullWidth
                            textPosition="LEFT"
                            extraStylesBtn={styles.actionBtn}
                            icon="trash"
                            onPress={handleDeletePlace} destructive
                            buttonType={ButtonType.PLAIN}>
                            Delete place
                        </AppButton>


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
        borderColor: Theme.colors.gray.S200,
        paddingVertical: 20,
        paddingHorizontal: 20
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