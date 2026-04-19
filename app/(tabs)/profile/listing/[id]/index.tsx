import {Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Link, Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {useApi} from '@/utils/api';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {PhotosDto, VendorPlaceDetailsDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import {AppModalRef} from '@/components/appComponents/AppModal';
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import AppView from "@/components/appComponents/AppView";
import CategoryTag from "@/components/CategoryTag";
import {COUNTRIES} from "@/constants/countries";
import {IconSymbol, IconSymbolName} from "@/components/symbols/IconSymbol";
import CreatePlaceModal from "@/components/modals/CreatePlaceModal";

const IMAGE_GAP = 8;
const COLUMN_PER_ROW = 3;
const IMAGE_SIZE =
    (Dimensions.get('window').width - IMAGE_GAP * (COLUMN_PER_ROW - 1) - Theme.global.appPadding * 2) /
    COLUMN_PER_ROW;

export default function Place() {
    const {api} = useApi();
    const {id} = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const [placeDetails, setPlaceDetails] = useState<VendorPlaceDetailsDto>();
    const [isLoading, setIsLoading] = useState(false);
    const [photos, setPhotos] = useState<PhotosDto[]>([]);


    const editModalRef = useRef<AppModalRef>(null);

    useEffect(() => {
        fetchPlace();
        fetchPhotos();
    }, [id]);

    async function fetchPlace() {
        try {
            setIsLoading(true);
            const data = await api.placesControllerGetPlaceDetails({id: Number(id)});
            setPlaceDetails(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchPhotos() {
        try {
            setIsLoading(true);
            const res = await api.photosControllerGetPhotos(Number(id));
            setPhotos(res.data.result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    // async function handlePickImages() {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ['images'],
    //         allowsMultipleSelection: true,
    //         quality: 1,
    //     });
    //     if (result.canceled) return;
    //
    //     const [other, heic] = result.assets.reduce(
    //         ([pass, fail]: ImagePickerAsset[][], val) => {
    //             if (val.mimeType !== 'image/heic') pass.push(val);
    //             else fail.push(val);
    //             return [pass, fail];
    //         },
    //         [[], []],
    //     );
    //
    //     const converted: ImageUploadModel[] = await Promise.all(
    //         heic.map(async (asset) => {
    //             const img = await ImageManipulator.manipulate(asset.uri).renderAsync();
    //             const saved = await img.saveAsync({format: SaveFormat.JPEG});
    //             return {uri: saved.uri, type: 'image/jpeg', name: asset.fileName?.replace('heic', 'jpeg')};
    //         }),
    //     );
    //     const others: ImageUploadModel[] = other.map((asset) => ({
    //         uri: asset.uri,
    //         type: asset.mimeType,
    //         name: 'places' + asset.fileName,
    //     }));
    //
    //     const formData = new FormData();
    //     formData.append('placeId', id);
    //     [...others, ...converted].forEach((img) => {
    //         formData.append('file', {uri: img.uri, type: img.type, name: img.name} as any);
    //     });
    //
    //     try {
    //         await api.photosControllerUploadFile(formData);
    //         fetchPhotos();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    function confirmDelete() {
        Alert.alert(
            'Delete listing',
            'This will permanently delete your listing and all its photos. This cannot be undone.',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.placesControllerDeletePlace({id: Number(id)});
                            router.back();
                        } catch (err) {
                            console.error(err);
                        }
                    },
                },
            ],
        );
    }

    const [containerWidth, setContainerWidth] = useState(0);

    const numColumns = 3;
    const spacing = 10;

    const itemWidth =
        (containerWidth - spacing * (numColumns - 1)) / numColumns;


    return (
        <>
            <Stack.Screen
                options={{
                    title: "Manage listing",
                    headerShown: true,
                    headerTintColor: Theme.colors.secondary,
                    headerBackButtonDisplayMode: 'minimal',
                    contentStyle: {backgroundColor: Theme.colors.background},
                    headerStyle: {backgroundColor: Theme.colors.background},
                    headerRight: () => (
                        <Link asChild push href={`/(tabs)/(planner)/listing/${placeDetails?.id}`}>
                            <AppButton icon="eye" extraStylesBtn={{paddingHorizontal: 10}}
                                       buttonType={ButtonType.PLAIN}>Preview</AppButton>

                        </Link>

                    )

                }}
            />
            <AppView withPadding isLoading={isLoading}>
                <ScrollView>

                    {placeDetails &&
                        <InfoCard label="LISTING DETAILS"
                                  rightElement={
                                      <AppButton onPress={() => editModalRef.current?.open()} fullRound
                                                 buttonSize="SM" buttonType={ButtonType.OUTLINED}
                                                 icon="pencil">
                                          Edit
                                      </AppButton>}>
                            <Text style={styles.placeName}>{placeDetails?.name}</Text>
                            <View style={styles.categoryTag}>
                                <CategoryTag category={placeDetails?.category}/>
                            </View>
                            <SingleInfo icon="location"
                                        info={`${placeDetails?.city}, ${COUNTRIES.get(placeDetails?.countryCode)?.countryName}`}/>
                            <SingleInfo icon="phone" info={placeDetails?.phoneNumber}/>
                            <SingleInfo icon="tag"
                                        info={placeDetails?.minPrice === placeDetails?.maxPrice ? `${placeDetails?.minPrice} ${COUNTRIES.get(placeDetails?.countryCode)?.currency} / ${placeDetails?.priceType} ` : `${placeDetails?.minPrice} - ${placeDetails?.maxPrice} ${COUNTRIES.get(placeDetails?.countryCode)?.currency} / ${placeDetails?.priceType}`}/>
                            {placeDetails.description &&
                                <SingleInfo icon="text.justify.left" info={placeDetails?.description}/>
                            }
                        </InfoCard>
                    }
                    <InfoCard label="GALLERY">
                        <View style={styles.imageContainer} onLayout={(event) => {
                            const {width} = event.nativeEvent.layout;
                            setContainerWidth(width);
                        }}>
                            {photos.map((p, i) => {
                                return (
                                    <View style={styles.imageView} key={i}>
                                        <Image source={{uri: p.uri}} width={itemWidth} height={itemWidth}/>
                                    </View>
                                )
                            })}
                        </View>
                    </InfoCard>
                </ScrollView>
            </AppView>

            <CreatePlaceModal id={placeDetails?.id} ref={editModalRef} reloadPlaces={() => fetchPlace()}/>
        </>
    );
}

function SingleInfo({icon, info}: { icon: IconSymbolName, info: string }) {
    return (
        <View style={infoStyle.container}>
            <View style={infoStyle.iconWrapper}>
                <IconSymbol size={14} color={Theme.colors.primary} name={icon}/>
            </View>
            <Text numberOfLines={1} ellipsizeMode={"tail"} style={infoStyle.infoText}>{info}</Text>
        </View>
    )
}

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


})

function InfoCard({children, label, rightElement}: {
    children: React.ReactNode,
    label: string,
    rightElement?: ReactNode
}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.containerText}>
                    {label}
                </Text>
                {rightElement}

            </View>
            <View style={styles.cardContainer}>
                {children}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    containerHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,

    },
    categoryTag: {
        marginTop: 5,
        marginBottom: 10
    },
    placeName: {
        fontWeight: "bold",
        fontSize: Theme.sizes.lg
    },
    containerText: {
        color: Theme.colors.secondary,
        fontSize: Theme.sizes.sm,
    },
    cardContainer: {
        backgroundColor: Theme.colors.white,
        padding: 14,
        borderRadius: Theme.radius.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
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
    }

})

