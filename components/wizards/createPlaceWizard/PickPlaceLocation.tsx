import WizardController from "@/components/wizards/WizardController";
import {useWizardContext} from "@/components/wizards/Wizard";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet, Text, View} from "react-native";
import AppView from "@/components/appComponents/AppView";
import {Theme} from "@/styles/Theme";
import GooglePlacesAutoComplete from "@/components/GooglePlacesAutoComplete";
import AppButton from "@/components/appComponents/AppButton";
import {useState} from "react";

export type Location = {
    lat: number,
    lng: number
}

export type SelectedPlace = {
    placeId: string,
    mainText: string,
    secondaryText: string,
    location: Location

}

export default function PickPlaceLocation() {
    const wizard = useWizardContext()

    const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | undefined>(undefined)


    function onNext() {
        wizard.nextStep()
    }


    return (
        <>
            <AppView withPadding>
                <View style={styles.container}>
                    <Text style={styles.title}>Add location info</Text>
                    <GooglePlacesAutoComplete setSelectedPlace={setSelectedPlace}/>
                    <MapView
                        cacheEnabled={true}
                        camera={{
                            center: {
                                latitude: selectedPlace?.location.lat!,
                                longitude: selectedPlace?.location.lng!,
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

                        {selectedPlace &&
                            <Marker coordinate={{
                                latitude: selectedPlace?.location.lat,
                                longitude: selectedPlace?.location.lng,
                            }}/>
                        }

                    </MapView>

                    <AppButton extraStylesBtn={styles.confirmBtn} fullWidth>
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