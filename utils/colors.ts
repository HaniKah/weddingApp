import {Categories} from '@/types/open-api';
import {Theme} from '@/styles/Theme';

export const useColors = () => {
    return getColorByStep;
};

const getColorByStep = (step?: Categories) => {
    switch (step) {
        case Categories.MakeUpArtist:
        case Categories.Perfume:
        case Categories.Firework:
            return Theme.colors.complementary.red;

        case Categories.Giveaway:
        case Categories.Catering:
        case Categories.Photographer:
            return Theme.colors.complementary.orange;

        case Categories.Dj:
        case Categories.Jewelry:
        case Categories.Dress:
            return Theme.colors.complementary.yellow;

        case Categories.Performer:
        case Categories.Clinic:
        case  Categories.Miscellaneous:
            return Theme.colors.complementary.green;

        case Categories.Decorator :
        case Categories.Car:
            return Theme.colors.complementary.peacock;

        case Categories.DancingCourse:
        case  Categories.Procession:
        case Categories.Host:
            return Theme.colors.complementary.purple;

        case Categories.Shower :
            return Theme.colors.complementary.blue;

        default:
            return Theme.colors.primary;
    }
};


