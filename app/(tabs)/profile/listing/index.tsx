import AppView from '@/components/appComponents/AppView';
import {useApi} from '@/utils/api';
import {RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useCallback, useEffect, useRef, useState} from 'react';
import CreatePlaceModal from '@/components/modals/CreatePlaceModal';
import {VendorPlaceDto, VendorPlaceViewModel} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import AppIf from '@/components/appComponents/AppIf';
import {CommonStyles} from '@/styles/Common';
import {REFRESH_DELAY} from '@/constants/general';
import {AppModalRef} from '@/components/appComponents/AppModal';
import {AppBottomSheetRef} from '@/components/appComponents/AppBottomSheet';
import {IconButton} from '@/components/symbols/IconButton';
import {Stack} from 'expo-router';

export default function Index() {

    const {api} = useApi();
    const [places, setPlaces] = useState<VendorPlaceViewModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const [selectedPlace, setSelectedPlace] = useState<VendorPlaceDto>();

    const createPlaceModalRef = useRef<AppModalRef>(null);
    const actionsBottomSheetRef = useRef<AppBottomSheetRef>(null);


    const getPlaces = useCallback(async () => {
        try {
            const res = await api.placesControllerGetPlaces();
            setPlaces(res.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    }, []);


    const refreshPlaces = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(async () => {
            await getPlaces();
            setIsRefreshing(false);
        }, REFRESH_DELAY);
    }, [getPlaces]);


    const reloadPlaces = useCallback(() => {
        setIsLoading(true);
        setTimeout(async () => {
            await getPlaces();
            setIsLoading(false);
        }, REFRESH_DELAY);
    }, [getPlaces]);


    useEffect(() => {
        reloadPlaces();
    }, []);

    //
    // function handlePlacePress(place: VendorPlaceDto) {
    //     setSelectedPlace(place);
    //     actionsBottomSheetRef.current?.open();
    //
    // }


    function SectionHeaderItem({title, length}: { title: string | null; length: number | null }) {
        return (
            <View style={styles.sectionHeaderContainer}>
                <AppIf value={title === 'Published'}>
                    <IconSymbol name="checkmark.circle" weight="bold" size={20} color={Theme.colors.green.S700}/>
                </AppIf>
                <Text
                    style={[styles.sectionHeader, title === 'Published' ? styles.publishedSectionHeader : styles.unpublishedSectionHeader]}>{title} ({length})</Text>
            </View>

        );

    }

    return (
        <>
            <Stack.Screen options={{
                headerBackButtonMenuEnabled: true,
                headerBackButtonDisplayMode: 'minimal',
                headerStyle: {backgroundColor: Theme.colors.background},
                title: 'Listings',
                headerRight: () => <IconButton removeBackground onPress={() => createPlaceModalRef.current?.open()}
                                               name="plus"/>,
            }}/>

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
                            renderItem={(item) => <VendorPlaceItem
                                setTrigger={setIsLoading} data={item.item}/>
                            }/>
                        :
                        <Text style={[{marginVertical: 'auto'}, CommonStyles.dataNotFound]}>You dont have places yet ,
                            create one
                            now</Text>

                }


            </AppView>


            <CreatePlaceModal
                reloadPlaces={reloadPlaces}
                ref={createPlaceModalRef}
            />


            {/*<VendorPlacesActionsBottomSheet*/}
            {/*  ref={actionsBottomSheetRef}*/}
            {/*  selectedPlace={selectedPlace}*/}
            {/*  reloadPlaces={reloadPlaces}*/}

            {/*/>*/}
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
        borderStyle: 'dashed',
        borderTopWidth: 1,
    },
    sectionHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    sectionHeader: {
        fontWeight: 'bold',
    },
    publishedSectionHeader: {
        color: Theme.colors.green.S700,
    },
    unpublishedSectionHeader: {
        color: Theme.colors.gray.S500,
    },
});