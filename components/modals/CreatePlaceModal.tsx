import AppModal from "@/components/appComponents/AppModal";
import AppView from "@/components/appComponents/AppView";
import CreatePlaceWizard from "@/components/wizards/createPlaceWizard/CreatePlaceWizard";

export default function CreatePlaceModal({isVisible, setIsVisible, placeId, onFinish}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void,
    placeId: number | undefined
    onFinish: () => void

}) {
    console.log("placeId inside create modal", placeId)

    return (
        <>
            <AppModal allowSwipeDismissal={true}
                      presentationStyle="fullScreen"
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                      onCancel={onFinish}
            >
                <AppView>
                    <CreatePlaceWizard onFinish={onFinish} placeId={placeId} setIsModalVisible={setIsVisible}/>
                </AppView>
            </AppModal>
        </>
    )
}
