import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useEffect, useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {CreatePlaceSteps, VendorPlaceDetailsDto} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard({placeId, setIsModalVisible}: {
    placeId: number | undefined,
    setIsModalVisible: (value: boolean) => void
}) {
    const wizardRef = useRef<WizardRef>(null);

    const [data, setData] = useState<VendorPlaceDetailsDto>()

    const stepsList: CreatePlaceSteps[] = Object.values(CreatePlaceSteps);
    const [currentStep, setCurrentStep] = useState<CreatePlaceSteps>(stepsList[0]);


    const API = useApi()

    useEffect(() => {
        if (!placeId) return
        const getPlaceDetails = async () => {
            try {
                const res = await API.placesControllerGetPlaceDetails({id: placeId})
                setData(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getPlaceDetails()
    }, [placeId]);


    const onNext = () => {
        wizardRef.current?.nextStep();
    };

    const onFinish = () => {
        setIsModalVisible(false)
    }


    return (
        <>
            <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                <WizardStep step={CreatePlaceSteps.PickPlaceType} currentStep={currentStep}>
                    <PickPlaceType setData={setData} placeId={placeId} data={data} onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.FillPlaceInfo} currentStep={currentStep}>
                    <FillPlaceInfo placeId={placeId} data={data} onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.AddDescription} currentStep={currentStep}>
                    <AddDescription data={data} placeId={placeId} onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.PickPlaceLocation} currentStep={currentStep}>
                    <UploadImages placeId={placeId} onFinish={onFinish}/>
                </WizardStep>
            </Wizard>
        </>
    )
}