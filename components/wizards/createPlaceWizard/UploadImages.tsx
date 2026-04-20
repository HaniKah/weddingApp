import {Dimensions, FlatList, Image, Pressable, StyleSheet, Text} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageUploadModel} from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";
import {useEffect, useState} from "react";
import {useApi} from "@/utils/api";
import {PhotosDto} from "@/types/open-api";
import WizardController from "@/components/wizards/WizardController";
import {Theme} from "@/styles/Theme";
import AppView from "@/components/appComponents/AppView";
import {IconSymbol} from "@/components/symbols/IconSymbol";

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


    useEffect(() => {
        const getPhotos = async () => {
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

        }
        getPhotos()
    }, [placeId, refresh]);


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
            <Image source={{uri: item.uri}} width={IMAGE_SIZE} height={IMAGE_SIZE} style={styles.image}/>
        )
    }

    function AddImageItem() {
        return (<Pressable onPress={pickImage} style={[styles.addImage, {width: IMAGE_SIZE, height: IMAGE_SIZE}]}>
            <IconSymbol weight="thin" size={50} color={Theme.colors.gray.S300} name="plus"/>
        </Pressable>)
    }

    function renderItem({item}: { item: PhotosDto }) {
        if (item.uri === "add") return <AddImageItem/>
        else return <ImageItem item={item}/>
    }

    // async function deleteImage(id: number) {
    //     try {
    //         const res = api.photos
    //     }
    //
    // }


    return (
        <>
            <AppView isLoading={isLoading} withPadding>
                <Text style={styles.title}>Upload photos</Text>

                <FlatList
                    numColumns={3}
                    columnWrapperStyle={{gap: IMAGE_GAP}}
                    data={[{uri: "add", ratio: 0}, ...images]}
                    renderItem={renderItem}
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
    image: {
        borderRadius: 10,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 50,
        width: "100%",
    },
});