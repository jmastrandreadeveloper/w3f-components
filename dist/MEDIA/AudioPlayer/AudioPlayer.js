"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback, useMemo } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1
} from "lucide-react";
import { AUDIO_DEFAULTS } from "./AudioPlayer.constants";
import { useAudioPlayer } from "./AudioPlayer.hooks";
import { buildAudioPlayerClasses, formatTime, getProgressPercent } from "./AudioPlayer.utils";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const AudioPlayer = React.forwardRef(
  ({
    src,
    title,
    artist,
    cover,
    autoPlay = AUDIO_DEFAULTS.autoPlay,
    loop = AUDIO_DEFAULTS.loop,
    variant = AUDIO_DEFAULTS.variant,
    color = AUDIO_DEFAULTS.color,
    showVolume = AUDIO_DEFAULTS.showVolume,
    showPlaybackSpeed = AUDIO_DEFAULTS.showPlaybackSpeed,
    showProgress = AUDIO_DEFAULTS.showProgress,
    playbackSpeeds = AUDIO_DEFAULTS.playbackSpeeds,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    className = AUDIO_DEFAULTS.className,
    ...rest
  }, ref) => {
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const callbacks = useMemo(
      () => ({ onPlay, onPause, onEnded, onTimeUpdate }),
      [onPlay, onPause, onEnded, onTimeUpdate]
    );
    const {
      state,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      setPlaybackSpeed,
      toggleSpeedMenu
    } = useAudioPlayer(audioRef, callbacks);
    const rootClasses = useMemo(
      () => buildAudioPlayerClasses(variant, color, className),
      [variant, color, className]
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
        }
      },
      [togglePlay, toggleMute]
    );
    const handleVolumeChange = useCallback(
      (e) => {
        setVolume(parseFloat(e.target.value));
      },
      [setVolume]
    );
    const VolumeIcon = state.isMuted || state.volume === 0 ? VolumeX : state.volume < 0.5 ? Volume1 : Volume2;
    const isCompact = variant === "compact";
    const isCard = variant === "card";
    const isMinimal = variant === "minimal";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: rootClasses,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: "application",
        "aria-label": title ? `Audio player: ${title}` : "Audio player",
        ...rest,
        children: [
          /* @__PURE__ */ jsx(
            "audio",
            {
              ref: audioRef,
              src: sanitizeUrl(src),
              autoPlay,
              loop,
              preload: "metadata"
            }
          ),
          isCard && cover && /* @__PURE__ */ jsx("div", { className: "w3f-audio-player__cover", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: sanitizeUrl(cover),
              alt: title ? `${title} cover` : "Album cover",
              className: "w3f-audio-player__cover-img"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "w3f-audio-player__body", children: [
            (title || artist) && !isMinimal && /* @__PURE__ */ jsxs("div", { className: "w3f-audio-player__info", children: [
              title && /* @__PURE__ */ jsx("span", { className: "w3f-audio-player__title", children: title }),
              artist && /* @__PURE__ */ jsx("span", { className: "w3f-audio-player__artist", children: artist })
            ] }),
            showProgress && /* @__PURE__ */ jsxs("div", { className: "w3f-audio-player__progress-row", children: [
              !isCompact && /* @__PURE__ */ jsx("span", { className: "w3f-audio-player__time", children: formatTime(state.currentTime) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: progressRef,
                  className: "w3f-audio-player__progress",
                  onClick: handleProgressClick,
                  role: "slider",
                  "aria-label": "Seek",
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  "aria-valuenow": Math.round(progressPercent),
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w3f-audio-player__progress-fill",
                      style: { width: `${progressPercent}%` }
                    }
                  )
                }
              ),
              !isCompact && /* @__PURE__ */ jsx("span", { className: "w3f-audio-player__time", children: formatTime(state.duration) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w3f-audio-player__controls", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "w3f-audio-player__btn w3f-audio-player__play-btn",
                  onClick: togglePlay,
                  "aria-label": state.isPlaying ? "Pause" : "Play",
                  type: "button",
                  children: state.isPlaying ? /* @__PURE__ */ jsx(Pause, { size: isCompact ? 16 : 20 }) : /* @__PURE__ */ jsx(Play, { size: isCompact ? 16 : 20 })
                }
              ),
              isCompact && /* @__PURE__ */ jsxs("span", { className: "w3f-audio-player__time w3f-audio-player__time--inline", children: [
                formatTime(state.currentTime),
                " / ",
                formatTime(state.duration)
              ] }),
              isCompact && title && /* @__PURE__ */ jsx("span", { className: "w3f-audio-player__title w3f-audio-player__title--inline", children: title }),
              /* @__PURE__ */ jsx("span", { className: "w3f-audio-player__spacer" }),
              showVolume && !isMinimal && /* @__PURE__ */ jsxs("div", { className: "w3f-audio-player__volume", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "w3f-audio-player__btn",
                    onClick: toggleMute,
                    "aria-label": state.isMuted ? "Unmute" : "Mute",
                    type: "button",
                    children: /* @__PURE__ */ jsx(VolumeIcon, { size: isCompact ? 14 : 18 })
                  }
                ),
                !isCompact && /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "w3f-audio-player__volume-slider",
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
              showPlaybackSpeed && !isMinimal && !isCompact && /* @__PURE__ */ jsxs("div", { className: "w3f-audio-player__speed", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "w3f-audio-player__btn w3f-audio-player__speed-btn",
                    onClick: toggleSpeedMenu,
                    "aria-label": "Playback speed",
                    type: "button",
                    children: [
                      state.playbackSpeed,
                      "x"
                    ]
                  }
                ),
                state.speedMenuOpen && /* @__PURE__ */ jsx("div", { className: "w3f-audio-player__speed-menu", children: playbackSpeeds.map((speed) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: [
                      "w3f-audio-player__speed-option",
                      state.playbackSpeed === speed ? "w3f-audio-player__speed-option--active" : ""
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
              ] })
            ] })
          ] })
        ]
      }
    );
  }
);
AudioPlayer.displayName = "AudioPlayer";
var AudioPlayer_default = AudioPlayer;
export {
  AudioPlayer,
  AudioPlayer_default as default
};
//# sourceMappingURL=AudioPlayer.js.map
