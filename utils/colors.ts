import { Categories } from '@/types/open-api';
import { Theme } from '@/styles/Theme';

export const useColors = () => {
  return getColorByStep;
};

const getColorByStep = (step?: Categories) => {
  switch (step) {
    case Categories.MakeUpArtist:
    case Categories.Perfumes:
    case Categories.Fireworks:
      return Theme.colors.complementary.red;

    case Categories.Giveaways:
    case Categories.Catering:
    case Categories.Photographer:
      return Theme.colors.complementary.orange;

    case Categories.Dj:
    case Categories.Jewelry:
    case Categories.Dress:
      return Theme.colors.complementary.yellow;

    case Categories.MusiciansAndPerformers:
    case Categories.CosmeticClinics:
    case  Categories.Extra:
      return Theme.colors.complementary.green;

    case Categories.Decorator :
    case Categories.Car:
      return Theme.colors.complementary.peacock;

    case Categories.DancingCourse:
    case  Categories.Aarada:
    case Categories.Host:
      return Theme.colors.complementary.purple;

    case Categories.Hammam :
      return Theme.colors.complementary.blue;

    default:
      return Theme.colors.primary;
  }
};


