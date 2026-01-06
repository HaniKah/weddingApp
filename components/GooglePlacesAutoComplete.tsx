import {Dispatch, SetStateAction, useEffect, useState} from "react";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {useApi} from "@/utils/api";
import {Prediction} from "@/types/open-api";


export default function GooglePlacesAutoComplete({setSelectedPlace}: {
    setSelectedPlace: Dispatch<SetStateAction<string | undefined>>
}) {

    const API = useApi()

    const [input, setInput] = useState<string>("")
    const [results, setResults] = useState<Prediction[]>([])

    useEffect(() => {
        if (!input || input === "") return
        const getAutoCompletePredictions = async () => {
            const res = await API.placesControllerGetGoogleAutoCompletePredictions({input: input})
            setResults(res.data.result)
        }
        getAutoCompletePredictions()
    }, [input]);


    function renderItem({item}: { item: Prediction }) {
        return (
            <Pressable onPress={() => setSelectedPlace(item.placeId)} style={styles.itemContainer}>
                <Text style={styles.mainText}>{item.main_text}</Text>
                <Text>{item.secondary_text}</Text>
            </Pressable>
        )
    }


    return (
        <>
            <View style={{position: "relative"}}>
                <AppTextInput debounceTime={300}
                              value={input}
                              onTextChange={setInput}
                              name="search"
                              design={2}
                              placeholder="Search your place location"/>

                {results.length > 0 &&
                    <View style={styles.resultContainer}>
                        <FlatList data={results} renderItem={renderItem}/>
                    </View>

                }
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        padding: 20,
        top: 60,
        position: "absolute",
        zIndex: 10,
        backgroundColor: "white",
        borderRadius: Theme.radius.md,
        width: "100%",
        boxShadow: [{
            offsetX: 5,
            offsetY: 20,
            blurRadius: '20px',
            spreadDistance: '1px',
            color: 'gray',
        }]
    },
    itemContainer: {
        paddingVertical: 10
    },
    mainText: {
        fontWeight: "bold"
    }
})