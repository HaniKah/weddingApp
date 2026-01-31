import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import PromotePlaceWizard from "@/components/wizards/promotePlaceWizard/PromotePlaceWizard";

export default function PromotePlaceModal({ref, placeId}: {
    ref: any
    placeId: number | undefined

}) {
    // console.log("placeId inside promote modal", placeId)


    return (
        <>
            <AppModal ref={ref}
                      allowSwipeDismissal={true}
                      presentationStyle="fullScreen">
                <AppView withPadding>
                    <PromotePlaceWizard placeId={placeId}/>
                </AppView>
            </AppModal>
        </>
    )
}