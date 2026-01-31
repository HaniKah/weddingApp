import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import {Dispatch, SetStateAction} from "react";
import PromotePlaceWizard from "@/components/wizards/promotePlaceWizard/PromotePlaceWizard";

export default function PromotePlaceModal({isVisible, setIsVisible, placeId}: {
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>,
    placeId: number | undefined
}) {
    // console.log("placeId inside promote modal", placeId)

    return (
        <>
            <AppModal allowSwipeDismissal={true}
                      presentationStyle="fullScreen"
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}>
                <AppView withPadding>
                    <PromotePlaceWizard placeId={placeId}/>
                </AppView>
            </AppModal>
        </>
    )
}