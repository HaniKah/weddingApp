import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import CreatePlaceWizard from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";
import {Dispatch, SetStateAction} from "react";

export default function AddPlaceModal({isVisible, setIsVisible, placeId, setTrigger}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void,
    placeId: number | undefined
    setTrigger: Dispatch<SetStateAction<boolean>>

}) {

    return (
        <>
            <AppModal allowSwipeDismissal={true}
                      presentationStyle="fullScreen"
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}>
                <AppView withPadding>
                    <CreatePlaceWizard setTrigger={setTrigger} placeId={placeId} setIsModalVisible={setIsVisible}/>
                </AppView>
            </AppModal>
        </>
    )
}
