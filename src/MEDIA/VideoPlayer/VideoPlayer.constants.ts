import type { VideoAspectRatio, VideoVariant, VideoColor } from './VideoPlayer.types';

export const VIDEO_BASE_CLASS = 'w3f-video-player';

export const VIDEO_ASPECT_RATIOS: Record<VideoAspectRatio, string> = {
  '16:9': 'w3f-video-player--16-9',
  '4:3': 'w3f-video-player--4-3',
  '21:9': 'w3f-video-player--21-9',
  '1:1': 'w3f-video-player--1-1',
};

export const VIDEO_VARIANTS: Record<VideoVariant, string> = {
  default: '',
  minimal: 'w3f-video-player--minimal',
  cinema: 'w3f-video-player--cinema',
};

export const VIDEO_COLORS: Record<VideoColor, string> = {
  primary: 'w3f-video-player--primary',
  secondary: 'w3f-video-player--secondary',
  danger: 'w3f-video-player--danger',
  info: 'w3f-video-player--info',
};

export const VIDEO_DEFAULTS = {
  controls: true,
  autoPlay: false,
  muted: false,
  loop: false,
  aspectRatio: '16:9' as VideoAspectRatio,
  variant: 'default' as VideoVariant,
  color: 'primary' as VideoColor,
  showProgress: true,
  showVolume: true,
  showFullscreen: true,
  showPlaybackSpeed: false,
  playbackSpeeds: [0.5, 1, 1.5, 2],
  className: '',
} as const;

export const CONTROLS_HIDE_DELAY = 3000;
