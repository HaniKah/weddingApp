import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {CreatePlaceInfo, WeddingSteps} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import UploadImages from "@/components/wizards/createPlaceWizard/UploadImages";
import {useApi} from "@/utils/api";
import AddDescription from "@/components/wizards/createPlaceWizard/AddDescription";


enum CreatePlaceSteps {
    PickPlaceType = "PickPlaceType",
    FillPlaceInfo = "FillPlaceInfo",
    AddDescription = "AddDescription",
    PickPlaceLocation = "PickPlaceLocation"
}

export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard() {
    const wizardRef = useRef<WizardRef>(null);

    const stepsList: CreatePlaceSteps[] = Object.values(CreatePlaceSteps);
    const [currentStep, setCurrentStep] = useState<string>(stepsList[0]);

    const [selectedType, setSelectedType] = useState<WeddingSteps>()
    const [placeInfo, setPlaceInfo] = useState<CreatePlaceInfo>()
    const [description, setDescription] = useState<string>()
    const [images, setImages] = useState<ImageUploadModel[]>([]);

    const API = useApi()

    const onNext = () => {
        wizardRef.current?.nextStep();
    };


    const onCreate = async () => {
        if (!placeInfo || !selectedType) return
        const res = await API.placesControllerCreatePlace({
            placeInfo: placeInfo,
            type: selectedType,
            description: description
        })
        const files = constructRequest(res.data.id)
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
                    <PickPlaceType onNext={onNext} selectedType={selectedType} setSelectedType={setSelectedType}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.FillPlaceInfo} currentStep={currentStep}>
                    <FillPlaceInfo setPlaceInfo={setPlaceInfo} onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.AddDescription} currentStep={currentStep}>
                    <AddDescription description={description} setDescription={(text) => setDescription(text)}
                                    onNext={onNext}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.PickPlaceLocation} currentStep={currentStep}>
                    <UploadImages setImages={setImages} images={images} onFinish={onCreate}/>
                </WizardStep>
            </Wizard>


        </>
    )
}