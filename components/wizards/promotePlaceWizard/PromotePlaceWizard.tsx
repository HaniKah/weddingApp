import {Wizard} from "@/components/wizards/Wizard";
import WizardStep from "@/components/wizards/WizardStep";
import {PromotionInfo} from "@/components/wizards/promotePlaceWizard/PromotionInfo";

enum PromotionSteps {
    PromotionInfo = "PromotionInfo",
}

export default function PromotePlaceWizard({placeId, onFinish}: { placeId: number | undefined, onFinish: () => void }) {


    return (
        <Wizard>
            <WizardStep step={PromotionSteps.PromotionInfo}>
                <PromotionInfo onFinish={onFinish} placeId={placeId}/>
            </WizardStep>
        </Wizard>
    )
}