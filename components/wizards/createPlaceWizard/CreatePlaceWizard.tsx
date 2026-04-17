import {useState} from 'react';
import WizardStep from '@/components/wizards/WizardStep';
import {UpdateStep, VendorPlaceDetailsDto} from '@/types/open-api';
import UploadImages from '@/components/wizards/createPlaceWizard/UploadImages';
import AddDescription from '@/components/wizards/createPlaceWizard/AddDescription';
import {Wizard} from '@/components/wizards/Wizard';
import FillPlaceInfo from '@/components/wizards/createPlaceWizard/FillPlaceInfo';


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function CreatePlaceWizard({onFinish}: {
    onFinish: () => void

}) {

    const [data, setData] = useState<VendorPlaceDetailsDto>();

    return (
        <>
            <Wizard>
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
    );
}