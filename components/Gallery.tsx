import {useApi} from "@/utils/api";
import {PhotosDto, PhotoSize, VideosDto} from "@/types/open-api";
import {useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable, StyleSheet, View} from "react-native";
import {Image} from "expo-image";
import AppImageViewer from "@/components/appComponents/AppImageViewer";
import AppVideoViewer from "@/components/appComponents/AppVideoViewer";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";

type MediaItem =
    | {kind: 'photo', item: PhotosDto}
    | {kind: 'video', item: VideosDto}

export default function Gallery({placeId}: { placeId: number }) {
    const API = useApi().api
    const [images, setImages] = useState<PhotosDto[]>([])
    const [videos, setVideos] = useState<VideosDto[]>([])
    const [selectedImage, setSelectedImage] = useState<number>()
    const [selectedVideo, setSelectedVideo] = useState<VideosDto>()
    const GAP = 5;
    const IMAGE_WIDTH = (Dimensions.get("window").width - (GAP * 4)) / 3;

    useEffect(() => {
        const getMedia = async () => {
            try {
                const [photosRes, videosRes] = await Promise.all([
                    API.photosControllerGetAllPhotos(placeId, PhotoSize.Thumbnail),
                    API.videosControllerGetAllVideos(placeId),
                ]);
                setImages(photosRes.data.result)
                setVideos(videosRes.data.result)
            } catch (err) {
                console.error(err)
            }
        }
        getMedia()
    }, [placeId]);

    const mediaItems: MediaItem[] = [
        ...images.map((item): MediaItem => ({kind: 'photo', item})),
        ...videos.map((item): MediaItem => ({kind: 'video', item})),
    ];

    function MediaThumbnail({item}: { item: MediaItem }) {
        if (item.kind === 'photo') {
            const photo = item.item;
            return (
                <Pressable onPress={() => setSelectedImage(photo.id)}>
                    <Image style={{height: IMAGE_WIDTH, width: IMAGE_WIDTH}}
                           source={{uri: photo.uri}}
                           transition={200}
                           placeholder={photo.blurhash}
                           cachePolicy="disk"
                           contentFit="cover"/>
                </Pressable>
            )
        }

        const video = item.item;
        return (
            <Pressable onPress={() => setSelectedVideo(video)}>
                <View style={{height: IMAGE_WIDTH, width: IMAGE_WIDTH}}>
                    <Image style={{height: IMAGE_WIDTH, width: IMAGE_WIDTH}}
                           source={video.posterUri ? {uri: video.posterUri} : undefined}
                           transition={200}
                           placeholder={video.blurhash}
                           cachePolicy="disk"
                           contentFit="cover"/>
                    <View style={styles.playBadge}>
                        <IconSymbol name="play.fill" size={14} color={Theme.colors.white}/>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <>
            <FlatList numColumns={3}
                      data={mediaItems}
                      keyExtractor={(item) => `${item.kind}-${item.item.id}`}
                      contentContainerStyle={{padding: GAP, gap: GAP}}
                      columnWrapperStyle={{gap: GAP}}
                      getItemLayout={(data, index) => (
                          {length: IMAGE_WIDTH + GAP, offset: (IMAGE_WIDTH + GAP) * index, index}
                      )}
                      renderItem={({item}) => (<MediaThumbnail item={item}/>)}/>

            <AppImageViewer visible={!!selectedImage} activeImageId={selectedImage} setActiveImageId={setSelectedImage}
                            placeId={placeId}/>

            <AppVideoViewer visible={!!selectedVideo} video={selectedVideo}
                            onClose={() => setSelectedVideo(undefined)}/>

        </>
    )
}

const styles = StyleSheet.create({
    playBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: Theme.radius.full,
        padding: 5,
    },
});
