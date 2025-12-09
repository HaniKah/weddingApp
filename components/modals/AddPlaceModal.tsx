import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import CreatePlaceWizard from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";

export default function AddPlaceModal({isVisible, setIsVisible, placeId}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void,
    placeId: number | undefined
}) {

    return (
        <>
            <AppModal allowSwipeDismissal={true}
                      presentationStyle="fullScreen"
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}>
                <AppView withPadding>
                    <CreatePlaceWizard placeId={placeId} setIsModalVisible={setIsVisible}/>
                </AppView>
            </AppModal>
        </>
    )
}
