import { Categories } from '@/types/open-api';
import DiscoBall from '@/assets/icons/steps/disco-ball.svg';
import Camera from '@/assets/icons/steps/camera.svg';
import Dress from '@/assets/icons/steps/dress.svg';
import Disc from '@/assets/icons/steps/disc.svg';
import Lipstick from '@/assets/icons/steps/lipstick.svg';
import Vase from '@/assets/icons/steps/vase.svg';
import Catering from '@/assets/icons/steps/catering.svg';
import Dance from '@/assets/icons/steps/dance.svg';
import Drum from '@/assets/icons/steps/drum.svg';
import Car from '@/assets/icons/steps/car.svg';
import Present from '@/assets/icons/steps/present.svg';
import ShavingBlade from '@/assets/icons/steps/shaving-blade.svg';
import Ring from '@/assets/icons/steps/ring.svg';
import Perfume from '@/assets/icons/steps/perfume.svg';
import Hammam from '@/assets/icons/steps/massage.svg';
import Fireworks from '@/assets/icons/steps/firework.svg';
import Guitar from '@/assets/icons/steps/guitar.svg';
import Star from '@/assets/icons/steps/star.svg';

export default function IconStep({ step, width, height, fill }: {
  step: Categories,
  width?: number,
  height?: number,
  fill?: string
}) {
  switch (step) {
    case Categories.Host:
      return <DiscoBall width={width} height={height} fill={fill} />;
    case Categories.Dress:
      return <Dress width={width} height={height} fill={fill} />;
    case Categories.Photographer:
      return <Camera width={width} height={height} fill={fill} />;
    case Categories.Dj:
      return <Disc width={width} height={height} fill={fill} />;
    case Categories.MakeUpArtist:
      return <Lipstick width={width} height={height} fill={fill} />;
    case Categories.Decorator:
      return <Vase width={width} height={height} fill={fill} />;
    case Categories.Catering:
      return <Catering width={width} height={height} fill={fill} />;
    case Categories.DancingCourse:
      return <Dance width={width} height={height} fill={fill} />;
    case Categories.Aarada:
      return <Drum width={width} height={height} fill={fill} />;
    case Categories.Car:
      return <Car width={width} height={height} fill={fill} />;
    case Categories.Giveaways:
      return <Present width={width} height={height} fill={fill} />;
    case Categories.CosmeticClinics:
      return <ShavingBlade width={width} height={height} fill={fill} />;
    case Categories.Jewelry:
      return <Ring width={width} height={height} fill={fill} />;
    case Categories.Perfumes:
      return <Perfume width={width} height={height} fill={fill} />;
    case Categories.Hammam:
      return <Hammam width={width} height={height} fill={fill} />;
    case Categories.Fireworks:
      return <Fireworks width={width} height={height} fill={fill} />;
    case Categories.MusiciansAndPerformers:
      return <Guitar width={width} height={height} fill={fill} />;
    case Categories.Extra:
      return <Star width={width} height={height} fill={fill} />;
    default:
      return <Star width={width} height={height} fill={fill} />;
  }

}

