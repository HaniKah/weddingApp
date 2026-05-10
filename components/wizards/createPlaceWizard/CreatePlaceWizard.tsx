import { useEffect, useState } from 'react';
import WizardStep from '@/components/wizards/WizardStep';
import { UpdateStep, VendorPlaceDetailsDto } from '@/types/open-api';
import UploadImages from '@/components/wizards/createPlaceWizard/UploadImages';
import AddDescription from '@/components/wizards/createPlaceWizard/AddDescription';
import { Wizard } from '@/components/wizards/Wizard';
import FillPlaceInfo from '@/components/wizards/createPlaceWizard/FillPlaceInfo';
import { useApi } from '@/utils/api';


export type ImageUploadModel = {
  uri: string
  type?: string
  name?: string | null
}

export default function CreatePlaceWizard({ id, onFinish, initialStep }: {
  id?: number,
  onFinish: () => void
  initialStep?: UpdateStep

}) {
  const { api } = useApi();
  const [data, setData] = useState<VendorPlaceDetailsDto>();

  useEffect(() => {
    if (!id) return;
    const getPlace = async () => {
      try {
        const res = await api.placesControllerGetPlaceDetails({ id: id });
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPlace();
  }, [id]);

  return (
    <>
      <Wizard initialStep={initialStep}>
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
          <UploadImages onFinish={onFinish} placeId={data?.id} />
        </WizardStep>
      </Wizard>
    </>
  );
}