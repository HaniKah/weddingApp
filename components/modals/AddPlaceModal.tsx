import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import CreatePlaceWizard from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";

export default function AddPlaceModal({isVisible, setIsVisible}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void
}) {

    return (
        <>
            <AppModal allowSwipeDismissal={true}
                      presentationStyle="fullScreen"
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}>
                <AppView withPadding>
                    <CreatePlaceWizard/>
                </AppView>
            </AppModal>
        </>
    )
}
