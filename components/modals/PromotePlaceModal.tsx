import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import PromotePlaceWizard from "@/components/wizards/promotePlaceWizard/PromotePlaceWizard";

export default function PromotePlaceModal({ref, placeId, reloadPlaces}: {
    ref: any
    placeId: number | undefined
    reloadPlaces: () => void

}) {
    // console.log("placeId inside promote modal", placeId)

    function reloadAndClose() {
        reloadPlaces()
        ref?.current?.close()
    }


    return (
        <>
            <AppModal ref={ref}
                      allowSwipeDismissal={true}
                      presentationStyle="fullScreen">
                <AppView withPadding>
                    <PromotePlaceWizard onFinish={reloadAndClose} placeId={placeId}/>
                </AppView>
            </AppModal>
        </>
    )
}