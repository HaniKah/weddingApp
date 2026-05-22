import React, {useEffect, useRef} from "react";
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image"
import {PlaceDetailsPhotos} from "@/types/open-api";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";

// interface ImageType {
//     url: string
//     blurhash: string
// }

function Header({count}: { count: number }) {
    return (
        <View style={styles.HeaderPhotosFound}>
            <IconSymbol color={Theme.colors.black} name="photo.on.rectangle"/>
            <Text>
                {count} Photos
            </Text>
        </View>
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
            const offset = Math.max(0, (activeIndex - Math.floor(VISIBLE_DOTS / 2)) * (DOT_SIZE + DOT_GAP));
            flatListRef.current.scrollToOffset({
                offset,
                animated: true,
            });
        }
    }, [activeIndex, count]);
    
    if (count === 0) return null;

    return (
        <View style={[styles.footerContainer, {width: CONTAINER_WIDTH}]}>
            <FlatList
                ref={flatListRef}
                data={Array.from({length: count})}
                renderItem={({index}) => (
                    <View style={{width: DOT_SIZE, height: DOT_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                        <View
                            style={[
                                styles.footerDot,
                                activeIndex === index && styles.footerDotActive
                            ]}
                        />
                    </View>
                )}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{alignItems: 'center'}}
                ItemSeparatorComponent={() => <View style={{width: DOT_GAP}}/>}
            />
        </View>
    )
}

export default function ScrollableImages({images}: { images: PlaceDetailsPhotos[] }) {
    const DEVICE_WIDTH = Dimensions.get('window').width
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / DEVICE_WIDTH);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Header count={images.length}/>
                <FlatList data={images}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => item.url}
                          snapToAlignment={"center"}
                          snapToInterval={DEVICE_WIDTH}
                          decelerationRate="fast"
                          renderItem={({item}) => <Image
                              style={[styles.image, {width: DEVICE_WIDTH}]} source={item.url}
                              contentFit="cover"
                              placeholder={item.blurhash}/>}
                          getItemLayout={(data, index) => ({length: DEVICE_WIDTH, offset: index * DEVICE_WIDTH, index})}
                          scrollEventThrottle={16}
                          onScroll={onScroll}
                />
                <Footer count={images.length} activeIndex={activeIndex}/>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        height: 350,
        // resizeMode: "cover",
    },
    HeaderPhotosFound: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "rgba(255,255,255,0.8)",
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
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