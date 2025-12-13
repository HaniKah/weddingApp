import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {CreatePlaceRequest, UpdatePlaceRequest, UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";
import ProgressNavigator from "@/components/wizards/createPlaceWizard/ProgressNavigator";
import {Wizard, WizardRef} from "@/components/wizards/Wizard";


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
    const [updateRequest, setUpdateRequest] = useState<UpdatePlaceRequest>({})


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


    const createPlace = async () => {
        try {
            const res = await API.placesControllerCreatePlace(createRequest)
            setData(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const updatePlace = async () => {
        try {
            const res = await API.placesControllerUpdatePlace(updateRequest)
            setData(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const onNext = async () => {
        if (data?.id) {
            await updatePlace()
        }
        // else if (
        //     currentStep === UpdateStep.AddDescription
        // ) {
        //     await createPlace()
        // }
        wizardRef.current?.nextStep();
    };


    const onFinish = () => {
        setIsModalVisible(false)
        setTrigger((prev) => !prev)
    }

    const onPrevious = () => {
        wizardRef.current?.previousStep();
    }


    return (
        <>
            <Wizard ref={wizardRef}>
                <WizardStep step={UpdateStep.PickPlaceType}>
                    <PickPlaceType
                        setUpdateRequest={setUpdateRequest}
                        setCreateRequest={setCreateRequest}
                        setData={setData}
                        data={data}
                        onNext={onNext}/>
                </WizardStep>
                <WizardStep step={UpdateStep.FillPlaceInfo}>
                    <FillPlaceInfo setCreateRequest={setCreateRequest}
                                   setData={setData}
                                   data={data}
                                   onNext={onNext}/>
                </WizardStep>
                <WizardStep step={UpdateStep.AddDescription}>
                    <AddDescription setCreateRequest={setCreateRequest}
                                    setData={setData}
                                    data={data}
                                    onNext={onNext}/>
                </WizardStep>
                <WizardStep step={UpdateStep.UploadImages}>
                    <UploadImages placeId={data?.id} onFinish={onFinish}/>
                </WizardStep>

                <ProgressNavigator isFirstStep={false}
                                   isLastStep={false}
                                   onPrevious={onPrevious}
                                   onNext={onNext}/>
            </Wizard>
        </>
    )
}