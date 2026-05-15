export interface AudioPlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    playbackSpeed: number;
    speedMenuOpen: boolean;
}
export declare function useAudioPlayer(audioRef: React.RefObject<HTMLAudioElement | null>, callbacks?: {
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
}): {
    state: AudioPlayerState;
    togglePlay: () => void;
    seek: (time: number) => void;
    setVolume: (vol: number) => void;
    toggleMute: () => void;
    setPlaybackSpeed: (speed: number) => void;
    toggleSpeedMenu: () => void;
};
//# sourceMappingURL=AudioPlayer.hooks.d.ts.map