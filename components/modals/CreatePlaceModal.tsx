import AppModal, {AppModalRef} from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import CreatePlaceWizard from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {RefObject} from "react";

export default function CreatePlaceModal({id, ref, reloadPlaces}: {
    id?: number
    ref: RefObject<AppModalRef | null>
    reloadPlaces: () => void

}) {

    function closeAndReload() {
        reloadPlaces()
        ref?.current?.close()
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
                    <CreatePlaceWizard id={id} onFinish={closeAndReload}/>
                </AppView>
            </AppModal>
        </>
    )
}
