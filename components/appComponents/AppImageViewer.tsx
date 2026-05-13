import {ActivityIndicator, Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
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

    const idToIndex = useMemo(() => {
        return ids.reduce<Record<number, number>>((acc, id, index) => {
            acc[id] = index;
            return acc;
        }, {});
    }, [ids]);

    const activeIndex = idToIndex[activeId] ?? 0;

    const imageUrls = useMemo(() => {
        return ids.map((id) => {
            const photo = images[id];

            return {
                url: photo?.uri || '',
                width,
                height: width / photo?.ratio || width,
                props: {
                    cachePolicy: 'disk',
                },
            };
        });
    }, [ids, images, width]);

    const fetchPhotos = useCallback(async (targetId: number) => {
        const currentIndex = idToIndex[targetId];
        if (currentIndex === undefined) return;

        const start = Math.max(0, currentIndex - 2);
        const end = Math.min(ids.length - 1, currentIndex + 2);
        const idsToFetch = ids.slice(start, end + 1);

        const fetchedPhotos: Record<number, PhotosDto> = {};

        await Promise.all(idsToFetch.map(async (id) => {
            if (!images[id] && !isFetching.current[id]) {
                isFetching.current[id] = true;

                try {
                    const res = await api.photosControllerGetPhoto(id);
                    fetchedPhotos[id] = res.data;
                } catch (error) {
                    console.error(`Failed to fetch photo ${id}`, error);
                } finally {
                    delete isFetching.current[id];
                }
            }
        }));

        if (Object.keys(fetchedPhotos).length > 0) {
            setImages((prevImages) => ({
                ...prevImages,
                ...fetchedPhotos,
            }));
        }
    }, [api, idToIndex, ids, images]);

    useEffect(() => {
        setCurrentActiveId(activeId)
    }, [activeId])

    useEffect(() => {
        if (!isVisible) return;

        fetchPhotos(currentActiveId)
    }, [currentActiveId, fetchPhotos, isVisible])

    const renderHeader = useCallback(() => {
        return (
            <View style={styles.headerContainer}>
                <Pressable onPress={onClose}>
                    <IconSymbol color="white" size={25} name="xmark"/>
                </Pressable>
            </View>
        );
    }, [onClose]);

    const handleSwipeDown = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleChange = useCallback((index?: number) => {
        if (index !== undefined) {
            setCurrentActiveId(ids[index]);
        }
    }, [ids]);

    const renderLoading = useCallback(() => {
        return <ActivityIndicator color="white" size="large"/>;
    }, []);

    return (
        <Modal
            allowSwipeDismissal={true}
            visible={isVisible}
            onRequestClose={onClose}
            animationType="none">
            <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <ImageViewer
                    pageAnimateTime={300}
                    renderHeader={renderHeader}
                    onSwipeDown={handleSwipeDown}
                    index={activeIndex}
                    enableSwipeDown={true}
                    onChange={handleChange}
                    loadingRender={renderLoading}
                    imageUrls={imageUrls}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
});