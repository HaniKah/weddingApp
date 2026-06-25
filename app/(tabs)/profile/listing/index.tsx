import AppView from '@/components/appComponents/AppView';
import {useApi} from '@/utils/api';
import {RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useCallback, useEffect, useRef, useState} from 'react';
import CreatePlaceModal from '@/components/modals/CreatePlaceModal';
import {UpdateStep, VendorPlaceViewModel} from '@/types/open-api';
import VendorPlaceItem from '@/components/items/VendorPlaceItem';
import {CommonStyles} from '@/styles/Common';
import {REFRESH_DELAY} from '@/constants/general';
import {AppModalRef} from '@/components/appComponents/AppModal';
import {IconButton} from '@/components/symbols/IconButton';
import {Stack} from 'expo-router';

export default function Index() {

    const {api} = useApi();
    const [places, setPlaces] = useState<VendorPlaceViewModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);


    const createPlaceModalRef = useRef<AppModalRef>(null);


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
        setTimeout(async () => {
            setIsLoading(true);
            await getPlaces();
            setIsLoading(false);
        }, REFRESH_DELAY);
    }, [getPlaces]);


    useEffect(() => {
        reloadPlaces();
    }, [reloadPlaces]);


    function SectionHeaderItem({title}: { title: string | null; }) {
        return (
            <View style={styles.sectionHeaderContainer}>
                {title &&
                    <Text
                        style={[styles.sectionHeader, title === 'Published' ? styles.publishedSectionHeader : styles.unpublishedSectionHeader]}>{title}</Text>
                }
            </View>

        );

    }

    return (
        <>
            <Stack.Screen options={{
                headerBackButtonMenuEnabled: true,
                headerBackButtonDisplayMode: 'minimal',
                contentStyle: {backgroundColor: Theme.colors.background},
                title: 'Listings',
            }}/>

            <AppView>

                {
                    places && Object.values(places).flatMap(s => s.data).length > 0 ?
                        <SectionList
                            contentContainerStyle={styles.sectionlist}
                            refreshControl={<RefreshControl refreshing={isRefreshing}
                                                            onRefresh={refreshPlaces}/>}
                            renderSectionHeader={({section}) => (
                                <SectionHeaderItem title={section.data.length > 0 ? section.title : null}
                                />)}
                            keyExtractor={(item) => item.id.toString()}
                            sections={[places.published, places.unpublished]}
                            renderItem={(item) => <VendorPlaceItem
                                setTrigger={setIsLoading} data={item.item}/>
                            }/>
                        :
                        <Text style={[{marginVertical: 'auto'}, CommonStyles.dataNotFound]}>You dont have places yet ,
                            create one
                            now</Text>

                }
                <View style={styles.addButtonContainer}>
                    <IconButton color={Theme.colors.white}
                                extraStylesBtn={styles.addButton}
                                onPress={() => createPlaceModalRef.current?.open()}
                                name="plus">

                    </IconButton>
                </View>
            </AppView>


            <CreatePlaceModal
                initalStep={UpdateStep.FillPlaceInfo}
                reloadPlaces={reloadPlaces}
                ref={createPlaceModalRef}
            />

        </>
    );
}
const styles = StyleSheet.create({

    addButtonContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },

    addButton: {
        width: 55,
        height: 55,
        backgroundColor: Theme.colors.primary,
        boxShadow: Theme.shadow.lg,
    },

    sectionlist: {
        padding: Theme.global.appPadding,
        paddingBottom: 10
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
        marginTop: 10,
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