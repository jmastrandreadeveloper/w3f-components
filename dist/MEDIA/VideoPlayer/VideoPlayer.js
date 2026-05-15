"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback, useMemo } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize
} from "lucide-react";
import { VIDEO_DEFAULTS } from "./VideoPlayer.constants";
import { useVideoPlayer } from "./VideoPlayer.hooks";
import { buildVideoPlayerClasses, formatTime, getProgressPercent } from "./VideoPlayer.utils";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const VideoPlayer = React.forwardRef(
  ({
    src,
    poster,
    autoPlay = VIDEO_DEFAULTS.autoPlay,
    muted = VIDEO_DEFAULTS.muted,
    loop = VIDEO_DEFAULTS.loop,
    controls = VIDEO_DEFAULTS.controls,
    width,
    height,
    aspectRatio = VIDEO_DEFAULTS.aspectRatio,
    variant = VIDEO_DEFAULTS.variant,
    color = VIDEO_DEFAULTS.color,
    showProgress = VIDEO_DEFAULTS.showProgress,
    showVolume = VIDEO_DEFAULTS.showVolume,
    showFullscreen = VIDEO_DEFAULTS.showFullscreen,
    showPlaybackSpeed = VIDEO_DEFAULTS.showPlaybackSpeed,
    playbackSpeeds = VIDEO_DEFAULTS.playbackSpeeds,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    className = VIDEO_DEFAULTS.className,
    style,
    ...rest
  }, ref) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const setRefs = useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const callbacks = useMemo(
      () => ({ onPlay, onPause, onEnded, onTimeUpdate }),
      [onPlay, onPause, onEnded, onTimeUpdate]
    );
    const {
      state,
      togglePlay,
      seek,
      seekRelative,
      setVolume,
      toggleMute,
      toggleFullscreen,
      setPlaybackSpeed,
      toggleSpeedMenu,
      resetHideTimer
    } = useVideoPlayer(videoRef, containerRef, callbacks);
    const rootClasses = useMemo(
      () => buildVideoPlayerClasses(aspectRatio, variant, color, state.isFullscreen, className),
      [aspectRatio, variant, color, state.isFullscreen, className]
    );
    const progressPercent = getProgressPercent(state.currentTime, state.duration);
    const handleProgressClick = useCallback(
      (e) => {
        const bar = progressRef.current;
        if (!bar || !state.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        seek(ratio * state.duration);
      },
      [seek, state.duration]
    );
    const handleKeyDown = useCallback(
      (e) => {
        switch (e.key) {
          case " ":
            e.preventDefault();
            togglePlay();
            break;
          case "m":
          case "M":
            toggleMute();
            break;
          case "f":
          case "F":
            toggleFullscreen();
            break;
          case "ArrowLeft":
            e.preventDefault();
            seekRelative(-5);
            break;
          case "ArrowRight":
            e.preventDefault();
            seekRelative(5);
            break;
        }
        resetHideTimer();
      },
      [togglePlay, toggleMute, toggleFullscreen, seekRelative, resetHideTimer]
    );
    const handleVolumeChange = useCallback(
      (e) => {
        setVolume(parseFloat(e.target.value));
      },
      [setVolume]
    );
    const VolumeIcon = state.isMuted || state.volume === 0 ? VolumeX : state.volume < 0.5 ? Volume1 : Volume2;
    const containerStyle = {
      ...style,
      ...width ? { width } : {},
      ...height ? { height } : {}
    };
    const isMinimal = variant === "minimal";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: setRefs,
        className: rootClasses,
        style: containerStyle,
        onMouseMove: resetHideTimer,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: "application",
        "aria-label": "Video player",
        ...rest,
        children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              ref: videoRef,
              className: "w3f-video-player__video",
              src: sanitizeUrl(src),
              poster: sanitizeUrl(poster),
              autoPlay,
              muted,
              loop,
              playsInline: true,
              onClick: togglePlay
            }
          ),
          controls && !state.isPlaying && /* @__PURE__ */ jsx(
            "button",
            {
              className: "w3f-video-player__overlay-btn",
              onClick: togglePlay,
              "aria-label": "Play",
              type: "button",
              children: /* @__PURE__ */ jsx(Play, { size: 48 })
            }
          ),
          controls && /* @__PURE__ */ jsxs(
            "div",
            {
              className: [
                "w3f-video-player__controls",
                state.controlsVisible ? "w3f-video-player__controls--visible" : ""
              ].filter(Boolean).join(" "),
              children: [
                showProgress && /* @__PURE__ */ jsx(
                  "div",
                  {
                    ref: progressRef,
                    className: "w3f-video-player__progress",
                    onClick: handleProgressClick,
                    role: "slider",
                    "aria-label": "Seek",
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": Math.round(progressPercent),
                    children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w3f-video-player__progress-fill",
                        style: { width: `${progressPercent}%` }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "w3f-video-player__controls-row", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "w3f-video-player__btn",
                      onClick: togglePlay,
                      "aria-label": state.isPlaying ? "Pause" : "Play",
                      type: "button",
                      children: state.isPlaying ? /* @__PURE__ */ jsx(Pause, { size: 18 }) : /* @__PURE__ */ jsx(Play, { size: 18 })
                    }
                  ),
                  !isMinimal && /* @__PURE__ */ jsxs("span", { className: "w3f-video-player__time", children: [
                    formatTime(state.currentTime),
                    " / ",
                    formatTime(state.duration)
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "w3f-video-player__spacer" }),
                  showVolume && !isMinimal && /* @__PURE__ */ jsxs("div", { className: "w3f-video-player__volume", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "w3f-video-player__btn",
                        onClick: toggleMute,
                        "aria-label": state.isMuted ? "Unmute" : "Mute",
                        type: "button",
                        children: /* @__PURE__ */ jsx(VolumeIcon, { size: 18 })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        className: "w3f-video-player__volume-slider",
                        type: "range",
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: state.isMuted ? 0 : state.volume,
                        onChange: handleVolumeChange,
                        "aria-label": "Volume"
                      }
                    )
                  ] }),
                  showPlaybackSpeed && !isMinimal && /* @__PURE__ */ jsxs("div", { className: "w3f-video-player__speed", children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "w3f-video-player__btn w3f-video-player__speed-btn",
                        onClick: toggleSpeedMenu,
                        "aria-label": "Playback speed",
                        type: "button",
                        children: [
                          state.playbackSpeed,
                          "x"
                        ]
                      }
                    ),
                    state.speedMenuOpen && /* @__PURE__ */ jsx("div", { className: "w3f-video-player__speed-menu", children: playbackSpeeds.map((speed) => /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: [
                          "w3f-video-player__speed-option",
                          state.playbackSpeed === speed ? "w3f-video-player__speed-option--active" : ""
                        ].filter(Boolean).join(" "),
                        onClick: () => setPlaybackSpeed(speed),
                        type: "button",
                        children: [
                          speed,
                          "x"
                        ]
                      },
                      speed
                    )) })
                  ] }),
                  showFullscreen && /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "w3f-video-player__btn",
                      onClick: toggleFullscreen,
                      "aria-label": state.isFullscreen ? "Exit fullscreen" : "Fullscreen",
                      type: "button",
                      children: state.isFullscreen ? /* @__PURE__ */ jsx(Minimize, { size: 18 }) : /* @__PURE__ */ jsx(Maximize, { size: 18 })
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";
var VideoPlayer_default = VideoPlayer;
export {
  VideoPlayer,
  VideoPlayer_default as default
};
//# sourceMappingURL=VideoPlayer.js.map
