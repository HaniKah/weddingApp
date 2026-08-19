import React, {useEffect, useRef} from "react";
import {Dimensions, FlatList, I18nManager, Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image"
import {HeroMediaItemDto} from "@/types/open-api";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AppVideoPlayer from "@/components/appComponents/AppVideoPlayer";
import {useTranslation} from 'react-i18next';
import {router} from "expo-router";

export const LISTING_MEDIA_HEIGHT = 500;

function Header({count, listingId}: { count: number, listingId: number }) {
    const insets = useSafeAreaInsets()
    const {t} = useTranslation();

    function handlePress() {
        router.push({
            pathname: "/listing/[id]/images",
            params: {id: listingId}
        })
    }

    return (
        <Pressable style={[{marginTop: insets.top}, styles.HeaderPhotosFound]} onPress={handlePress}>
            <IconSymbol color={Theme.colors.black} name="photo.on.rectangle"/>
            <Text>
                {t('listing.photos', {count})}
            </Text>
        </Pressable>
    )
}

function Footer({count, activeIndex}: { count: number, activeIndex: number }) {
    const flatListRef = useRef<FlatList>(null);
    const DOT_SIZE = 10;
    const DOT_GAP = 8;
    const VISIBLE_DOTS = 5;
    const CONTAINER_WIDTH = (DOT_SIZE * VISIBLE_DOTS) + (DOT_GAP * (VISIBLE_DOTS - 1));

    useEffect(() => {
        if (count > VISIBLE_DOTS && flatListRef.current) {
            const targetIndex = I18nManager.isRTL ? count - 1 - activeIndex : activeIndex;
            const offset = Math.max(0, (targetIndex - Math.floor(VISIBLE_DOTS / 2)) * (DOT_SIZE + DOT_GAP));
            flatListRef.current.scrollToOffset({
                offset,
                animated: true,
            });
        }
    }, [activeIndex, count]);

    if (count <= 1) return null;

    return (
        <View style={[styles.footerContainer, {width: CONTAINER_WIDTH}]}>
            <View>
                <FlatList
                    ref={flatListRef}
                    data={Array.from({length: count})}
                    renderItem={({index}) => (
                        <View
                            style={{width: DOT_SIZE, height: DOT_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                            <View
                                style={[
                                    styles.footerDot,
                                    activeIndex === (I18nManager.isRTL ? count - 1 - index : index) && styles.footerDotActive
                                ]}
                            />
                        </View>
                    )}
                    horizontal
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={{width: DOT_GAP}}/>}
                />
            </View>
        </View>
    )
}

export default function ScrollableImages({heroMedia, onMediaPress, listingId}: {
    heroMedia: HeroMediaItemDto[],
    onMediaPress: (index: number) => void,
    listingId: number
}) {
    const DEVICE_WIDTH = Dimensions.get('window').width
    const [activeIndex, setActiveIndex] = React.useState(0);
    const isDragging = useRef(false);

    const onScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / DEVICE_WIDTH);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    function handlePress(index: number) {
        if (isDragging.current) return;
        onMediaPress?.(index);
    }

    return (
        <>
            <View style={styles.container}>
                <FlatList data={heroMedia}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => `${item.type}-${item.id}`}
                          snapToAlignment={"center"}
                          snapToInterval={DEVICE_WIDTH}
                          decelerationRate="fast"
                          renderItem={({item, index}) =>
                              <Pressable onPress={() => handlePress(index)}>
                                  {item.type === 'Video' ?
                                      <AppVideoPlayer
                                          uri={item.uri}
                                          posterUri={item.posterUri}
                                          blurhash={item.blurhash}
                                          extraStyles={[styles.image, {width: DEVICE_WIDTH}]}
                                          active={index === activeIndex}
                                          autoplay={false}
                                          muted
                                          loop
                                      />
                                      :
                                      <Image
                                          cachePolicy="memory-disk"
                                          style={[styles.image, {width: DEVICE_WIDTH}]} source={item.uri}
                                          contentFit="cover"
                                          placeholder={item.blurhash}/>
                                  }
                              </Pressable>}
                          getItemLayout={(data, index) => ({length: DEVICE_WIDTH, offset: index * DEVICE_WIDTH, index})}
                          scrollEventThrottle={16}
                          onScroll={onScroll}
                          onScrollBeginDrag={() => {
                              isDragging.current = true;
                          }}
                          onMomentumScrollEnd={() => {
                              isDragging.current = false;
                          }}
                          onScrollEndDrag={() => {
                              setTimeout(() => {
                                  isDragging.current = false;
                              }, 100);
                          }}
                />
                <Header count={heroMedia.length} listingId={listingId}/>
                <Footer count={heroMedia.length} activeIndex={activeIndex}/>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        height: LISTING_MEDIA_HEIGHT,
        // resizeMode: "cover",
    },
    HeaderPhotosFound: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: "rgba(255,255,255,0.8)",
        position: 'absolute',
        top: 10,
        end: 10,
        zIndex: 50,
        elevation: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: Theme.radius.full
    },
    footerContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        zIndex: 20,
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    footerDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    footerDotActive: {
        backgroundColor: '#FFFFFF',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
})
