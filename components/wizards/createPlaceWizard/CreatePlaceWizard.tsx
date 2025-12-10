import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {CreatePlaceRequest, UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard({placeId, setIsModalVisible, setTrigger}: {
    placeId: number | undefined,
    setIsModalVisible: (value: boolean) => void
    setTrigger: Dispatch<SetStateAction<boolean>>

}) {
    const wizardRef = useRef<WizardRef>(null);

    const [data, setData] = useState<VendorPlaceDetailsDto>()
    const [createRequest, setCreateRequest] = useState<CreatePlaceRequest>({})

    const stepsList: UpdateStep[] = Object.values(UpdateStep);
    const [currentStep, setCurrentStep] = useState<UpdateStep>(stepsList[0]);


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

    const onCreate = async () => {
        const res = await API.placesControllerCreatePlace(createRequest)
        setData(res.data)
        onNext()
    }

    const onFinish = () => {
        setIsModalVisible(false)
        setTrigger((prev) => !prev)
    }


    return (
        <>
            <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                <WizardStep step={UpdateStep.PickPlaceType} currentStep={currentStep}>
                    <PickPlaceType setCreateRequest={setCreateRequest}
                                   setData={setData}
                                   placeId={placeId}
                                   data={data}
                                   onNext={onNext}/>
                </WizardStep>
                <WizardStep step={UpdateStep.FillPlaceInfo} currentStep={currentStep}>
                    <FillPlaceInfo setCreateRequest={setCreateRequest} placeId={placeId} data={data} onNext={onNext}/>
                </WizardStep>
                <WizardStep step={UpdateStep.AddDescription} currentStep={currentStep}>
                    <AddDescription setCreateRequest={setCreateRequest} data={data} placeId={placeId}
                                    onNext={onCreate}/>
                </WizardStep>
                <WizardStep step={UpdateStep.PickPlaceLocation} currentStep={currentStep}>
                    <UploadImages setCreateRequest={setCreateRequest} placeId={placeId} onFinish={onFinish}/>
                </WizardStep>
            </Wizard>
        </>
    )
}