import AppView from '@/components/appComponents/AppView';
import PlacesToolbar from '@/components/toolbars/PlacesToolbar';
import {useApi} from '@/utils/api';
import {RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useCallback, useEffect, useRef, useState} from 'react';
import CreatePlaceModal from '@/components/modals/CreatePlaceModal';
import {VendorPlaceDto, VendorPlaceViewModel} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {Stack} from "expo-router";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppIf from "@/components/appComponents/AppIf";
import {CommonStyles} from "@/styles/Common";
import {REFRESH_DELAY} from "@/constants/general";
import VendorPlacesActionsBottomSheet from "@/components/bottomSheets/VendorPlacesActionsBottomSheet";
import {AppModalRef} from "@/components/appComponents/AppModal";

export default function Index() {

    const {api} = useApi()

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false)

    const [places, setPlaces] = useState<VendorPlaceViewModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const [selectedPlace, setSelectedPlace] = useState<VendorPlaceDto>();

    const createPlaceModalRef = useRef<AppModalRef>(null)


    const getPlaces = useCallback(async () => {
        try {

            const res = await api.placesControllerGetPlaces();
            setPlaces(res.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    }, [])

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

    useEffect(() => {
        reloadPlaces()
    }, []);

    function handlePlacePress(place: VendorPlaceDto) {
        setSelectedPlace(place);
        setIsBottomSheetVisible(true);

    }


    function SectionHeaderItem({title, length}: { title: string | null; length: number | null }) {
        return (
            <View style={styles.sectionHeaderContainer}>
                <AppIf value={title === "Published"}>
                    <IconSymbol name="checkmark.circle" size={20} color={Theme.colors.green.S700}/>
                </AppIf>
                <Text
                    style={[styles.sectionHeader, title === "Published" ? styles.publishedSectionHeader : styles.unpublishedSectionHeader]}>{title} ({length})</Text>
            </View>

        )

    }

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <PlacesToolbar onCreatePlace={() => createPlaceModalRef.current?.open()}/>

            <AppView withPadding>
                
                {
                    places && Object.values(places).flatMap(s => s.data).length > 0 ?
                        <SectionList
                            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshPlaces}/>}
                            renderSectionHeader={({section}) => (
                                <SectionHeaderItem title={section.data.length > 0 ? section.title : null}
                                                   length={section.data.length > 0 ? section.data.length : null}/>)}
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


            <CreatePlaceModal
                reloadPlaces={reloadPlaces}
                ref={createPlaceModalRef}
                placeId={undefined}/>


            <VendorPlacesActionsBottomSheet selectedPlace={selectedPlace}
                                            isBottomSheetVisible={isBottomSheetVisible}
                                            setIsBottomSheetVisible={setIsBottomSheetVisible}
                                            reloadPlaces={reloadPlaces}

            />
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