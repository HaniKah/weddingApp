import {ActivityIndicator, Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useEffect, useRef, useState} from "react";
import {PhotosDto} from "@/types/open-api";
import {useApi} from "@/utils/api";

export default function AppImageViewer({isVisible, onClose, ids, activeId}: {
    isVisible: boolean,
    onClose: () => void,
    ids: number[],
    activeId: number

}) {
    const {width} = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const {api} = useApi()

    const [images, setImages] = useState<Record<number, PhotosDto>>({})
    const [currentActiveId, setCurrentActiveId] = useState(activeId)
    const isFetching = useRef<Record<number, boolean>>({})

    const fetchPhotos = async (targetId: number) => {
        const currentIndex = ids.indexOf(targetId);
        if (currentIndex === -1) return;

        // Determine the range of IDs to fetch: 2 before and 2 after
        const start = Math.max(0, currentIndex - 2);
        const end = Math.min(ids.length - 1, currentIndex + 2);
        const idsToFetch = ids.slice(start, end + 1);

        const newPhotos: Record<number, PhotosDto> = {...images};
        let hasNew = false;

        await Promise.all(idsToFetch.map(async (id) => {
            if (!newPhotos[id] && !isFetching.current[id]) {
                isFetching.current[id] = true;
                try {
                    const res = await api.photosControllerGetPhoto(id);
                    newPhotos[id] = res.data;
                    hasNew = true;
                } catch (error) {
                    console.error(`Failed to fetch photo ${id}`, error);
                } finally {
                    delete isFetching.current[id];
                }
            }
        }));

        if (hasNew) {
            setImages(newPhotos);
        }
    }

    useEffect(() => {
        setCurrentActiveId(activeId)
    }, [activeId])

    useEffect(() => {
        fetchPhotos(currentActiveId)
    }, [currentActiveId])

    function ImageHeader() {
        return (
            <>
                <View style={styles.headerContainer}>
                    <Pressable onPress={onClose}>
                        <IconSymbol color="white" size={25} name="xmark"/>
                    </Pressable>
                </View>
            </>
        );
    }

    return (
        <>
            <Modal
                allowSwipeDismissal={true}
                visible={isVisible}
                onRequestClose={onClose}
                animationType="none">
                <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: 'black'}}>
                    <ImageViewer
                        pageAnimateTime={300}
                        renderHeader={ImageHeader}
                        onSwipeDown={() => onClose()}
                        index={ids.indexOf(activeId)}
                        enableSwipeDown={true}
                        onChange={(index) => index !== undefined && setCurrentActiveId(ids[index])}
                        loadingRender={() => <ActivityIndicator color="white" size="large"/>}
                        imageUrls={ids.map((id) => {
                            const photo = images[id];
                            return {
                                url: photo?.uri || '',
                                width: width,
                                height: photo ? width / photo.ratio : width,
                                props: {
                                    cachePolicy: 'disk'
                                }
                            };
                        })}>

                    </ImageViewer>
                </View>

            </Modal>
        </>
    );
}
const styles = StyleSheet.create({

    headerContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 20,
        paddingHorizontal: 20,
    },


});