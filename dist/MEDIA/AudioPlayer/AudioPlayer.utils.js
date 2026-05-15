import {
  AUDIO_BASE_CLASS,
  AUDIO_VARIANTS,
  AUDIO_COLORS
} from "./AudioPlayer.constants";
function buildAudioPlayerClasses(variant, color, className) {
  return [
    AUDIO_BASE_CLASS,
    AUDIO_VARIANTS[variant] || "",
    AUDIO_COLORS[color] || "",
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
  buildAudioPlayerClasses,
  formatTime,
  getProgressPercent
};
//# sourceMappingURL=AudioPlayer.utils.js.map
