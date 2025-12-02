import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useEffect, useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {CreateOrUpdatePlaceDto, CreatePlaceSteps, UpdatePlaceInfo, WeddingSteps} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard({placeId}: { placeId: number | undefined }) {
    const wizardRef = useRef<WizardRef>(null);
    const [data, setData] = useState<CreateOrUpdatePlaceDto>()

    const stepsList: CreatePlaceSteps[] = Object.values(CreatePlaceSteps);
    const [currentStep, setCurrentStep] = useState<CreatePlaceSteps>(stepsList[0]);
    const [selectedType, setSelectedType] = useState<WeddingSteps | undefined>(data?.weddingStep)
    const [placeInfo, setPlaceInfo] = useState<UpdatePlaceInfo | undefined>(data?.placeInfo)
    const [description, setDescription] = useState<string | undefined>(data?.description)
    const [images, setImages] = useState<ImageUploadModel[]>([]);

    const [isLoading, setIsLoading] = useState(false)

    const API = useApi()

    useEffect(() => {
        if (!placeId) return
        const getPlaceDetails = async () => {
            try {
                const res = await API.placesControllerCreateOrUpdatePlace({placeId: placeId, createStep: currentStep})
                setData(res.data)

            } catch (err) {
                console.error(err)
            } finally {
            }
        }
        getPlaceDetails()
    }, [placeId])

    const onNext = () => {
        wizardRef.current?.nextStep();
        handleCreateOrUpdate()
    };


    const handleCreateOrUpdate = async () => {
        if (!placeInfo || !selectedType) return
        const res = await API.placesControllerCreateOrUpdatePlace({
            placeId: placeId,
            placeInfo: placeInfo,
            weddingStep: selectedType,
            description: description,
            createStep: currentStep
        })
        const files = constructRequest(res.data.placeId)
        if (!files) return
        await API.photosControllerUploadFile(files)
    }


    function constructRequest(placeId: number): FormData | undefined {
        if (!placeInfo || !selectedType) return //todo : to be handled with errors
        const formData = new FormData();
        formData.append('placeId', placeId.toString())
        images?.map((asset, i) => {
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: asset.name,
            } as any)
        })
        return formData
    }


    return (
        <>
            <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                <WizardStep step={CreatePlaceSteps.PickPlaceType} currentStep={currentStep}>
                    <PickPlaceType onNext={onNext}
                                   selectedType={selectedType} setSelectedType={setSelectedType}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.FillPlaceInfo} currentStep={currentStep}>
                    <FillPlaceInfo setPlaceInfo={setPlaceInfo} onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.AddDescription} currentStep={currentStep}>
                    <AddDescription description={description} setDescription={(text) => setDescription(text)}
                                    onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.PickPlaceLocation} currentStep={currentStep}>
                    <UploadImages setImages={setImages} images={images} onFinish={handleCreateOrUpdate}/>
                </WizardStep>
            </Wizard>


        </>
    )
}