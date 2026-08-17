import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useEffect, useState} from 'react';
import {VideoView, useVideoPlayer} from 'expo-video';
import {Image} from 'expo-image';
import {Theme} from '@/styles/Theme';

// Wraps expo-video for the two playback shapes this app needs: an inline
// muted-autoplay-loop tile (hero carousel) and a full-screen tap-to-play
// player with sound (gallery viewer). `active` controls play/pause so an
// off-screen carousel page doesn't keep decoding in the background.
//
// expo-video's VideoView has no built-in poster prop, so the poster frame is
// layered on top with expo-image and faded out once playback actually starts.
export default function AppVideoPlayer({
                                            uri,
                                            posterUri,
                                            blurhash,
                                            active = true,
                                            autoplay = false,
                                            muted = false,
                                            loop = false,
                                            nativeControls = false,
                                            extraStyles,
                                        }: {
    uri: string
    posterUri?: string | null
    blurhash?: string | null
    active?: boolean
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    nativeControls?: boolean
    extraStyles?: StyleProp<ViewStyle>
}) {
    const [isPlaying, setIsPlaying] = useState(false);

    // muted/loop are fixed per call site (hero carousel vs. full-screen
    // viewer) and don't change over a player's lifetime here, so they're only
    // set once in the setup callback rather than kept in sync via an effect.
    const player = useVideoPlayer(uri, (p) => {
        p.loop = loop;
        p.muted = muted;
        if (autoplay && active) {
            p.play();
        }
    });

    useEffect(() => {
        const sub = player.addListener('playingChange', ({isPlaying}) => setIsPlaying(isPlaying));
        return () => sub.remove();
    }, [player]);

    // expo-video's player is an imperative handle (like a <video> ref) — play
    // state is the one property that legitimately changes over this
    // component's lifetime, driven by the carousel's active-index tracking.
    useEffect(() => {
        if (!active) {
            player.pause();
        } else if (autoplay) {
            player.play();
        }
    }, [player, active, autoplay]);

    return (
        <View style={[styles.container, extraStyles]}>
            <VideoView
                style={styles.video}
                player={player}
                nativeControls={nativeControls}
                contentFit="cover"
            />
            {!isPlaying && (posterUri || blurhash) &&
                <Image
                    source={posterUri ? {uri: posterUri} : undefined}
                    placeholder={blurhash}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Theme.colors.gray.S200,
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
