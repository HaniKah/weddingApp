import {Wizard} from "@/components/wizards/Wizard";
import WizardStep from "@/components/wizards/WizardStep";
import {PromotionInfo} from "@/components/wizards/promotePlaceWizard/PromotionInfo";

enum PromotionSteps {
    PromotionInfo = "PromotionInfo",
}

export default function PromotePlaceWizard({placeId}: { placeId: number | undefined }) {


    return (
        <Wizard>
            <WizardStep step={PromotionSteps.PromotionInfo}>
                <PromotionInfo placeId={placeId}/>
            </WizardStep>
        </Wizard>
    )
}