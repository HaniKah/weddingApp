import {WeddingSteps} from "@/types/open-api";
import {Theme} from "@/styles/Theme";

export const useColors = () => {
    return getColorByStep
}

const getColorByStep = (step?: WeddingSteps) => {
    switch (step) {
        case WeddingSteps.MakeUpArtist:
        case WeddingSteps.Perfumes:
        case WeddingSteps.Fireworks:
            return Theme.colors.complementary.red

        case WeddingSteps.Giveaways:
        case WeddingSteps.Catering:
        case WeddingSteps.Photographer:
            return Theme.colors.complementary.orange

        case WeddingSteps.Dj:
        case WeddingSteps.Jewelry:
        case WeddingSteps.Dress:
            return Theme.colors.complementary.yellow

        case WeddingSteps.MusiciansAndPerformers:
        case WeddingSteps.CosmeticClinics:
        case  WeddingSteps.Extra:
            return Theme.colors.complementary.green

        case WeddingSteps.Decorator :
        case WeddingSteps.Car:
            return Theme.colors.complementary.peacock

        case WeddingSteps.DancingCourse:
        case  WeddingSteps.Aarada:
        case WeddingSteps.Host:
            return Theme.colors.complementary.purple

        case WeddingSteps.Hammam :
            return Theme.colors.complementary.blue

        default:
            return Theme.colors.primary
    }
}


