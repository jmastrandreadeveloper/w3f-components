import type { VideoAspectRatio, VideoVariant, VideoColor } from './VideoPlayer.types';
export declare const VIDEO_BASE_CLASS = "w3f-video-player";
export declare const VIDEO_ASPECT_RATIOS: Record<VideoAspectRatio, string>;
export declare const VIDEO_VARIANTS: Record<VideoVariant, string>;
export declare const VIDEO_COLORS: Record<VideoColor, string>;
export declare const VIDEO_DEFAULTS: {
    readonly controls: true;
    readonly autoPlay: false;
    readonly muted: false;
    readonly loop: false;
    readonly aspectRatio: VideoAspectRatio;
    readonly variant: VideoVariant;
    readonly color: VideoColor;
    readonly showProgress: true;
    readonly showVolume: true;
    readonly showFullscreen: true;
    readonly showPlaybackSpeed: false;
    readonly playbackSpeeds: readonly [0.5, 1, 1.5, 2];
    readonly className: "";
};
export declare const CONTROLS_HIDE_DELAY = 3000;
//# sourceMappingURL=VideoPlayer.constants.d.ts.map