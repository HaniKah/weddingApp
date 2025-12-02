import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import AppButton from "@/components/appComponents/AppButton";
import {ImageUploadModel} from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";
import {useState} from "react";
import {VendorPlaceDetailsViewModel} from "@/types/open-api";
import {useApi} from "@/utils/api";

export default function UploadImages({data, setData, onFinish}: {
    data: VendorPlaceDetailsViewModel | undefined,
    setData: (data: VendorPlaceDetailsViewModel) => void,
    onFinish: () => void,
}) {

    const API = useApi()

    const [images, setImages] = useState<ImageUploadModel[] | undefined>()

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
            setImages(imagesFormdata)
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

    async function uploadImages() {
        if (!data?.place.placeId) return
        const files = constructImagesRequest(data.place.placeId)
        if (!files) return
        await API.photosControllerUploadFile(files)
    }

    function constructImagesRequest(placeId: number): FormData | undefined {
        const formData = new FormData();
        formData.append('placeId', placeId.toString())
        images?.map((asset, i) => {
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: asset.name,
            } as any)
        })
        return formData
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage}/>
            <View>
                <Text>before conversion</Text>
                {images?.map((img, i) => {
                    return (
                        <View key={i}>
                            {/*<Image source={{uri: img.uri}} style={styles.image}/>*/}
                            <Text>{img.type}</Text>
                        </View>
                    )
                })}
                <AppButton onPress={onFinish}>finish</AppButton>
            </View>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});