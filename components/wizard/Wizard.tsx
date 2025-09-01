import {Pressable, StyleSheet, Text, View} from "react-native";
import PickDate from "@/components/wizard/PickDate";
import {PickPlace} from "@/components/wizard/PickPlace";
import {useEffect, useState} from "react";
import Toolbar from "@/components/Toolbar";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Theme} from "@/constants/Theme";

interface LatLng {
    lng: number
    lat: number
}

export interface PlacesDto {
    placeId?: string;
    businessStatus?: string;
    location?: LatLng;
    name?: string;
    formatted_address?: string;
    formatted_phone_number?: string;
}

export enum WizardSteps {
    Date = "Date",
    Place = "Wedding Hall",
    Dress = "Wedding Dress",
    Photographer = "Photographer",
    DJ = "DJ",
}

export type ActiveComponentProps = {
    currentStep: number
    data: PlacesDto[] | null
}
type WizardProps = {
    currentStep: WizardSteps
}

const steps: WizardSteps[] = Object.values(WizardSteps)


function ActiveComponent({currentStep, data}: ActiveComponentProps) {
    if (steps[currentStep] === WizardSteps.Date) {
        return <PickDate/>
    }
    return <PickPlace data={data}/>
}

export default function Wizard() {
    const [currentStep, setcurrentStep] = useState<number>(4)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const API_URL = process.env.EXPO_PUBLIC_API_URL

    const getPlaces = async () => {
        try {
            const response = await fetch(API_URL + `api/places/getDummyPlaces?step=${currentStep}`)
            const json = await response.json()
            setData(json.places)
        } catch (err) {
            console.error(err)
        } finally {

            setLoading(false)
        }

    }
    useEffect(() => {
        getPlaces()
    }, [])

    function skipStep() {
        setcurrentStep(currentStep + 1)
    }

    return (
        <View>
            <Toolbar>
                {currentStep !== steps.length - 1 && (
                    <Pressable onPress={skipStep} style={styles.skipBtn}>
                        <Text style={styles.skipTxt}>
                            skip
                        </Text>
                    </Pressable>
                )}
            </Toolbar>
            <ActiveComponent data={data} currentStep={currentStep}/>
        </View>
    )
}

const styles = StyleSheet.create({
    skipBtn: {
        alignSelf: "flex-end",
    },
    skipTxt: {
        color: Theme.colors.primary,

    }
})