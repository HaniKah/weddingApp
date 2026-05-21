import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageUploadModel} from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";
import {useApi} from "@/utils/api";
import {PhotosDto} from "@/types/open-api";
import {isAxiosError} from "axios";
import {showSnackbar} from "@/components/Snackbar";
import {NestError} from "@/types/errors";


export function useUploadImage() {
    const {api} = useApi()

    const pickImage = async (placeId: number): Promise<PhotosDto[] | null> => {
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
            let uploadedImages: PhotosDto[] = []
            const [other, heic] = splitByMimeType(result.assets); // special handle for heic files
            const convertedImages: ImageUploadModel[] = await convertHeicToJPEGAndCreateUploadModel(heic);
            const imagesFormdata: ImageUploadModel[] = [...createImageUploadModelForOther(other), ...convertedImages];

            await Promise.all(imagesFormdata.map(async (image) => {
                try {
                    const res = await uploadImages(placeId, image);
                    uploadedImages.push(res)
                    showSnackbar("Image uploaded successfully", "success")
                } catch (error) {
                    if (isAxiosError<NestError>(error))
                        showSnackbar("Failed to upload image" + error?.response?.data?.message, "error")
                }
            }));
            return uploadedImages
        } else {

            return null
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

    async function uploadImages(placeId: number, newImage: ImageUploadModel) {
        const file = constructRequest(placeId, newImage);
        const res = await api.photosControllerUploadFile(placeId, file);
        return res.data
    }

    return {pickImage}
}