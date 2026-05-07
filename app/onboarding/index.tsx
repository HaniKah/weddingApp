import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '@/utils/authStore';
import AppButton from '@/components/appComponents/AppButton';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Theme } from '@/styles/Theme';
import { ButtonType } from '@/styles/Button';

const videoSource = require('../../assets/videos/ring.mp4');

export default function Onboarding() {
  const { completeOnboarding } = useAuthStore();
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>

        <Animated.View
          entering={FadeIn.duration(800).delay(200)}
          style={styles.welcomeContainer}
        >
          <Text style={styles.appTitle}>Ghamrah</Text>
          <Text style={styles.subtitle}>Plan your perfect day with ease</Text>
        </Animated.View>
        <Animated.View style={styles.nextContainer} entering={FadeInDown.duration(600).delay(400)}>
          <AppButton extraStylesTxt={styles.nextButton} extraStylesBtn={styles.nextButton}
                     buttonType={ButtonType.OUTLINED} fullWidth
                     onPress={completeOnboarding}>
            let&#39;s do it !
          </AppButton>
        </Animated.View>


      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 80,

  },
  appTitle: {
    fontFamily: Theme.typographies.meaCulpa,
    fontSize: 85,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  subtitle: {
    fontFamily: Theme.typographies.aboreto,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
    opacity: 0.9,
  },
  nextContainer: {
    padding: 40,

  },
  nextButton: {
    borderColor: 'white',
    color: 'white',
  },
});