import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageUploadModel} from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";
import {useCallback, useEffect, useState} from "react";
import {useApi} from "@/utils/api";
import {PhotosDto} from "@/types/open-api";
import WizardController from "@/components/wizards/WizardController";
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import AppView from "@/components/appComponents/AppView";
import AppButton from "@/components/appComponents/AppButton";

export default function UploadImages({onFinish, placeId}: {
    onFinish: () => void,
    placeId: number | undefined,
}) {
    const {api} = useApi()
    const [images, setImages] = useState<PhotosDto[]>([])
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const IMAGE_GAP = 10
    const COLUMN_PER_ROW = 3
    const IMAGE_SIZE = (Dimensions.get("window").width - IMAGE_GAP * (COLUMN_PER_ROW - 1) - (Theme.global.appPadding * 2)) / COLUMN_PER_ROW

    const getPhotos = useCallback(async () => {
        if (!placeId) return
        try {
            setIsLoading(true)
            const res = await api.photosControllerGetPhotos(placeId)
            setImages(res.data.result)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }

    }, [placeId, refresh])

    useEffect(() => {
        getPhotos()
    }, [getPhotos]);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const [other, heic] = splitByMimeType(result.assets) // special handle for heic files
            const convertedImages: ImageUploadModel[] = await convertHeicToJPEGAndCreateUploadModel(heic)
            const imagesFormdata: ImageUploadModel[] = [...createImageUploadModelForOther(other), ...convertedImages]
            await uploadImages(imagesFormdata)
            setRefresh((prev) => !prev)
        }
    };

    const splitByMimeType = (images: ImagePickerAsset[]) => {
        return images.reduce(([pass, fail]: ImagePickerAsset[][], val) => {
            if (val.mimeType !== "image/heic") pass.push(val)
            else fail.push(val)
            return ([pass, fail])
        }, [[], []])

    }

    function convertHeicToJPEGAndCreateUploadModel(images: ImagePickerAsset[]): Promise<ImageUploadModel[]> {
        return Promise.all(images.map(async (asset, i) => {
            const image = await ImageManipulator.manipulate(asset.uri).renderAsync()
            const converted = await image.saveAsync({
                format: SaveFormat.JPEG
            })
            // const existingName = asset.fileName?.split(".").pop()
            const newName = asset.fileName?.replace("heic", "jpeg")
            return {
                uri: converted.uri,
                type: "image/jpeg",
                name: newName
            }
        }))
    }

    function createImageUploadModelForOther(images: ImagePickerAsset[]) {
        return images.map(asset => {
            return {
                uri: asset.uri,
                type: asset.mimeType,
                name: "places" + asset.fileName
            }
        })
    }

    async function uploadImages(newImages: ImageUploadModel[]) {
        if (!placeId) return
        const files = constructRequest(placeId, newImages)
        if (newImages.length <= 0) return
        console.log("uploading images :", files)
        await api.photosControllerUploadFile(files)

    }

    async function deleteImage(id: number) {
        if (!placeId) return
        try {
            console.log("deleting image :", id)
            await api.photosControllerDeletePhoto({id: id})
            await getPhotos()
        } catch (err) {
            console.error(err)
        }
    }

    function constructRequest(placeId: number, newImages: ImageUploadModel[]): FormData | undefined {
        const formData = new FormData();
        formData.append('placeId', placeId.toString())
        newImages?.map((asset, i) => {
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: asset.name,
            } as any)
        })
        return formData
    }


    function handleFinishPress() {
        onFinish()
    }

    function ImageItem({item}: { item: PhotosDto }) {
        return (
            <>
                <View style={styles.imageContainer}>
                    <View style={styles.xButton}>
                        <IconButton onPress={() => deleteImage(item.id)} size={10} name="xmark" color="black"/>
                    </View>
                    <Image source={{uri: item.uri}} width={IMAGE_SIZE} height={IMAGE_SIZE} style={styles.image}/>
                </View>
            </>

        )
    }

    // function AddImageItem() {
    //     return (<Pressable onPress={pickImage} style={[styles.addImage, {width: IMAGE_SIZE, height: IMAGE_SIZE}]}>
    //         <IconSymbol weight="thin" size={50} color={Theme.colors.gray.S300} name="plus"/>
    //     </Pressable>)
    // }

    // function renderItem({item}: { item: PhotosDto }) {
    //     if (item.uri === "add") return <AddImageItem/>
    //     else return <ImageItem item={item}/>
    // }


    return (
        <>
            <AppView withPadding isLoading={isLoading}>
                <Text style={styles.title}>Upload photos</Text>
                <AppButton buttonSize="SM" onPress={pickImage} extraStylesBtn={{marginBottom: 15}}>
                    Add new +
                </AppButton>

                <FlatList
                    numColumns={3}
                    columnWrapperStyle={{gap: IMAGE_GAP}}
                    data={images}
                    renderItem={ImageItem}
                    contentContainerStyle={{gap: 10}}
                />

                <WizardController onNext={handleFinishPress}
                                  isFirstStep={false}
                                  isLastStep={true}/>
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        borderRadius: 10,
    },
    xButton: {
        position: "absolute",
        top: 5,
        right: 5,
        zIndex: 10,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        width: "100%",
    },
});