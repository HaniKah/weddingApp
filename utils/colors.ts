import {WeddingSteps} from "@/types/open-api";
import {Theme} from "@/styles/Theme";

export const useColors = () => {
    return getColorByStep
}

const getColorByStep = (step?: WeddingSteps) => {
    switch (step) {
        case WeddingSteps.Photographer:
        case  WeddingSteps.ExtraDecorations:
        case  WeddingSteps.Aarada:
            return Theme.colors.complementary.red
        case WeddingSteps.Giveaways:
        case WeddingSteps.Catering:
            return Theme.colors.complementary.orange
        case WeddingSteps.Jewelry:
        case WeddingSteps.Host:
        case WeddingSteps.MakeUpArtist:
            return Theme.colors.complementary.yellow
        case WeddingSteps.Date :
        case WeddingSteps.MusiciansAndPerformers :
        case WeddingSteps.CosmeticClinics:
            return Theme.colors.complementary.green
        case WeddingSteps.Dj:
        case WeddingSteps.Decorator :
        case WeddingSteps.Car:
            return Theme.colors.complementary.peacock
        case WeddingSteps.Coordinator :
        case WeddingSteps.Dress:
        case WeddingSteps.DancingCourse:
            return Theme.colors.complementary.purple
        case WeddingSteps.Hammam :
        case WeddingSteps.Perfumes:
            return Theme.colors.complementary.blue
        default:
            return Theme.colors.primary
    }
}


