import {useApi} from "@/utils/api";
import {PhotosDto, PhotoSize, VideosDto} from "@/types/open-api";
import {useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable, StyleSheet, View} from "react-native";
import {Image} from "expo-image";
import AppMediaViewer, {MediaItem} from "@/components/appComponents/AppMediaViewer";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";

export default function Gallery({placeId}: { placeId: number }) {
    const API = useApi().api
    const [thumbnails, setThumbnails] = useState<PhotosDto[]>([])
    const [fullImages, setFullImages] = useState<PhotosDto[]>([])
    const [videos, setVideos] = useState<VideosDto[]>([])
    const [activeKey, setActiveKey] = useState<string>()
    const GAP = 5;
    const IMAGE_WIDTH = (Dimensions.get("window").width - (GAP * 4)) / 3;

    useEffect(() => {
        const getMedia = async () => {
            try {
                const [thumbnailsRes, fullImagesRes, videosRes] = await Promise.all([
                    API.photosControllerGetAllPhotos(placeId, PhotoSize.Thumbnail),
                    API.photosControllerGetAllPhotos(placeId, PhotoSize.Image),
                    API.videosControllerGetAllVideos(placeId),
                ]);
                setThumbnails(thumbnailsRes.data.result)
                setFullImages(fullImagesRes.data.result)
                setVideos(videosRes.data.result)
            } catch (err) {
                console.error(err)
            }
        }
        getMedia()
    }, [placeId]);

    const thumbnailItems: MediaItem[] = [
        ...thumbnails.map((item): MediaItem => ({kind: 'photo', item})),
        ...videos.map((item): MediaItem => ({kind: 'video', item})),
    ];

    const viewerMediaItems: MediaItem[] = [
        ...fullImages.map((item): MediaItem => ({kind: 'photo', item})),
        ...videos.map((item): MediaItem => ({kind: 'video', item})),
    ];

    function MediaThumbnail({item}: { item: MediaItem }) {
        if (item.kind === 'photo') {
            const photo = item.item;
            return (
                <Pressable onPress={() => setActiveKey(`photo-${photo.id}`)}>
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
            <Pressable onPress={() => setActiveKey(`video-${video.id}`)}>
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
                      data={thumbnailItems}
                      keyExtractor={(item) => `${item.kind}-${item.item.id}`}
                      contentContainerStyle={{padding: GAP, gap: GAP}}
                      columnWrapperStyle={{gap: GAP}}
                      getItemLayout={(data, index) => (
                          {length: IMAGE_WIDTH + GAP, offset: (IMAGE_WIDTH + GAP) * index, index}
                      )}
                      renderItem={({item}) => (<MediaThumbnail item={item}/>)}/>

            <AppMediaViewer visible={!!activeKey}
                             mediaItems={viewerMediaItems}
                             activeKey={activeKey}
                             setActiveKey={setActiveKey}/>
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
