import {Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {PhotosDto, VideosDto} from '@/types/open-api';
import {IconButton} from '@/components/symbols/IconButton';
import {Theme} from '@/styles/Theme';
import AppVideoPlayer from '@/components/appComponents/AppVideoPlayer';
import {useTranslation} from 'react-i18next';

export type MediaItem =
    | { kind: 'photo', item: PhotosDto }
    | { kind: 'video', item: VideosDto }

function mediaKey(media: MediaItem) {
    return `${media.kind}-${media.item.id}`;
}

// Single swipeable pager mixing photos and videos in one ordered sequence, so
// the header can show "index/total" across every file rather than each media
// type having its own separate, independently-indexed viewer.
export default function AppMediaViewer({
                                           mediaItems,
                                           activeKey,
                                           setActiveKey,
                                           onDeletePhoto,
                                           onDeleteVideo,
                                           onSetMainPhoto,
                                           onSetMainVideo,
                                           visible,
                                       }: {
    mediaItems: MediaItem[]
    activeKey: string | undefined
    setActiveKey: (key: string | undefined) => void
    onDeletePhoto?: (id: number) => Promise<void>,
    onDeleteVideo?: (id: number) => Promise<void>,
    onSetMainPhoto?: (id: number) => Promise<void>,
    onSetMainVideo?: (id: number) => Promise<void>,
    visible: boolean
}) {
    const {width: DEVICE_WIDTH} = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();
    const listRef = useRef<FlatList>(null);

    const currentIndex = useMemo(
        () => mediaItems.findIndex((m) => mediaKey(m) === activeKey),
        [mediaItems, activeKey],
    );
    const current = currentIndex >= 0 ? mediaItems[currentIndex] : undefined;

    const onClose = useCallback(() => setActiveKey(undefined), [setActiveKey]);

    // The list stays mounted between opens (only the Modal's `visible` toggles),
    // so `initialScrollIndex` alone only positions it on first mount — jump to
    // the newly-opened item's page explicitly each time the viewer opens.
    useEffect(() => {
        if (visible && currentIndex >= 0) {
            listRef.current?.scrollToIndex({index: currentIndex, animated: false});
        }
    }, [visible, currentIndex]);

    const onScrollEnd = useCallback((event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / DEVICE_WIDTH);
        const item = mediaItems[index];
        if (item && mediaKey(item) !== activeKey) {
            setActiveKey(mediaKey(item));
        }
    }, [mediaItems, activeKey, setActiveKey, DEVICE_WIDTH]);

    const deleteCurrent = useCallback(async () => {
        if (!current) return;
        if (current.kind === 'photo') {
            await onDeletePhoto?.(current.item.id);
        } else {
            await onDeleteVideo?.(current.item.id);
        }
    }, [current, onDeletePhoto, onDeleteVideo]);

    const setMainCurrent = useCallback(async () => {
        if (!current) return;
        if (current.kind === 'photo') {
            await onSetMainPhoto?.(current.item.id);
        } else {
            await onSetMainVideo?.(current.item.id);
        }
    }, [current, onSetMainPhoto, onSetMainVideo]);

    if (!current || mediaItems.length === 0) return null;

    const canDelete = current.kind === 'photo' ? !!onDeletePhoto : !!onDeleteVideo;
    const canSetMain = current.kind === 'photo' ? !!onSetMainPhoto : !!onSetMainVideo;

    return (
        <Modal
            visible={visible}
            allowSwipeDismissal={true}
            onRequestClose={onClose}
            animationType="fade">
            <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={onClose}>
                        <IconSymbol color="white" size={25} name="xmark"/>
                    </Pressable>
                    <Text style={styles.counterText}>{currentIndex + 1}/{mediaItems.length}</Text>
                    {current.item.isMain ?
                        <View style={styles.mainContainer}>
                            <IconSymbol color={Theme.colors.white} name="crown.fill"/>
                            <Text style={styles.mainText}>{t('profile.mainPhoto')}</Text>
                        </View>
                        : <View style={styles.headerSpacer}/>
                    }
                </View>

                <FlatList
                    ref={listRef}
                    data={mediaItems}
                    horizontal
                    pagingEnabled
                    initialScrollIndex={currentIndex}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={mediaKey}
                    getItemLayout={(_, index) => ({length: DEVICE_WIDTH, offset: index * DEVICE_WIDTH, index})}
                    onMomentumScrollEnd={onScrollEnd}
                    renderItem={({item}) => {
                        if (item.kind === 'photo') {
                            return (
                                <View style={{width: DEVICE_WIDTH}}>
                                    <Image
                                        source={{uri: item.item.uri}}
                                        placeholder={item.item.blurhash}
                                        style={styles.media}
                                        cachePolicy="memory-disk"
                                        contentFit="contain"
                                    />
                                </View>
                            );
                        }

                        return (
                            <View style={[styles.videoSlide,]}>
                                <AppVideoPlayer
                                    uri={item.item.uri}
                                    posterUri={item.item.posterUri}
                                    blurhash={item.item.blurhash}
                                    extraStyles={{
                                        width: DEVICE_WIDTH,
                                    }}
                                    active={mediaKey(item) === activeKey}
                                    autoplay
                                    nativeControls
                                    contentFit="contain"
                                />
                            </View>
                        );
                    }}
                />

                <View style={styles.footerContainer}>
                    {canDelete &&
                        <IconButton onPress={deleteCurrent}
                                    extraStylesBtn={{backgroundColor: Theme.colors.gray.S700}}
                                    name="trash"
                                    color="white"
                                    weight="regular"
                                    size={25}/>
                    }
                    {canSetMain && !current.item.isMain &&
                        <IconButton onPress={setMainCurrent}
                                    name="crown"
                                    size={25}
                                    color="white"
                                    weight="regular"
                                    extraStylesBtn={{backgroundColor: Theme.colors.gray.S700}}
                        />
                    }
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    media: {
        flex: 1,
        height: '100%',
    },
    videoSlide: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        zIndex: 10,
    },
    headerSpacer: {
        width: 25,
    },
    counterText: {
        color: 'white',
        fontWeight: '600',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
    },
    mainText: {
        color: 'white',
        fontWeight: 'semibold',
    },
    footerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 70,
        paddingHorizontal: 20,
        gap: 10,
    },
});
