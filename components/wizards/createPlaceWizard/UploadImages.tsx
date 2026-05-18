import {ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageUploadModel} from '@/components/wizards/createPlaceWizard/CreatePlaceWizard';
import {ImageManipulator, SaveFormat} from 'expo-image-manipulator';
import {useCallback, useEffect, useState} from 'react';
import {useApi} from '@/utils/api';
import {PhotosDto} from '@/types/open-api';
import WizardController from '@/components/wizards/WizardController';
import {Theme} from '@/styles/Theme';
import {IconButton} from '@/components/symbols/IconButton';
import AppView from '@/components/appComponents/AppView';
import {CommonStyles} from '@/styles/Common';
import {showSnackbar} from "@/components/Snackbar";
import AppButton from "@/components/appComponents/AppButton";

export default function UploadImages({onFinish, placeId}: {
    onFinish: () => void,
    placeId: number | undefined,
}) {
    const {api} = useApi();
    const [images, setImages] = useState<PhotosDto[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const IMAGE_GAP = 10;
    const COLUMN_PER_ROW = 3;
    const IMAGE_SIZE = (Dimensions.get('window').width - IMAGE_GAP * (COLUMN_PER_ROW - 1) - (Theme.global.appPadding * 2)) / COLUMN_PER_ROW;

    const getPhotos = useCallback(async () => {
        if (!placeId) return;
        try {
            setIsLoading(true);
            const res = await api.photosControllerGetPhotos(placeId);
            setImages(res.data.result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }, [placeId, refresh]);

    useEffect(() => {
        getPhotos();
    }, [getPhotos]);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        if (!result.canceled) {
            setIsLoading(true);
            const [other, heic] = splitByMimeType(result.assets); // special handle for heic files
            const convertedImages: ImageUploadModel[] = await convertHeicToJPEGAndCreateUploadModel(heic);
            const imagesFormdata: ImageUploadModel[] = [...createImageUploadModelForOther(other), ...convertedImages];
            await Promise.all(imagesFormdata.map(async (image) => {
                await uploadImages(image);
            }));

            setIsLoading(false);

            setRefresh((prev) => !prev);
        }
    };

    const splitByMimeType = (images: ImagePickerAsset[]) => {
        return images.reduce(([pass, fail]: ImagePickerAsset[][], val) => {
            if (val.mimeType !== 'image/heic') pass.push(val);
            else fail.push(val);
            return ([pass, fail]);
        }, [[], []]);

    };

    function convertHeicToJPEGAndCreateUploadModel(images: ImagePickerAsset[]): Promise<ImageUploadModel[]> {
        return Promise.all(images.map(async (asset, i) => {
            const image = await ImageManipulator.manipulate(asset.uri).renderAsync();
            const converted = await image.saveAsync({
                format: SaveFormat.JPEG,
            });
            // const existingName = asset.fileName?.split(".").pop()
            const newName = asset.fileName?.replace('heic', 'jpeg');
            return {
                uri: converted.uri,
                type: 'image/jpeg',
                name: newName,
            };
        }));
    }

    function createImageUploadModelForOther(images: ImagePickerAsset[]) {
        return images.map(asset => {
            return {
                uri: asset.uri,
                type: asset.mimeType,
                name: 'places' + asset.fileName,
            };
        });
    }

    async function uploadImages(newImage: ImageUploadModel) {
        if (!placeId) return;

        const file = constructRequest(placeId, newImage);
        try {
            const res = await api.photosControllerUploadFile(file);
            setImages(prev => [...prev, res.data]);
        } catch (err) {
            console.error(err);
            showSnackbar("Failed to upload image: ", "error")
        }
    }

    async function deleteImage(id: number) {
        if (!placeId) return;
        try {
            setIsLoading(true);
            console.log('deleting image :', id);
            await api.photosControllerDeletePhoto({id: id});
            setImages(prev => prev.filter(i => i.id !== id));
            // await getPhotos();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    function constructRequest(placeId: number, newImage: ImageUploadModel): FormData | undefined {
        const formData = new FormData();
        formData.append('placeId', placeId.toString());
        formData.append('file', {
            uri: newImage.uri,
            type: newImage.type,
            name: newImage.name,
        } as any);

        return formData;
    }


    function ImageItem({item}: { item: PhotosDto }) {
        return (
            <>
                <View style={styles.imageContainer}>
                    <View style={styles.xButton}>
                        <IconButton onPress={() => deleteImage(item.id)} size={10} name="xmark" color="black"/>
                    </View>
                    <Image source={{uri: item.uri}} style={[styles.image, {width: IMAGE_SIZE, height: IMAGE_SIZE}]}
                           placeholder={item.blurhash}
                           cachePolicy="memory-disk"
                           transition={200}
                           contentFit="cover"/>
                </View>
            </>

        );
    }

    function showSnackBars() {
        const snackbars = [
            {message: "This is a success snackbar", type: "success"},
            {message: "This is an error snackbar", type: "error"},
            {message: "This is a warning snackbar", type: "warning"},
            {message: "This is an info snackbar", type: "info"},
        ] as const;

        snackbars.forEach((snackbar, index) => {
            setTimeout(() => {
                showSnackbar(snackbar.message, snackbar.type);
            }, index * 1000);
        });
    }


    return (
        <>
            <AppView withPadding extraStyles={{position: 'relative'}}>
                <AppButton onPress={showSnackBars}>
                    show snakbar
                </AppButton>
                <Text style={styles.title}>Upload photos</Text>
                {
                    isLoading && <ActivityIndicator
                        style={styles.loadingOverlay}
                        size={'large'}/>
                }
                <FlatList
                    numColumns={3}
                    columnWrapperStyle={{gap: IMAGE_GAP}}
                    data={images}
                    renderItem={ImageItem}
                    contentContainerStyle={{gap: 10, paddingBottom: 200}}
                    ListEmptyComponent={<Text style={CommonStyles.dataNotFound}>You haven&#39;t uploaded any images yet,
                        click on
                        the plus button to add new
                        images</Text>}

                />

                <WizardController onNext={onFinish}
                                  isFirstStep={false}
                                  isLastStep={true}/>
                {/*<AppButton extraStylesBtn={styles.addButton} icon="plus"*/}
                {/*           onPress={pickImage} fullRound/>*/}
                <IconButton color={Theme.colors.white}
                            extraStylesBtn={styles.addButton}
                            onPress={pickImage}
                            name="plus"></IconButton>
            </AppView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addImage: {
        backgroundColor: Theme.colors.gray.S200,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        borderRadius: 10,
    },
    xButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        width: '100%',
    },
    addButton: {
        width: 55,
        height: 55,
        backgroundColor: Theme.colors.primary,
        boxShadow: Theme.effects.boxShadow,
        position: 'absolute',
        right: 10,
        bottom: 120,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Theme.colors.background,
        opacity: .8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
});