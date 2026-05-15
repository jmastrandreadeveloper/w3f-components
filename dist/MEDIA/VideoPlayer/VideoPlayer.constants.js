const VIDEO_BASE_CLASS = "w3f-video-player";
const VIDEO_ASPECT_RATIOS = {
  "16:9": "w3f-video-player--16-9",
  "4:3": "w3f-video-player--4-3",
  "21:9": "w3f-video-player--21-9",
  "1:1": "w3f-video-player--1-1"
};
const VIDEO_VARIANTS = {
  default: "",
  minimal: "w3f-video-player--minimal",
  cinema: "w3f-video-player--cinema"
};
const VIDEO_COLORS = {
  primary: "w3f-video-player--primary",
  secondary: "w3f-video-player--secondary",
  danger: "w3f-video-player--danger",
  info: "w3f-video-player--info"
};
const VIDEO_DEFAULTS = {
  controls: true,
  autoPlay: false,
  muted: false,
  loop: false,
  aspectRatio: "16:9",
  variant: "default",
  color: "primary",
  showProgress: true,
  showVolume: true,
  showFullscreen: true,
  showPlaybackSpeed: false,
  playbackSpeeds: [0.5, 1, 1.5, 2],
  className: ""
};
const CONTROLS_HIDE_DELAY = 3e3;
export {
  CONTROLS_HIDE_DELAY,
  VIDEO_ASPECT_RATIOS,
  VIDEO_BASE_CLASS,
  VIDEO_COLORS,
  VIDEO_DEFAULTS,
  VIDEO_VARIANTS
};
//# sourceMappingURL=VideoPlayer.constants.js.map
