import {View} from "react-native";
import PickDate from "@/components/wizard/PickDate";
import PickPlace from "@/components/wizard/PickPlace";
import {useEffect, useState} from "react";

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
    currentStep: WizardSteps
    data: PlacesDto[] | null
}
type WizardProps = {
    currentStep: WizardSteps
}


function ActiveComponent({currentStep, data}: ActiveComponentProps) {
    if (currentStep === WizardSteps.Date) {
        return <PickDate/>
    }
    return <PickPlace data={data}/>
}

export default function Wizard({currentStep}: WizardProps) {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const API_URL = process.env.EXPO_PUBLIC_API_URL

    const getPlaces = async () => {
        try {
            const response = await fetch(API_URL + `api/places/getPlace?step=${currentStep}`)
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
    return (
        <View>
            <ActiveComponent data={data} currentStep={currentStep}/>
        </View>
    )
}