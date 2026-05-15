import type React from 'react';
export type AudioVariant = 'default' | 'compact' | 'card' | 'minimal';
export type AudioColor = 'primary' | 'secondary' | 'danger' | 'info';
export interface AudioPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Audio source URL */
    src: string;
    /** Track title */
    title?: string;
    /** Artist name */
    artist?: string;
    /** Cover art URL (used in 'card' variant) */
    cover?: string;
    /** Auto-play on mount */
    autoPlay?: boolean;
    /** Loop playback */
    loop?: boolean;
    /** Visual variant */
    variant?: AudioVariant;
    /** Accent color */
    color?: AudioColor;
    /** Show volume control (default true) */
    showVolume?: boolean;
    /** Show playback speed selector (default false) */
    showPlaybackSpeed?: boolean;
    /** Show progress bar (default true) */
    showProgress?: boolean;
    /** Available playback speeds */
    playbackSpeeds?: number[];
    /** Called when playback starts */
    onPlay?: () => void;
    /** Called when playback pauses */
    onPause?: () => void;
    /** Called when playback ends */
    onEnded?: () => void;
    /** Called on time update */
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    /** Additional class names */
    className?: string;
}
//# sourceMappingURL=AudioPlayer.types.d.ts.map