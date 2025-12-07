import {Stack, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {useApi} from "@/utils/api";
import {Dimensions, FlatList, Image, Pressable, StyleSheet} from "react-native";
import ImageView from "react-native-image-viewing";
import {PhotosDto} from "@/types/open-api";


export default function Images() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const API = useApi()
    const [images, setImages] = useState<PhotosDto[]>([])
    const [imageView, setImageView] = useState(false)
    const IMAGE_WIDTH = Dimensions.get("window").width / 3;

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const res = await API.photosControllerGetPhotos(id)
                setImages(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getPhotos()
    }, [id]);

    function ImageItem({item}: { item: PhotosDto }) {
        return (
            <>
                <Stack.Screen options={{title: "images"}}/>
                <Pressable onPress={() => setImageView(true)}>
                    <Image height={IMAGE_WIDTH} width={IMAGE_WIDTH} source={{uri: item.uri}}/>
                </Pressable>
            </>
        )
    }

    return (
        <>
            <FlatList numColumns={3}
                      data={images}
                      getItemLayout={(data, index) => (
                          {length: IMAGE_WIDTH, offset: IMAGE_WIDTH * index, index}
                      )}
                      renderItem={({item}) => (<ImageItem item={item}/>)}/>
            <ImageView imageIndex={0} images={images} visible={imageView} onRequestClose={() => setImageView(false)}/>
        </>
    )
}
const styles = StyleSheet.create({})