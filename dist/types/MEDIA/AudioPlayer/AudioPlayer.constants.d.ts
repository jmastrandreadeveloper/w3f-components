import type { AudioVariant, AudioColor } from './AudioPlayer.types';
export declare const AUDIO_BASE_CLASS = "w3f-audio-player";
export declare const AUDIO_VARIANTS: Record<AudioVariant, string>;
export declare const AUDIO_COLORS: Record<AudioColor, string>;
export declare const AUDIO_DEFAULTS: {
    readonly autoPlay: false;
    readonly loop: false;
    readonly variant: AudioVariant;
    readonly color: AudioColor;
    readonly showVolume: true;
    readonly showPlaybackSpeed: false;
    readonly showProgress: true;
    readonly playbackSpeeds: readonly [0.5, 1, 1.5, 2];
    readonly className: "";
};
//# sourceMappingURL=AudioPlayer.constants.d.ts.map