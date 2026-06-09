import {ActivityIndicator, Dimensions, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useCallback, useEffect, useMemo, useState} from "react";
import {PhotosDto, PhotoSize} from "@/types/open-api";
import {useApi} from "@/utils/api";
import {IconButton} from "@/components/symbols/IconButton";
import {Theme} from "@/styles/Theme";

import {useTranslation} from 'react-i18next';


export default function AppImageViewer({
                                           activeImageId,
                                           setActiveImageId,
                                           onDeleteImage,
                                           onSetMainImage,
                                           placeId,
                                           visible
                                       }: {
    onDeleteImage?: (id: number) => Promise<void>,
    onSetMainImage?: (id: number) => Promise<void>,
    activeImageId: number | undefined
    setActiveImageId: (id: number | undefined) => void,
    placeId: number
    visible: boolean

}) {
    const {width} = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const {api} = useApi()
    const {t} = useTranslation();
    const [images, setImages] = useState<PhotosDto[]>([])


    const fetchPhotos = useCallback(async () => {
        try {
            const res = await api.photosControllerGetAllPhotos(placeId, PhotoSize.Image);
            setImages(res.data.result)
            console.log("images were fetched")
        } catch (error) {
            console.error(`Failed to fetch photos`, error);
        }
    }, []);

    useEffect(() => {
        fetchPhotos()
    }, [fetchPhotos])

    const imageUrls = useMemo(() => {
        return images.map((i) => {
            return {
                url: i?.uri || '',
                width,
                height: width / i?.ratio || width,
            };
        });
    }, [images]);

    const onClose = useCallback(() => {
        setActiveImageId(undefined)
    }, []);


    const handleChange = useCallback((index?: number) => {
        if (index !== undefined) {
            setActiveImageId(images[index].id);
        }
    }, [images]);

    const deleteImage = useCallback(async () => {
        if (activeImageId) {
            await onDeleteImage?.(activeImageId)
        }
    }, [onDeleteImage, activeImageId])


    function HeaderMenu() {
        return (
            <View style={styles.headerContainer}>
                <Pressable onPress={onClose}>
                    <IconSymbol color="white" size={25} name="xmark"/>
                </Pressable>
                {onSetMainImage && images[currentIndex]?.isMain &&
                    <View style={styles.mainImageContainer}>
                        <IconSymbol color={Theme.colors.white} name="crown.fill"/>
                        <Text style={styles.mainImageText}>{t('profile.mainPhoto')}</Text>
                    </View>

                }

            </View>
        );
    }

    async function handleMainImage() {
        if (!onSetMainImage || !activeImageId) return
        await onSetMainImage(activeImageId)
        setImages((prev) => prev.map((i) => ({...i, isMain: i.id === activeImageId})))
    }

    function FooterMenu() {

        return (
            <View style={styles.footerContainer}>
                {
                    onDeleteImage && activeImageId &&
                    <IconButton onPress={deleteImage}
                                extraStylesBtn={{backgroundColor: Theme.colors.gray.S700}}
                                name="trash"
                                color="white"
                                weight="regular"
                                size={25}/>
                }

                {
                    onSetMainImage && !images[currentIndex]?.isMain &&
                    <IconButton onPress={handleMainImage}
                                name="crown"
                                size={25}
                                color="white"
                                weight="regular"
                                extraStylesBtn={{backgroundColor: Theme.colors.gray.S700}}
                    />
                }


            </View>
        )
    }

    const renderLoading = useCallback(() => {
        return <ActivityIndicator color="white" size="large"/>;
    }, []);


    const currentIndex = useMemo(() => images.findIndex((img) => img.id === activeImageId), [images, activeImageId]);

    if (images.length <= 0) return
    return (
        <Modal
            visible={visible}
            allowSwipeDismissal={true}
            onRequestClose={onClose}
            animationType="fade">
            <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <ImageViewer
                    pageAnimateTime={300}
                    renderHeader={HeaderMenu}
                    onSwipeDown={onClose}
                    index={currentIndex}
                    enableSwipeDown={true}
                    onChange={handleChange}
                    loadingRender={renderLoading}
                    imageUrls={imageUrls}
                    renderFooter={FooterMenu}
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
        justifyContent: 'space-between',

    },
    mainImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
    },
    mainImageText: {
        color: 'white',
        fontWeight: 'semibold',
    },
    footerContainer: {
        flex: 1,
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