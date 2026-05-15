export interface VideoPlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    isFullscreen: boolean;
    playbackSpeed: number;
    controlsVisible: boolean;
    speedMenuOpen: boolean;
}
export declare function useVideoPlayer(videoRef: React.RefObject<HTMLVideoElement | null>, containerRef: React.RefObject<HTMLDivElement | null>, callbacks?: {
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
}): {
    state: VideoPlayerState;
    togglePlay: () => void;
    seek: (time: number) => void;
    seekRelative: (delta: number) => void;
    setVolume: (vol: number) => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    setPlaybackSpeed: (speed: number) => void;
    toggleSpeedMenu: () => void;
    resetHideTimer: () => void;
};
//# sourceMappingURL=VideoPlayer.hooks.d.ts.map