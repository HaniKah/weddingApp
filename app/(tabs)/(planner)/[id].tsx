import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function PlaceId() {
    const {id} = useLocalSearchParams();
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}