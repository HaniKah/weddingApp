import {Wizard} from "@/components/wizards/Wizard";
import WizardStep from "@/components/wizards/WizardStep";
import PromotionInfo from "@/components/wizards/promotePlaceWizard/PromotionInfo";
import {useState} from "react";

enum PromotionSteps {
    PromotionInfo = "PromotionInfo",
    Payment = "Payment"
}

enum PromotionType {
    Percentage = "Percentage",
    Buy1Get1Free = "Buy1Get1Free"
}

export interface PromotionInfoDto {
    startDate: Date
    endDate: Date
    PromotionType: PromotionType
}

export default function PromotePlaceWizard({placeId}: { placeId: number | undefined }) {

    const [promotionInfo, setPromotionInfo] = useState<PromotionInfoDto>()


    return (
        <Wizard>
            <WizardStep step={PromotionSteps.PromotionInfo}>
                <PromotionInfo setPromotionInfo={setPromotionInfo}/>
            </WizardStep>
        </Wizard>
    )
}