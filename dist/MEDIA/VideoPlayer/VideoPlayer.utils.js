import {
  VIDEO_BASE_CLASS,
  VIDEO_ASPECT_RATIOS,
  VIDEO_VARIANTS,
  VIDEO_COLORS
} from "./VideoPlayer.constants";
function buildVideoPlayerClasses(aspectRatio, variant, color, isFullscreen, className) {
  return [
    VIDEO_BASE_CLASS,
    VIDEO_ASPECT_RATIOS[aspectRatio] || "",
    VIDEO_VARIANTS[variant] || "",
    VIDEO_COLORS[color] || "",
    isFullscreen ? "w3f-video-player--fullscreen" : "",
    className
  ].filter(Boolean).join(" ");
}
function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
function getProgressPercent(currentTime, duration) {
  if (!duration || duration === 0) return 0;
  return currentTime / duration * 100;
}
export {
  buildVideoPlayerClasses,
  formatTime,
  getProgressPercent
};
//# sourceMappingURL=VideoPlayer.utils.js.map
