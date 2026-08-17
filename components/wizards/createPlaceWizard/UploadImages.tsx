import {ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {Dispatch, SetStateAction, useState} from 'react';
import {useApi} from '@/utils/api';
import {PhotosDto, VideosDto} from '@/types/open-api';
import WizardController from '@/components/wizards/WizardController';
import {Theme} from '@/styles/Theme';
import {IconButton} from '@/components/symbols/IconButton';
import AppView from '@/components/appComponents/AppView';
import {CommonStyles} from '@/styles/Common';
import AppPressable from "@/components/appComponents/AppPressable";
import AppImageViewer from "@/components/appComponents/AppImageViewer";
import AppVideoViewer from "@/components/appComponents/AppVideoViewer";
import {useUploadMedia} from "@/utils/uploadMedia";
import {showSnackbar} from "@/components/Snackbar";
import {isAxiosError} from "axios";
import {NestError} from "@/types/errors";
import {IconSymbol} from "@/components/symbols/IconSymbol";

type MediaItem =
    | {kind: 'photo', item: PhotosDto}
    | {kind: 'video', item: VideosDto}

export default function UploadImages({images, setImages, videos, setVideos, onFinish, placeId}: {
    images: PhotosDto[]
    setImages: Dispatch<SetStateAction<PhotosDto[]>>
    videos: VideosDto[]
    setVideos: Dispatch<SetStateAction<VideosDto[]>>
    onFinish: () => void,
    placeId: number,
}) {
    const {api} = useApi();
    const [isLoading, setIsLoading] = useState(false);

    const [activeImageId, setActiveImageId] = useState<number>();
    const [activeVideo, setActiveVideo] = useState<VideosDto>();


    const ITEM_GAP = 5;
    const COLUMN_PER_ROW = 3;
    const ITEM_SIZE = (Dimensions.get('window').width - ITEM_GAP * (COLUMN_PER_ROW - 1) - (Theme.global.appPadding * 2)) / COLUMN_PER_ROW;


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

    async function deleteVideo(id: number) {
        try {
            setIsLoading(true);
            await api.videosControllerDeleteVideo({id: id});
            setVideos(prev => prev.filter(v => v.id !== id));
            setActiveVideo(undefined);
            showSnackbar("video deleted successfully", "success");

        } catch (err) {
            if (isAxiosError<NestError>(err))
                showSnackbar("Error deleting video" + err?.response?.data.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    const mediaItems: MediaItem[] = [
        ...images.map((item): MediaItem => ({kind: 'photo', item})),
        ...videos.map((item): MediaItem => ({kind: 'video', item})),
    ];

    function MediaTile({item}: { item: MediaItem }) {
        if (item.kind === 'photo') {
            const photo = item.item;
            return (
                <AppPressable onPress={() => setActiveImageId(photo.id)}>
                    <View style={styles.imageContainer}>
                        {photo.isMain &&
                            <IconSymbol style={styles.mainSymbol}
                                        name="crown.fill"
                                        size={25}
                                        color={Theme.colors.white}
                            />}
                        <View style={styles.xButton}>
                            <IconButton onPress={() => deleteImage(photo.id)} size={10} name="xmark" color="black"/>
                        </View>
                        <Image source={{uri: photo.uri}} style={[styles.image, {
                            width: ITEM_SIZE,
                            height: ITEM_SIZE
                        }]}
                               placeholder={photo.blurhash}
                               cachePolicy="memory-disk"
                               transition={200}
                               contentFit="cover"/>
                    </View>
                </AppPressable>
            );
        }

        const video = item.item;
        return (
            <AppPressable onPress={() => setActiveVideo(video)}>
                <View style={styles.imageContainer}>
                    {video.isMain &&
                        <IconSymbol style={styles.mainSymbol}
                                    name="crown.fill"
                                    size={25}
                                    color={Theme.colors.white}
                        />}
                    <View style={styles.xButton}>
                        <IconButton onPress={() => deleteVideo(video.id)} size={10} name="xmark" color="black"/>
                    </View>
                    <Image source={video.posterUri ? {uri: video.posterUri} : undefined}
                           style={[styles.image, {
                               width: ITEM_SIZE,
                               height: ITEM_SIZE
                           }]}
                           placeholder={video.blurhash}
                           cachePolicy="memory-disk"
                           transition={200}
                           contentFit="cover"/>
                    <View style={styles.playBadge}>
                        <IconSymbol name="play.fill" size={12} color={Theme.colors.white}/>
                    </View>
                </View>
            </AppPressable>
        );
    }

    const {pickMedia} = useUploadMedia()

    async function uploadMedia() {
        setIsLoading(true);
        const result = await pickMedia(placeId)
        if (result) {
            // in case the user cancels the media selection it returns null
            setImages(prev => [...prev, ...result.photos])
            setVideos(prev => [...prev, ...result.videos])
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

    async function setMainVideo(videoId: number) {
        try {
            await api.videosControllerSetMain(videoId, placeId)
            setVideos((prev) => prev.map((v) => ({...v, isMain: v.id === videoId})))
            setActiveVideo((prev) => prev && {...prev, isMain: prev.id === videoId})
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <AppView withPadding extraStyles={styles.appView}>
                <Text style={styles.title}>Upload photos & videos</Text>
                {
                    isLoading && <ActivityIndicator
                        style={styles.loadingOverlay}
                        size={'large'}/>
                }

                <FlatList
                    numColumns={3}
                    columnWrapperStyle={{gap: ITEM_GAP}}
                    data={mediaItems}
                    keyExtractor={(m) => `${m.kind}-${m.item.id}`}
                    renderItem={MediaTile}
                    contentContainerStyle={{gap: 10, paddingBottom: 200}}
                    ListEmptyComponent={<Text style={CommonStyles.dataNotFound}>You haven&#39;t uploaded any photos
                        or videos yet, click on
                        the plus button to add new
                        media</Text>}

                />


                <WizardController onNext={onFinish}
                                  isFirstStep={false}
                                  isLastStep={true}/>

                <IconButton color={Theme.colors.white}
                            extraStylesBtn={styles.addButton}
                            onPress={uploadMedia}
                            name="plus"></IconButton>
                {activeImageId && placeId &&
                    <AppImageViewer
                        visible={!!activeImageId}
                        activeImageId={activeImageId}
                        setActiveImageId={setActiveImageId}
                        onDeleteImage={deleteImage}
                        placeId={placeId}
                        onSetMainImage={setMainImage}
                    />
                }
                {activeVideo &&
                    <AppVideoViewer
                        visible={!!activeVideo}
                        video={activeVideo}
                        onClose={() => setActiveVideo(undefined)}
                        onDeleteVideo={deleteVideo}
                        onSetMainVideo={setMainVideo}
                    />
                }

            </AppView>
        </>
    );
}
const styles = StyleSheet.create({
    appView: {
        position: 'relative',
    },
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
    playBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: Theme.radius.full,
        padding: 5,
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
