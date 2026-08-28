import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {ImageUploadModel} from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";
import {useApi} from "@/utils/api";
import {PhotosDto, VideosDto} from "@/types/open-api";
import {isAxiosError} from "axios";
import {showSnackbar} from "@/components/Snackbar";
import {NestError} from "@/types/errors";

// Listing photos don't need full-resolution source images. Downscaling the
// longest edge and re-encoding as JPEG shrinks a multi-MB photo to a few
// hundred KB with no visible quality loss, which is the main upload speedup.
const MAX_IMAGE_EDGE = 1920;
const JPEG_COMPRESSION = 0.7;

// Mirrors the backend's MAX_VIDEO_FILE_SIZE_BYTES / MAX_VIDEO_DURATION_MS
// (wedding-app-server/src/types/videos/videos.dto.ts). This is a client-side
// UX gate only — the server enforces the real limit.
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const MAX_VIDEO_DURATION_MS = 90 * 1000;

export type MediaUploadResult = {
    photos: PhotosDto[]
    videos: VideosDto[]
}

export function useUploadMedia() {
    const {api} = useApi()

    const pickMedia = async (placeId: number): Promise<MediaUploadResult | null> => {
        // No permissions request is necessary for launching the media library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', "videos"],
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

        const imageAssets = result.assets.filter(a => a.type !== 'video');
        const videoAssets = result.assets.filter(a => a.type === 'video');

        const oversizedVideos = videoAssets.filter(a =>
            (a.duration ?? 0) > MAX_VIDEO_DURATION_MS ||
            (a.fileSize ?? 0) > MAX_VIDEO_BYTES
        );
        if (oversizedVideos.length > 0) {
            showSnackbar(
                `${oversizedVideos.length} video(s) exceed the 100MB / 90s limit and were skipped`,
                "error"
            );
        }
        const validVideoAssets = videoAssets.filter(a => !oversizedVideos.includes(a));

        const [photos, videos] = await Promise.all([
            uploadImageAssets(placeId, imageAssets),
            uploadVideoAssets(placeId, validVideoAssets),
        ]);

        if (photos.length > 0 || videos.length > 0) {
            showSnackbar(`${photos.length + videos.length} item(s) uploaded successfully`, "success")
        }

        return {photos, videos}
    };

    async function uploadImageAssets(placeId: number, assets: ImagePickerAsset[]): Promise<PhotosDto[]> {
        if (assets.length === 0) return [];

        const imagesFormdata: ImageUploadModel[] = await Promise.all(
            assets.map(normalizeImageAsset)
        );

        const uploadedImages: PhotosDto[] = []
        let failed = 0;

        await Promise.all(imagesFormdata.map(async (image) => {
            try {
                const res = await uploadImage(placeId, image);
                uploadedImages.push(res)
            } catch (error) {
                failed++;
                if (isAxiosError<NestError>(error))
                    console.warn("Failed to upload image", error?.response?.data?.message)
            }
        }));

        if (failed > 0)
            showSnackbar(`Failed to upload ${failed} image(s)`, "error")

        return uploadedImages
    }

    async function uploadVideoAssets(placeId: number, assets: ImagePickerAsset[]): Promise<VideosDto[]> {
        if (assets.length === 0) return [];

        const uploadedVideos: VideosDto[] = []
        let failed = 0;

        await Promise.all(assets.map(async (asset) => {
            try {
                const res = await uploadVideo(placeId, asset);
                uploadedVideos.push(res)
            } catch (error) {
                failed++;
                if (isAxiosError<NestError>(error))
                    console.warn("Failed to upload video", error?.response?.data?.message)
            }
        }));

        if (failed > 0)
            showSnackbar(`Failed to upload ${failed} video(s)`, "error")

        return uploadedVideos
    }

    // Resizes the image so its longest edge is at most MAX_IMAGE_EDGE (only
    // when it exceeds it) and re-encodes to compressed JPEG.
    async function normalizeImageAsset(asset: ImagePickerAsset): Promise<ImageUploadModel> {
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

    function constructImageRequest(placeId: number, newImage: ImageUploadModel): FormData {
        const formData = new FormData();
        formData.append('placeId', placeId.toString());
        formData.append('file', {
            uri: newImage.uri,
            type: newImage.type,
            name: newImage.name,
        } as any);
        return formData;
    }

    async function uploadImage(placeId: number, newImage: ImageUploadModel) {
        const file = constructImageRequest(placeId, newImage);
        const res = await api.photosControllerUploadFile(placeId, file);
        return res.data
    }

    // No client-side compression for video: expo-image-manipulator doesn't
    // support it, and a native compressor is a real build-cost addition not
    // justified for v1. The picked asset is uploaded as-is (already gated by
    // the size/duration pre-check above).
    function constructVideoRequest(asset: ImagePickerAsset): FormData {
        const baseName = asset.fileName?.replace(/\.[^.]+$/, '') ?? `video_${asset.assetId ?? ''}`;
        const formData = new FormData();
        formData.append('file', {
            uri: asset.uri,
            type: asset.mimeType ?? 'video/mp4',
            name: `${baseName}.mp4`,
        } as any);
        return formData;
    }

    async function uploadVideo(placeId: number, asset: ImagePickerAsset) {
        const file = constructVideoRequest(asset);
        const res = await api.videosControllerUploadFile(placeId, file);
        return res.data
    }

    return {pickMedia}
}
