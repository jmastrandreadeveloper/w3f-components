const AUDIO_BASE_CLASS = "w3f-audio-player";
const AUDIO_VARIANTS = {
  default: "",
  compact: "w3f-audio-player--compact",
  card: "w3f-audio-player--card",
  minimal: "w3f-audio-player--minimal"
};
const AUDIO_COLORS = {
  primary: "w3f-audio-player--primary",
  secondary: "w3f-audio-player--secondary",
  danger: "w3f-audio-player--danger",
  info: "w3f-audio-player--info"
};
const AUDIO_DEFAULTS = {
  autoPlay: false,
  loop: false,
  variant: "default",
  color: "primary",
  showVolume: true,
  showPlaybackSpeed: false,
  showProgress: true,
  playbackSpeeds: [0.5, 1, 1.5, 2],
  className: ""
};
export {
  AUDIO_BASE_CLASS,
  AUDIO_COLORS,
  AUDIO_DEFAULTS,
  AUDIO_VARIANTS
};
//# sourceMappingURL=AudioPlayer.constants.js.map
