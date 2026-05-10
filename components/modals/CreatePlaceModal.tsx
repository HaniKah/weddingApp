import AppModal, { AppModalRef } from '@/components/appComponents/AppModal';
import AppView from '@/components/appComponents/AppView';
import CreatePlaceWizard from '@/components/wizards/createPlaceWizard/CreatePlaceWizard';
import { RefObject } from 'react';
import { UpdateStep } from '@/types/open-api';

export default function CreatePlaceModal({ id, ref, reloadPlaces, initalStep }: {
  id?: number
  ref: RefObject<AppModalRef | null>
  reloadPlaces: () => void
  initalStep?: UpdateStep

}) {

  function closeAndReload() {
    reloadPlaces();
    ref?.current?.close();
  }

  return (
    <>
      <AppModal
        ref={ref}
        allowSwipeDismissal={true}
        presentationStyle="fullScreen"
        beforeCancel={() => reloadPlaces()}
      >
        <AppView>
          <CreatePlaceWizard initialStep={initalStep} id={id} onFinish={closeAndReload} />
        </AppView>
      </AppModal>
    </>
  );
}
