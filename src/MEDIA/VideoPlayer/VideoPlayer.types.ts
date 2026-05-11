import type React from 'react';

export type VideoAspectRatio = '16:9' | '4:3' | '21:9' | '1:1';

export type VideoVariant = 'default' | 'minimal' | 'cinema';

export type VideoColor = 'primary' | 'secondary' | 'danger' | 'info';

export interface VideoPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Video source URL */
  src: string;
  /** Poster image URL */
  poster?: string;
  /** Auto-play on mount */
  autoPlay?: boolean;
  /** Start muted */
  muted?: boolean;
  /** Loop playback */
  loop?: boolean;
  /** Show custom controls overlay (default true) */
  controls?: boolean;
  /** Container width */
  width?: string;
  /** Container height */
  height?: string;
  /** Aspect ratio preset */
  aspectRatio?: VideoAspectRatio;
  /** Visual variant */
  variant?: VideoVariant;
  /** Accent color */
  color?: VideoColor;
  /** Show progress bar (default true) */
  showProgress?: boolean;
  /** Show volume slider (default true) */
  showVolume?: boolean;
  /** Show fullscreen button (default true) */
  showFullscreen?: boolean;
  /** Show playback speed selector (default false) */
  showPlaybackSpeed?: boolean;
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
