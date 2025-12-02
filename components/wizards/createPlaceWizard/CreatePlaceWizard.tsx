import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useEffect, useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {CreatePlaceSteps, VendorPlaceDetailsViewModel} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";
import {ActivityIndicator} from "react-native";


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard({placeId}: { placeId: number | undefined }) {
    const wizardRef = useRef<WizardRef>(null);
    const stepsList: CreatePlaceSteps[] = Object.values(CreatePlaceSteps);
    const [data, setData] = useState<VendorPlaceDetailsViewModel>()
    const [currentStep, setCurrentStep] = useState<CreatePlaceSteps>(stepsList[0]);
    const [isLoading, setIsLoading] = useState(false)
    const [trigger, setTrigger] = useState(false)

    const API = useApi()

    useEffect(() => {
        if (!placeId) return
        const getPlaceDetails = async () => {
            try {
                setIsLoading(true)
                const res = await API.placesControllerGetPlaceDetails({id: placeId})
                setData(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPlaceDetails()
    }, [trigger]);


    const onNext = () => {
        wizardRef.current?.nextStep();
    };

    if (isLoading) return (<ActivityIndicator/>)
    else
        return (
            <>
                <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                    <WizardStep step={CreatePlaceSteps.PickPlaceType} currentStep={currentStep}>
                        <PickPlaceType data={data} setData={setData} onNext={onNext}/>
                    </WizardStep>
                    <WizardStep step={CreatePlaceSteps.FillPlaceInfo} currentStep={currentStep}>
                        <FillPlaceInfo setData={setData} data={data} onNext={onNext}/>
                    </WizardStep>
                    <WizardStep step={CreatePlaceSteps.AddDescription} currentStep={currentStep}>
                        <AddDescription data={data} setData={setData} onNext={onNext}/>
                    </WizardStep>
                    <WizardStep step={CreatePlaceSteps.PickPlaceLocation} currentStep={currentStep}>
                        <UploadImages data={data} setData={setData}
                                      onFinish={() => setTrigger((prev: boolean) => !prev)}/>
                    </WizardStep>
                </Wizard>
            </>
        )
}