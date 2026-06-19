import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageUploadModel} from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";
import {useApi} from "@/utils/api";
import {PhotosDto} from "@/types/open-api";
import {isAxiosError} from "axios";
import {showSnackbar} from "@/components/Snackbar";
import {NestError} from "@/types/errors";

// Listing photos don't need full-resolution source images. Downscaling the
// longest edge and re-encoding as JPEG shrinks a multi-MB photo to a few
// hundred KB with no visible quality loss, which is the main upload speedup.
const MAX_IMAGE_EDGE = 1920;
const JPEG_COMPRESSION = 0.7;

export function useUploadImage() {
    const {api} = useApi()

    const pickImage = async (placeId: number): Promise<PhotosDto[] | null> => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            // The real compression happens in normalizeAsset; a lower picker
            // quality just avoids decoding a needlessly huge source buffer.
            quality: 0.8,
        });

        if (result.canceled) {
            return null
        }

        // Normalize every asset (resize + JPEG re-encode). This also handles
        // HEIC for free since the manipulator always outputs JPEG.
        const imagesFormdata: ImageUploadModel[] = await Promise.all(
            result.assets.map(normalizeAsset)
        );

        const uploadedImages: PhotosDto[] = []
        let failed = 0;

        await Promise.all(imagesFormdata.map(async (image) => {
            try {
                const res = await uploadImages(placeId, image);
                uploadedImages.push(res)
            } catch (error) {
                failed++;
                if (isAxiosError<NestError>(error))
                    console.warn("Failed to upload image", error?.response?.data?.message)
            }
        }));

        if (uploadedImages.length > 0)
            showSnackbar(`${uploadedImages.length} image(s) uploaded successfully`, "success")
        if (failed > 0)
            showSnackbar(`Failed to upload ${failed} image(s)`, "error")

        return uploadedImages
    };

    // Resizes the image so its longest edge is at most MAX_IMAGE_EDGE (only
    // when it exceeds it) and re-encodes to compressed JPEG.
    async function normalizeAsset(asset: ImagePickerAsset): Promise<ImageUploadModel> {
        let context = ImageManipulator.manipulate(asset.uri);

        // resize() preserves the aspect ratio when only one dimension is
        // given, so we constrain whichever edge is the longest.
        const isLandscape = (asset.width ?? 0) >= (asset.height ?? 0);
        const longestEdge = Math.max(asset.width ?? 0, asset.height ?? 0);
        if (longestEdge > MAX_IMAGE_EDGE) {
            context = context.resize(
                isLandscape ? {width: MAX_IMAGE_EDGE} : {height: MAX_IMAGE_EDGE}
            );
        }

        const image = await context.renderAsync();
        const converted = await image.saveAsync({
            format: SaveFormat.JPEG,
            compress: JPEG_COMPRESSION,
        });

        const baseName = asset.fileName?.replace(/\.[^.]+$/, '') ?? `image_${asset.assetId ?? ''}`;
        return {
            uri: converted.uri,
            type: 'image/jpeg',
            name: `places${baseName}.jpeg`,
        };
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
