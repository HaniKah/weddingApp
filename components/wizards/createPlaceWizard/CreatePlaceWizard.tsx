import {useEffect, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";
import {Wizard} from "@/components/wizards/Wizard";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard({placeId, onFinish}: {
    placeId: number | undefined,
    onFinish: () => void

}) {

    const [data, setData] = useState<VendorPlaceDetailsDto>()

    const {api} = useApi()

    useEffect(() => {
        if (!placeId) return
        const getPlaceDetails = async () => {
            try {
                const res = await api.placesControllerGetPlaceDetails({id: placeId})
                setData(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getPlaceDetails()
    }, [placeId]);


    return (
        <>
            <Wizard>
                <WizardStep step={UpdateStep.PickPlaceType}>
                    <PickPlaceType
                        setData={setData}
                        data={data}
                    />
                </WizardStep>
                <WizardStep step={UpdateStep.FillPlaceInfo}>
                    <FillPlaceInfo
                        setData={setData}
                        data={data}
                    />
                </WizardStep>
                <WizardStep step={UpdateStep.AddDescription}>
                    <AddDescription
                        setData={setData}
                        data={data}
                    />
                </WizardStep>

                <WizardStep step={UpdateStep.UploadImages}>
                    <UploadImages onFinish={onFinish} placeId={data?.id}/>
                </WizardStep>
            </Wizard>
        </>
    )
}