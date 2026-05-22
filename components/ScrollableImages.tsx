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

function Footer() {
    return (
        <View></View>
    )
}

export default function ScrollableImages({images}: { images: PlaceDetailsPhotos[] }) {
    const DEVICE_WIDTH = Dimensions.get('window').width
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
                          scrollEventThrottle={100}

                />
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
})