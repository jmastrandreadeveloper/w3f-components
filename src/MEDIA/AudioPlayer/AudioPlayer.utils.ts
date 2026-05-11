import type { AudioVariant, AudioColor } from './AudioPlayer.types';
import {
  AUDIO_BASE_CLASS,
  AUDIO_VARIANTS,
  AUDIO_COLORS,
} from './AudioPlayer.constants';

export function buildAudioPlayerClasses(
  variant: AudioVariant,
  color: AudioColor,
  className: string,
): string {
  return [
    AUDIO_BASE_CLASS,
    AUDIO_VARIANTS[variant] || '',
    AUDIO_COLORS[color] || '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getProgressPercent(currentTime: number, duration: number): number {
  if (!duration || duration === 0) return 0;
  return (currentTime / duration) * 100;
}
