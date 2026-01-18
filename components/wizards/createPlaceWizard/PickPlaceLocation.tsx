import WizardController from "@/components/wizards/WizardController";
import {useWizardContext} from "@/components/wizards/Wizard";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet, Text, View} from "react-native";
import AppView from "@/components/appComponents/AppView";
import {Theme} from "@/styles/Theme";
import GooglePlacesAutoComplete from "@/components/GooglePlacesAutoComplete";
import AppButton from "@/components/appComponents/AppButton";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useApi} from "@/utils/api";
import {VendorPlaceDetailsDto} from "@/types/open-api";

export type Location = {
    lat: number,
    lng: number
}


export default function PickPlaceLocation({data, setData}: {
    data: VendorPlaceDetailsDto,
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto>>
}) {

    const API = useApi().api
    const wizard = useWizardContext()

    const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(data?.googleId)
    const [coordinates, setCoordinates] = useState<Location>()

    function onNext() {
        wizard.nextStep()
    }

    async function updateGooglePlaceId(placeId: string) {
        try {
            const res = await API.placesControllerUpdatePlace({location: {googleId: placeId}})
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!selectedPlaceId) return;

        async function fetchPlaceDetails(): Promise<void> {
            try {
                fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${selectedPlaceId}&key=AIzaSyDA4psVuPD849WqrT1PZEPC_F9Du3HPfKw`)
                    .then(res => res.json()).then(res => setCoordinates({
                    lat: res.result.geometry.location.lat,
                    lng: res.result.geometry.location.lng
                }))
            } catch (err) {
                console.log(err)
            }
        }

        fetchPlaceDetails()
    }, [selectedPlaceId]);


    return (
        <>
            <AppView withPadding>
                <View style={styles.container}>
                    <Text style={styles.title}>Add location info</Text>
                    <GooglePlacesAutoComplete setSelectedPlace={setSelectedPlaceId}/>
                    <MapView
                        cacheEnabled={true}
                        camera={{
                            center: {
                                latitude: coordinates?.lat!,
                                longitude: coordinates?.lng!
                            },
                            zoom: 18,
                            heading: 2,
                            pitch: 20,
                        }}
                        initialCamera={{
                            center: {
                                latitude: 37.78825,
                                longitude: -122.4324,
                            },
                            zoom: 18,
                            heading: 2,
                            pitch: 20,
                        }}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}>

                        {coordinates &&
                            <Marker coordinate={{
                                latitude: coordinates.lat,
                                longitude: coordinates.lng,
                            }}/>
                        }
                    </MapView>

                    <AppButton onPress={updateGooglePlaceId} extraStylesBtn={styles.confirmBtn} fullWidth>
                        Confirm
                    </AppButton>
                </View>
            </AppView>

            <WizardController
                onNext={onNext}
                isFirstStep={false}
                isLastStep={false}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 120,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
    },
    map: {
        width: '100%',
        flex: 1,
        borderRadius: Theme.radius.md,
        marginTop: 20,

    },
    confirmBtn: {
        marginTop: 20
    }
});