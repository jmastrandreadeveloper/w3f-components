import { useState, useCallback, useRef, useEffect } from "react";
import { CONTROLS_HIDE_DELAY } from "./VideoPlayer.constants";
function useVideoPlayer(videoRef, containerRef, callbacks) {
  const [state, setState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    playbackSpeed: 1,
    controlsVisible: true,
    speedMenuOpen: false
  });
  const hideTimerRef = useRef(null);
  const resetHideTimer = useCallback(() => {
    setState((s) => ({ ...s, controlsVisible: true }));
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setState((s) => s.isPlaying ? { ...s, controlsVisible: false, speedMenuOpen: false } : s);
    }, CONTROLS_HIDE_DELAY);
  }, []);
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, [videoRef]);
  const seek = useCallback(
    (time) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(time, video.duration || 0));
    },
    [videoRef]
  );
  const seekRelative = useCallback(
    (delta) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(video.currentTime + delta, video.duration || 0));
    },
    [videoRef]
  );
  const setVolume = useCallback(
    (vol) => {
      const video = videoRef.current;
      if (!video) return;
      const clamped = Math.max(0, Math.min(1, vol));
      video.volume = clamped;
      video.muted = clamped === 0;
      setState((s) => ({ ...s, volume: clamped, isMuted: clamped === 0 }));
    },
    [videoRef]
  );
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setState((s) => ({ ...s, isMuted: video.muted }));
  }, [videoRef]);
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [containerRef]);
  const setPlaybackSpeed = useCallback(
    (speed) => {
      const video = videoRef.current;
      if (!video) return;
      video.playbackRate = speed;
      setState((s) => ({ ...s, playbackSpeed: speed, speedMenuOpen: false }));
    },
    [videoRef]
  );
  const toggleSpeedMenu = useCallback(() => {
    setState((s) => ({ ...s, speedMenuOpen: !s.speedMenuOpen }));
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => {
      setState((s) => ({ ...s, isPlaying: true }));
      callbacks?.onPlay?.();
    };
    const onPause = () => {
      setState((s) => ({ ...s, isPlaying: false, controlsVisible: true }));
      callbacks?.onPause?.();
    };
    const onEnded = () => {
      setState((s) => ({ ...s, isPlaying: false, controlsVisible: true }));
      callbacks?.onEnded?.();
    };
    const onTimeUpdate = () => {
      setState((s) => ({
        ...s,
        currentTime: video.currentTime,
        duration: video.duration || 0
      }));
      callbacks?.onTimeUpdate?.(video.currentTime, video.duration || 0);
    };
    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: video.duration || 0 }));
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [videoRef, callbacks]);
  useEffect(() => {
    const onFsChange = () => {
      setState((s) => ({ ...s, isFullscreen: !!document.fullscreenElement }));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);
  return {
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
  };
}
export {
  useVideoPlayer
};
//# sourceMappingURL=VideoPlayer.hooks.js.map
