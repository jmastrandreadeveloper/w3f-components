import type { VideoAspectRatio, VideoVariant, VideoColor } from './VideoPlayer.types';
import {
  VIDEO_BASE_CLASS,
  VIDEO_ASPECT_RATIOS,
  VIDEO_VARIANTS,
  VIDEO_COLORS,
} from './VideoPlayer.constants';

export function buildVideoPlayerClasses(
  aspectRatio: VideoAspectRatio,
  variant: VideoVariant,
  color: VideoColor,
  isFullscreen: boolean,
  className: string,
): string {
  return [
    VIDEO_BASE_CLASS,
    VIDEO_ASPECT_RATIOS[aspectRatio] || '',
    VIDEO_VARIANTS[variant] || '',
    VIDEO_COLORS[color] || '',
    isFullscreen ? 'w3f-video-player--fullscreen' : '',
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
