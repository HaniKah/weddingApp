import {Alert, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {Link, Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {useApi} from '@/utils/api';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {PhotosDto, PhotoSize, UpdateStep, VendorPlaceDetailsDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import {AppModalRef} from '@/components/appComponents/AppModal';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import CategoryTag from '@/components/tags/CategoryTag';
import {COUNTRIES} from '@/constants/countries';
import {IconSymbol, IconSymbolName} from '@/components/symbols/IconSymbol';
import CreatePlaceModal from '@/components/modals/CreatePlaceModal';
import LineSeparator from '@/components/LineSeparator';
import AppView from '@/components/appComponents/AppView';
import AppPressable from '@/components/appComponents/AppPressable';
import {useTranslation} from 'react-i18next';
import {IconButton} from "@/components/symbols/IconButton";


export default function Place() {
    const {api} = useApi();
    const {id} = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const {t} = useTranslation();

    const [placeDetails, setPlaceDetails] = useState<VendorPlaceDetailsDto>();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [photos, setPhotos] = useState<PhotosDto[]>([]);
    const [activeStep, setActiveStep] = useState<UpdateStep>(UpdateStep.FillPlaceInfo);


    const editModalRef = useRef<AppModalRef>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchPlace();
        fetchPhotos();
        setIsLoading(false);
    }, [id]);

    async function fetchPlace() {
        try {
            const data = await api.placesControllerGetPlaceDetails({id: Number(id)});
            setPlaceDetails(data.data);
        } catch (err) {
            console.error(err);
        } finally {
        }
    }

    async function fetchPhotos() {
        try {
            const res = await api.photosControllerGetAllPhotos(Number(id), PhotoSize.Thumbnail);
            setPhotos(res.data.result);
        } catch (err) {
            console.error(err);
        } finally {
        }
    }


    function confirmDelete() {
        Alert.alert(
            t('profile.deleteAlertTitle'),
            t('profile.deleteAlertMessage'),
            [
                {text: t('common.cancel'), style: 'cancel'},
                {
                    text: t('profile.delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.placesControllerDeletePlace({id: Number(id)});
                            router.replace({pathname: '/(tabs)/profile/listing'});
                        } catch (err) {
                            console.error(err);
                        }
                    },
                },
            ],
        );
    }

    function confirmUnpublish() {
        if (!placeDetails?.id) return;
        Alert.alert(
            t('profile.unpublishAlertTitle'),
            t('profile.unpublishAlertMessage'),
            [
                {text: t('common.cancel'), style: 'cancel'},
                {
                    text: t('profile.unpublish'),
                    style: 'destructive',
                    onPress: () => handleTogglePublish(placeDetails?.id, false),
                },
            ],
        );
    }

    async function handleTogglePublish(placeId: number | undefined, isPublished: boolean) {
        if (!placeId) return;
        try {
            setIsLoading(true);
            await api.placesControllerToggleStatus({placeId: placeId, isPublished: isPublished});
            router.dismissAll();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const [containerWidth, setContainerWidth] = useState(0);

    const numColumns = 3;
    const spacing = 10;

    const itemWidth =
        (containerWidth - spacing * (numColumns - 1)) / numColumns;


    function handleRefresh() {
        setIsRefreshing(true);
        fetchPlace();
        fetchPhotos();
        setIsRefreshing(false)
    }

    function openModalOnStep(step: UpdateStep) {
        setActiveStep(step);
        editModalRef.current?.open();
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: t('profile.manageListing'),
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    contentStyle: {backgroundColor: Theme.colors.background},
                    headerStyle: {backgroundColor: Theme.colors.background},
                }}
            />
            <ScrollView refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing}/>}>

                <AppView extraStyles={styles.actionMenu} withPadding>
                    {!placeDetails?.isPublished ?
                        <View>
                            <AppButton onPress={() => handleTogglePublish(placeDetails?.id, true)}
                                       extraStylesBtn={styles.actionButtons}
                                       icon="square.and.arrow.up"
                                       buttonType={ButtonType.PLAIN}
                                       fullRound
                                       confirmative>
                                {t('profile.publish')}
                            </AppButton>
                        </View> :
                        <Link asChild push href={`/listing/${placeDetails?.id}`}>
                            <AppButton
                                extraStylesBtn={styles.actionButtons}
                                icon="eye"
                                fullRound
                                buttonType={ButtonType.PLAIN}>{t('profile.preview')}</AppButton>
                        </Link>
                    }
                    <IconButton
                        color={Theme.colors.secondary}
                        size={24}
                        weight="regular"
                        extraStylesBtn={styles.settingsButton}
                        name="gearshape"
                        onPress={() => editModalRef.current?.open()}
                    />
                </AppView>


                {placeDetails &&
                    <InfoCard onPress={() => openModalOnStep(UpdateStep.FillPlaceInfo)}
                              label={t('profile.listingDetails')}>
                        <Text style={styles.placeName}>{placeDetails?.name}</Text>
                        <View style={styles.categoryTag}>
                            <CategoryTag category={placeDetails?.category}/>
                        </View>
                        <SingleInfo icon="location"
                                    info={`${placeDetails?.city}, ${COUNTRIES.get(placeDetails?.countryCode)?.countryName}`}/>
                        <SingleInfo icon="phone" info={placeDetails?.phoneNumber}/>
                        <SingleInfo icon="tag"
                                    info={!placeDetails.minPrice ? t('priceKind.NoPrice') : placeDetails?.minPrice === placeDetails?.maxPrice ? `${placeDetails?.minPrice} ${t('currency.' + COUNTRIES.get(placeDetails?.countryCode)?.currency)} / ${t('priceType.' + placeDetails?.priceType)} ` : `${placeDetails?.minPrice} - ${placeDetails?.maxPrice} ${t('currency.' + COUNTRIES.get(placeDetails?.countryCode)?.currency)} / ${t('priceType.' + placeDetails?.priceType)}`}/>
                        {placeDetails.description &&
                            <SingleInfo icon="text.justify.left" info={placeDetails?.description}/>
                        }
                    </InfoCard>
                }
                <InfoCard onPress={() => openModalOnStep(UpdateStep.UploadImages)} label={t('profile.gallery')}>
                    <View style={styles.imageContainer} onLayout={(event) => {
                        const {width} = event.nativeEvent.layout;
                        setContainerWidth(width);
                    }}>
                        {photos.length > 0 ? photos.map((p, i) => {
                            return (
                                <View style={styles.imageView} key={i}>
                                    <Image source={{uri: p.uri}} style={{width: itemWidth, height: itemWidth}}
                                           placeholder={p.blurhash}
                                           cachePolicy="disk"
                                           transition={200}/>
                                </View>
                            );
                        }) : <Text style={styles.notFoundText}>{t('profile.noImagesYet')}</Text>}
                    </View>
                </InfoCard>

                <View style={styles.dangerZoneContainer}>
                    {placeDetails?.isPublished &&
                        <>
                            <AppButton onPress={confirmUnpublish}
                                       buttonType={ButtonType.PLAIN}
                                       extraStylesTxt={{color: Theme.colors.secondary}}
                                       iconColor={Theme.colors.secondary}
                                       icon="square.and.arrow.down"
                                       fullWidth>
                                {t('profile.unpublishListing')}
                            </AppButton>
                            <LineSeparator verticalMargin={10}/>
                        </>
                    }
                    <AppButton onPress={confirmDelete}
                               buttonType={ButtonType.PLAIN}
                               extraStylesTxt={{color: Theme.colors.secondary}}
                               iconColor={Theme.colors.secondary}
                               icon="trash"
                               fullWidth>
                        {t('profile.deleteListing')}
                    </AppButton>
                </View>
            </ScrollView>

            <CreatePlaceModal initalStep={activeStep}
                              id={placeDetails?.id}
                              ref={editModalRef}
                              reloadPlaces={handleRefresh}/>
        </>
    );

    function InfoCard({children, label, rightElement, onPress}: {
        children: React.ReactNode,
        label: string,
        rightElement?: ReactNode
        destructive?: boolean,
        onPress?: () => void,
    }) {
        return (
            <AppView withPadding extraStyles={{paddingVertical: 10}}>
                <View style={infoCardStyles.containerHeader}>
                    <Text style={infoCardStyles.containerText}>
                        {label}
                    </Text>
                    {rightElement}

                </View>
                <AppPressable onPress={onPress}>
                    <View style={infoCardStyles.cardContainer}>
                        {children}
                    </View>
                </AppPressable>

            </AppView>
        );
    }
}


function SingleInfo({icon, info}: { icon: IconSymbolName, info: string }) {
    return (
        <View style={infoStyle.container}>
            <View style={infoStyle.iconWrapper}>
                <IconSymbol size={14} color={Theme.colors.primary} name={icon}/>
            </View>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={infoStyle.infoText}>{info}</Text>
        </View>
    );
}

const infoCardStyles = StyleSheet.create({
    containerHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
        paddingLeft: 15,
    },
    containerText: {
        color: Theme.colors.border,
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
    },
    cardContainer: {
        backgroundColor: Theme.colors.white,
        padding: 18,
        borderRadius: Theme.radius.xl,
        boxShadow: Theme.shadow.lg,
    },
});


const infoStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    iconWrapper: {
        backgroundColor: Theme.colors.iconBackground,
        padding: 8,
        borderRadius: Theme.radius.xs,
    },
    infoText: {
        maxWidth: '85%',
    },
});

const styles = StyleSheet.create({
    actionMenu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    actionButtons: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 14,
        boxShadow: Theme.shadow.lg,
    },
    settingsButton: {
        backgroundColor: 'transparent',
    },
    categoryTag: {
        marginVertical: 15,
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.lg,
    },


    headerRightBtn: {
        borderWidth: 1.5,
        borderColor: Theme.colors.secondary,
        borderRadius: Theme.radius.sm,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    headerRight: {
        color: Theme.colors.secondary,
        fontSize: Theme.sizes.sm,
        fontWeight: '600',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    imageView: {
        borderRadius: Theme.radius.sm,
        overflow: 'hidden',
    },
    dangerZoneContainer: {
        marginVertical: 30,
        gap: 10,
    },
    notFoundText: {
        width: '100%',
        textAlign: 'center',
        color: Theme.colors.gray.S500,
        fontSize: Theme.sizes.sm,
        fontStyle: 'italic',
    },


});

