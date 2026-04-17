import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {useApi} from '@/utils/api';
import {useEffect, useRef, useState} from 'react';
import {VendorPlaceDetailsDto, PhotosDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import {COUNTRIES} from '@/constants/countries';
import PlaceInfo from '@/components/PlaceInfo';
import AppIf from '@/components/appComponents/AppIf';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import AppModal, {AppModalRef} from '@/components/appComponents/AppModal';
import AppView from '@/components/appComponents/AppView';
import CreatePlaceWizard from '@/components/wizards/createPlaceWizard/CreatePlaceWizard';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageManipulator, SaveFormat} from 'expo-image-manipulator';
import {ImageUploadModel} from '@/components/wizards/createPlaceWizard/CreatePlaceWizard';
import AppPressable from '@/components/appComponents/AppPressable';

const IMAGE_GAP = 8;
const COLUMN_PER_ROW = 3;
const IMAGE_SIZE =
    (Dimensions.get('window').width - IMAGE_GAP * (COLUMN_PER_ROW - 1) - Theme.global.appPadding * 2) /
    COLUMN_PER_ROW;

export default function Place() {
    const {api} = useApi();
    const {id} = useLocalSearchParams<{id: string}>();
    const router = useRouter();

    const [placeDetails, setPlaceDetails] = useState<VendorPlaceDetailsDto>();
    const [isLoading, setIsLoading] = useState(false);
    const [photos, setPhotos] = useState<PhotosDto[]>([]);
    const [isPhotosLoading, setIsPhotosLoading] = useState(false);

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
            setIsPhotosLoading(true);
            const res = await api.photosControllerGetPhotos(Number(id));
            setPhotos(res.data.result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsPhotosLoading(false);
        }
    }

    async function handlePickImages() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (result.canceled) return;

        const [other, heic] = result.assets.reduce(
            ([pass, fail]: ImagePickerAsset[][], val) => {
                if (val.mimeType !== 'image/heic') pass.push(val);
                else fail.push(val);
                return [pass, fail];
            },
            [[], []],
        );

        const converted: ImageUploadModel[] = await Promise.all(
            heic.map(async (asset) => {
                const img = await ImageManipulator.manipulate(asset.uri).renderAsync();
                const saved = await img.saveAsync({format: SaveFormat.JPEG});
                return {uri: saved.uri, type: 'image/jpeg', name: asset.fileName?.replace('heic', 'jpeg')};
            }),
        );
        const others: ImageUploadModel[] = other.map((asset) => ({
            uri: asset.uri,
            type: asset.mimeType,
            name: 'places' + asset.fileName,
        }));

        const formData = new FormData();
        formData.append('placeId', id);
        [...others, ...converted].forEach((img) => {
            formData.append('file', {uri: img.uri, type: img.type, name: img.name} as any);
        });

        try {
            await api.photosControllerUploadFile(formData);
            fetchPhotos();
        } catch (err) {
            console.error(err);
        }
    }

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

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    if (!placeDetails) return null;

    const currency = COUNTRIES.get(placeDetails.countryCode)?.currency;
    const isSamePrice = placeDetails.minPrice === placeDetails.maxPrice;
    const priceLabel = isSamePrice
        ? `${placeDetails.minPrice} ${currency}`
        : `${placeDetails.minPrice} - ${placeDetails.maxPrice} ${currency}`;
    const publishedColor = placeDetails.isPublished ? Theme.colors.green.S600 : Theme.colors.gray.S400;

    return (
        <>
            <Stack.Screen
                options={{
                    title: placeDetails.name,
                    headerShown: true,
                    headerTintColor: Theme.colors.primary,
                    headerBackButtonDisplayMode: 'minimal',
                }}
            />

            <ScrollView style={styles.container}>
                {/* Hero image */}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: placeDetails.mainPhoto}}/>
                    <View style={styles.badgeContainer}>
                        <View style={[styles.badge, {backgroundColor: publishedColor}]}>
                            <Text style={styles.badgeText}>
                                {placeDetails.isPublished ? 'Published' : 'Draft'}
                            </Text>
                        </View>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryBadgeText}>{placeDetails.category}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Name & location */}
                    <View style={styles.headerRow}>
                        <View style={styles.titleBlock}>
                            <Text style={styles.name}>{placeDetails.name}</Text>
                            <Text style={styles.location}>
                                {placeDetails.city},{' '}
                                {COUNTRIES.get(placeDetails.countryCode)?.countryName}
                            </Text>
                        </View>
                        <AppButton
                            buttonType={ButtonType.OUTLINED}
                            buttonSize="SM"
                            onPress={() => editModalRef.current?.open()}
                            icon="pencil"
                        >
                            Edit
                        </AppButton>
                    </View>

                    <View style={styles.divider}/>

                    {/* Price */}
                    <View style={styles.priceRow}>
                        <Text style={styles.sectionLabel}>Price</Text>
                        <Text style={styles.price}>{priceLabel}</Text>
                        <Text style={styles.priceType}>{placeDetails.priceType}</Text>
                    </View>

                    {/* Description */}
                    <AppIf value={placeDetails.description}>
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>About</Text>
                            <Text style={styles.description}>{placeDetails.description}</Text>
                        </View>
                    </AppIf>

                    {/* Contact */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Contact</Text>
                        <PlaceInfo iconName="phone.circle" info={placeDetails.phoneNumber}/>
                        <AppIf value={placeDetails.website}>
                            <PlaceInfo iconName="globe" info={placeDetails.website}/>
                        </AppIf>
                        <AppIf value={placeDetails.instagram}>
                            <PlaceInfo iconName="camera.circle" info={placeDetails.instagram}/>
                        </AppIf>
                        <AppIf value={placeDetails.facebook}>
                            <PlaceInfo iconName="person.crop.circle" info={placeDetails.facebook}/>
                        </AppIf>
                        <AppIf value={placeDetails.tiktok}>
                            <PlaceInfo iconName="music.note" info={placeDetails.tiktok}/>
                        </AppIf>
                    </View>

                    {/* Address */}
                    <AppIf value={placeDetails.streetName}>
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>Address</Text>
                            <PlaceInfo iconName="location.circle" info={placeDetails.streetName}/>
                        </View>
                    </AppIf>

                    <View style={styles.divider}/>

                    {/* Photos */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionLabel}>Photos</Text>
                            <AppButton
                                buttonType={ButtonType.PLAIN}
                                buttonSize="SM"
                                onPress={handlePickImages}
                                icon="plus"
                            >
                                Add
                            </AppButton>
                        </View>

                        {isPhotosLoading ? (
                            <ActivityIndicator style={{marginTop: 12}}/>
                        ) : photos.length === 0 ? (
                            <AppPressable onPress={handlePickImages}>
                                <View style={styles.emptyPhotos}>
                                    <IconSymbol
                                        name="photo.on.rectangle"
                                        size={32}
                                        color={Theme.colors.gray.S400}
                                        weight="thin"
                                    />
                                    <Text style={styles.emptyPhotosText}>Tap to add photos</Text>
                                </View>
                            </AppPressable>
                        ) : (
                            <FlatList
                                scrollEnabled={false}
                                numColumns={3}
                                columnWrapperStyle={{gap: IMAGE_GAP}}
                                contentContainerStyle={{gap: IMAGE_GAP}}
                                data={photos}
                                keyExtractor={(_, i) => i.toString()}
                                renderItem={({item}) => (
                                    <Image
                                        source={{uri: item.uri}}
                                        width={IMAGE_SIZE}
                                        height={IMAGE_SIZE}
                                        style={styles.photo}
                                    />
                                )}
                            />
                        )}
                    </View>

                    <View style={styles.divider}/>

                    {/* Delete */}
                    <View style={styles.deleteSection}>
                        <AppButton
                            fullWidth
                            buttonType={ButtonType.PRIMARY}
                            destructive
                            onPress={confirmDelete}
                        >
                            Delete listing
                        </AppButton>
                    </View>
                </View>
            </ScrollView>

            {/* Edit modal */}
            <AppModal ref={editModalRef} presentationStyle="fullScreen" allowSwipeDismissal={false}>
                <AppView>
                    <CreatePlaceWizard
                        onFinish={() => {
                            editModalRef.current?.close();
                            fetchPlace();
                        }}
                    />
                </AppView>
            </AppModal>
        </>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Theme.colors.white,
    },
    imageContainer: {
        height: 280,
        position: 'relative',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    badgeContainer: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Theme.radius.full,
    },
    badgeText: {
        color: Theme.colors.white,
        fontSize: Theme.sizes.xs,
        fontWeight: '600',
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Theme.radius.full,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    categoryBadgeText: {
        color: Theme.colors.white,
        fontSize: Theme.sizes.xs,
        fontWeight: '500',
    },
    content: {
        padding: Theme.global.appPadding,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 8,
        gap: 12,
    },
    titleBlock: {
        flex: 1,
        gap: 4,
    },
    name: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.black,
    },
    location: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.gray.S500,
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.gray.S200,
        marginVertical: 16,
    },
    priceRow: {
        gap: 4,
        marginBottom: 16,
    },
    price: {
        fontSize: Theme.sizes.lg,
        fontWeight: 'bold',
        color: Theme.colors.black,
    },
    priceType: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.gray.S500,
    },
    section: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: Theme.sizes.xs,
        fontWeight: '600',
        color: Theme.colors.gray.S500,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 8,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    description: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.gray.S700,
        lineHeight: 22,
    },
    emptyPhotos: {
        height: 100,
        backgroundColor: Theme.colors.gray.S100,
        borderRadius: Theme.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    emptyPhotosText: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.gray.S400,
    },
    photo: {
        borderRadius: Theme.radius.sm,
    },
    deleteSection: {
        marginBottom: 40,
    },
});