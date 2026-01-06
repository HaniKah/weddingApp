import {Dispatch, SetStateAction, useEffect, useState} from "react";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {SelectedPlace} from "@/components/wizards/createPlaceWizard/PickPlaceLocation";

export default function GooglePlacesAutoComplete({setSelectedPlace}: {
    setSelectedPlace: Dispatch<SetStateAction<SelectedPlace | undefined>>
}) {

    type GooglePrediction = {
        description: string
        place_id: string
        reference: string
        structured_formatting: { main_text: string, secondary_text: string }
        matched_substrings: any[]
        terms: any[]
        types: string[]
    }

    type GoogleGeometry = {
        location: { lat: number, lng: number },
        viewport: { northeast: { lat: number, lng: number }, southwest: { lat: number, lng: number } }
    }

    type GooglePlaceDetails = {
        result: {
            geometry: GoogleGeometry
        }
    }

    const [input, setInput] = useState<string>("")
    const [results, setResults] = useState<any>([])

    useEffect(() => {
        if (!input || input === "") return
        fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyDA4psVuPD849WqrT1PZEPC_F9Du3HPfKw`)
            .then(res => res.json())
            .then(res => {
                setResults(res.predictions)
            })
    }, [input]);


    async function fetchPlaceDetails(placeId: string): Promise<GooglePlaceDetails> {
        return fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=AIzaSyDA4psVuPD849WqrT1PZEPC_F9Du3HPfKw`)
            .then(res => res.json())
    }

    async function selectPlace(place: GooglePrediction) {
        // setSelected(place)
        const resp = await fetchPlaceDetails(place.place_id)
        setSelectedPlace({
            placeId: place.place_id,
            mainText: place.structured_formatting.main_text,
            secondaryText: place.structured_formatting.secondary_text,
            location: {
                lat: resp.result.geometry.location.lat,
                lng: resp.result.geometry.location.lng,
            }
        })
        setResults([])
    }


    function renderItem({item}: { item: GooglePrediction }) {
        return (
            <Pressable onPress={() => selectPlace(item)} style={styles.itemContainer}>
                <Text style={styles.mainText}>{item.structured_formatting.main_text}</Text>
                <Text>{item.structured_formatting.secondary_text}</Text>
            </Pressable>
        )
    }


    return (
        <>
            <View style={{position: "relative"}}>
                <AppTextInput debounceTime={300}
                              value={input}
                              onTextChange={setInput}
                              name="search" design={2}
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
    },
    itemContainer: {
        paddingVertical: 10
    },
    mainText: {
        fontWeight: "bold"
    }
})