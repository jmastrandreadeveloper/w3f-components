import type { VideoAspectRatio, VideoVariant, VideoColor } from './VideoPlayer.types';
export declare function buildVideoPlayerClasses(aspectRatio: VideoAspectRatio, variant: VideoVariant, color: VideoColor, isFullscreen: boolean, className: string): string;
export declare function formatTime(seconds: number): string;
export declare function getProgressPercent(currentTime: number, duration: number): number;
//# sourceMappingURL=VideoPlayer.utils.d.ts.map