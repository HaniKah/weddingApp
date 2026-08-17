import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {useCallback} from 'react';
import {VideosDto} from '@/types/open-api';
import {IconButton} from '@/components/symbols/IconButton';
import {Theme} from '@/styles/Theme';
import AppVideoPlayer from '@/components/appComponents/AppVideoPlayer';
import {useTranslation} from 'react-i18next';

// Full-screen single-video player. Sibling to AppImageViewer, but not built
// on react-native-image-zoom-viewer (image-only) — hosts AppVideoPlayer with
// native controls and sound instead.
export default function AppVideoViewer({
                                            video,
                                            onClose,
                                            onDeleteVideo,
                                            onSetMainVideo,
                                            visible,
                                        }: {
    video: VideosDto | undefined
    onClose: () => void
    onDeleteVideo?: (id: number) => Promise<void>,
    onSetMainVideo?: (id: number) => Promise<void>,
    visible: boolean
}) {
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    const deleteVideo = useCallback(async () => {
        if (video) {
            await onDeleteVideo?.(video.id)
        }
    }, [onDeleteVideo, video])

    const setMainVideo = useCallback(async () => {
        if (video) {
            await onSetMainVideo?.(video.id)
        }
    }, [onSetMainVideo, video])

    if (!video) return null;

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
                    {onSetMainVideo && video.isMain &&
                        <View style={styles.mainVideoContainer}>
                            <IconSymbol color={Theme.colors.white} name="crown.fill"/>
                            <Text style={styles.mainVideoText}>{t('profile.mainPhoto')}</Text>
                        </View>
                    }
                </View>

                <View style={styles.playerContainer}>
                    <AppVideoPlayer
                        uri={video.uri}
                        posterUri={video.posterUri}
                        blurhash={video.blurhash}
                        autoplay
                        nativeControls
                    />
                </View>

                <View style={styles.footerContainer}>
                    {onDeleteVideo &&
                        <IconButton onPress={deleteVideo}
                                    extraStylesBtn={{backgroundColor: Theme.colors.gray.S700}}
                                    name="trash"
                                    color="white"
                                    weight="regular"
                                    size={25}/>
                    }
                    {onSetMainVideo && !video.isMain &&
                        <IconButton onPress={setMainVideo}
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
    headerContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    mainVideoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
    },
    mainVideoText: {
        color: 'white',
        fontWeight: 'semibold',
    },
    playerContainer: {
        flex: 1,
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
