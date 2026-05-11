import type { AudioVariant, AudioColor } from './AudioPlayer.types';

export const AUDIO_BASE_CLASS = 'w3f-audio-player';

export const AUDIO_VARIANTS: Record<AudioVariant, string> = {
  default: '',
  compact: 'w3f-audio-player--compact',
  card: 'w3f-audio-player--card',
  minimal: 'w3f-audio-player--minimal',
};

export const AUDIO_COLORS: Record<AudioColor, string> = {
  primary: 'w3f-audio-player--primary',
  secondary: 'w3f-audio-player--secondary',
  danger: 'w3f-audio-player--danger',
  info: 'w3f-audio-player--info',
};

export const AUDIO_DEFAULTS = {
  autoPlay: false,
  loop: false,
  variant: 'default' as AudioVariant,
  color: 'primary' as AudioColor,
  showVolume: true,
  showPlaybackSpeed: false,
  showProgress: true,
  playbackSpeeds: [0.5, 1, 1.5, 2],
  className: '',
} as const;
