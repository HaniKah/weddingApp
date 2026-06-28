import {useCallback, useEffect, useState} from 'react';
import WizardStep from '@/components/wizards/WizardStep';
import {Categories, PhotosDto, PhotoSize, UpdateStep, VendorPlaceDetailsDto} from '@/types/open-api';
import UploadImages from '@/components/wizards/createPlaceWizard/UploadImages';
import AddDescription from '@/components/wizards/createPlaceWizard/AddDescription';
import {Wizard} from '@/components/wizards/Wizard';
import FillPlaceInfo from '@/components/wizards/createPlaceWizard/FillPlaceInfo';
import {useApi} from '@/utils/api';
import AddFeatures from "@/components/wizards/createPlaceWizard/AddFeatures";


export type ImageUploadModel = {
    uri: string
    type?: string
    name?: string | null
}

export default function ACreatePlaceWizard({id, onFinish, initialStep}: {
    id?: number,
    onFinish: () => void
    initialStep: UpdateStep

}) {
    const {api} = useApi();
    const [data, setData] = useState<VendorPlaceDetailsDto>();
    const [images, setImages] = useState<PhotosDto[]>([])

    const getPlace = useCallback(async () => {
        if (!id) return;
        try {
            const res = await api.placesControllerGetPlaceDetails({id: id});
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    }, [id])

    const getPhotos = useCallback(async () => {
        if (!id) return;
        try {
            const res = await api.photosControllerGetAllPhotos(id, PhotoSize.Thumbnail);
            setImages(res.data.result);
        } catch (error) {
            console.error(error);
        }
    }, [id])

    useEffect(() => {

        getPlace();
        getPhotos();

    }, [getPlace, getPhotos]);

    const categoryFeatures = [Categories.Host, Categories.Dress]

    return (
        <>
            <Wizard initialStep={initialStep}>
                <WizardStep step={UpdateStep.FillPlaceInfo}>
                    <FillPlaceInfo
                        setData={setData}
                        data={data}
                    />
                </WizardStep>

                {data?.category && categoryFeatures.includes(data?.category) &&
                    <WizardStep

                        step={UpdateStep.AddFeatures}>
                        <AddFeatures setData={setData}
                                     data={data}/>
                    </WizardStep>
                }

                <WizardStep step={UpdateStep.AddDescription}>
                    <AddDescription
                        setData={setData}
                        data={data}
                    />
                </WizardStep>

                {data?.id &&
                    <WizardStep step={UpdateStep.UploadImages}>
                        <UploadImages setImages={setImages} images={images} onFinish={onFinish} placeId={data?.id}/>
                    </WizardStep>
                }

            </Wizard>
        </>
    );
}