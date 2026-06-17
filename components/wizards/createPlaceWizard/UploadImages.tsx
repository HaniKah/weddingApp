import {ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {Dispatch, SetStateAction, useState} from 'react';
import {useApi} from '@/utils/api';
import {PhotosDto} from '@/types/open-api';
import WizardController from '@/components/wizards/WizardController';
import {Theme} from '@/styles/Theme';
import {IconButton} from '@/components/symbols/IconButton';
import AppView from '@/components/appComponents/AppView';
import {CommonStyles} from '@/styles/Common';
import AppPressable from "@/components/appComponents/AppPressable";
import AppImageViewer from "@/components/appComponents/AppImageViewer";
import {useUploadImage} from "@/utils/uploadImages";
import {showSnackbar} from "@/components/Snackbar";
import {isAxiosError} from "axios";
import {NestError} from "@/types/errors";
import {IconSymbol} from "@/components/symbols/IconSymbol";

export default function UploadImages({images, setImages, onFinish, placeId}: {
    images: PhotosDto[]
    setImages: Dispatch<SetStateAction<PhotosDto[]>>
    onFinish: () => void,
    placeId: number,
}) {
    const {api} = useApi();
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [activeId, setActiveId] = useState<number>();


    const IMAGE_GAP = 5;
    const COLUMN_PER_ROW = 3;
    const IMAGE_SIZE = (Dimensions.get('window').width - IMAGE_GAP * (COLUMN_PER_ROW - 1) - (Theme.global.appPadding * 2)) / COLUMN_PER_ROW;


    async function deleteImage(id: number) {
        try {
            setIsLoading(true);
            await api.photosControllerDeletePhoto({id: id});
            setImages(prev => prev.filter(i => i.id !== id));
            showSnackbar("image deleted successfully", "success");

        } catch (err) {
            if (isAxiosError<NestError>(err))
                showSnackbar("Error deleting image" + err?.response?.data.message, "error");
        } finally {
            setIsLoading(false);
        }
    }


    function ImageItem({item}: { item: PhotosDto }) {
        return (
            <>
                <AppPressable onPress={() => setActiveId(item.id)}>
                    <View style={styles.imageContainer}>
                        {item.isMain &&
                            <IconSymbol style={styles.mainSymbol}
                                        name="crown.fill"
                                        size={25}
                                        color={Theme.colors.white}
                            />}
                        <View style={styles.xButton}>
                            <IconButton onPress={() => deleteImage(item.id)} size={10} name="xmark" color="black"/>
                        </View>
                        <Image source={{uri: item.uri}} style={[styles.image, {
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE
                        }]}
                               placeholder={item.blurhash}
                               cachePolicy="memory-disk"
                               transition={200}
                               contentFit="cover"/>
                    </View>
                </AppPressable>
            </>

        );
    }

    const {pickImage} = useUploadImage()

    async function uploadPhoto() {
        setIsLoading(true);
        const uploadedImages = await pickImage(placeId)
        if (uploadedImages) {
            // in case the user cancels the image selection it returns null
            setImages(prev => [...prev, ...uploadedImages])
        }
        setIsLoading(false);
    }

    async function setMainImage(photoId: number) {
        try {
            await api.photosControllerSetMain(photoId, placeId)
            setImages((prev) => prev.map((i) => ({...i, isMain: i.id === photoId})))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <AppView withPadding extraStyles={{position: 'relative'}}>
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

                <IconButton color={Theme.colors.white}
                            extraStylesBtn={styles.addButton}
                            onPress={uploadPhoto}
                            name="plus"></IconButton>
                {activeId && placeId &&
                    <AppImageViewer
                        visible={!!activeId}
                        activeImageId={activeId}
                        setActiveImageId={setActiveId}
                        onDeleteImage={deleteImage}
                        placeId={placeId}
                        onSetMainImage={setMainImage}
                    />
                }

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
    mainSymbol: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 10,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        width: '100%',
    },
    addButton: {
        width: 55,
        height: 55,
        backgroundColor: Theme.colors.primary,
        boxShadow: Theme.shadow.lg,
        position: 'absolute',
        right: 10,
        bottom: 120,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: Theme.colors.background,
        opacity: .8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
});