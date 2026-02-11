import {useApi} from "@/utils/api";
import {PhotosDto} from "@/types/open-api";
import {useEffect, useState} from "react";
import {Dimensions, FlatList, Image, Pressable} from "react-native";
import AppImageViewer from "@/components/appComponents/AppImageViewer";


export default function Gallery({placeId}: { placeId: number }) {
    const API = useApi().api
    const [images, setImages] = useState<PhotosDto[]>([])
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const [imageView, setImageView] = useState(false)
    const IMAGE_WIDTH = Dimensions.get("window").width / 3;

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const res = await API.photosControllerGetPhotos(placeId)
                setImages(res.data.result)
            } catch (err) {
                console.error(err)
            }
        }
        getPhotos()
    }, [placeId]);

    function viewImage(index: number) {
        setImageView(true)
        setSelectedImage(index)
    }

    function ImageThumbnail({item, index}: { item: PhotosDto, index: number }) {
        return (
            <>

                <Pressable onPress={() => viewImage(index)}>
                    <Image height={IMAGE_WIDTH} width={IMAGE_WIDTH} source={{uri: item.uri}}/>
                </Pressable>
            </>
        )
    }


    return (
        <>
            <FlatList numColumns={3}
                      data={images}
                      keyExtractor={(item, index) => index.toString()}
                      getItemLayout={(data, index) => (
                          {length: IMAGE_WIDTH, offset: IMAGE_WIDTH * index, index}
                      )}
                      renderItem={({item, index}) => (<ImageThumbnail item={item} index={index}/>)}/>

            <AppImageViewer activeIndex={selectedImage}
                            images={images}
                            isVisible={imageView}
                            onClose={() => setImageView(false)}/>
        </>
    )
}