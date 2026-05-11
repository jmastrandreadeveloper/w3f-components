import { useState, useCallback, useEffect } from 'react';

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackSpeed: number;
  speedMenuOpen: boolean;
}

export function useAudioPlayer(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  callbacks?: {
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
  },
) {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackSpeed: 1,
    speedMenuOpen: false,
  });

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audioRef]);

  const seek = useCallback(
    (time: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    },
    [audioRef],
  );

  const setVolume = useCallback(
    (vol: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const clamped = Math.max(0, Math.min(1, vol));
      audio.volume = clamped;
      audio.muted = clamped === 0;
      setState((s) => ({ ...s, volume: clamped, isMuted: clamped === 0 }));
    },
    [audioRef],
  );

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setState((s) => ({ ...s, isMuted: audio!.muted }));
  }, [audioRef]);

  const setPlaybackSpeed = useCallback(
    (speed: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.playbackRate = speed;
      setState((s) => ({ ...s, playbackSpeed: speed, speedMenuOpen: false }));
    },
    [audioRef],
  );

  const toggleSpeedMenu = useCallback(() => {
    setState((s) => ({ ...s, speedMenuOpen: !s.speedMenuOpen }));
  }, []);

  // Attach audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setState((s) => ({ ...s, isPlaying: true }));
      callbacks?.onPlay?.();
    };
    const onPause = () => {
      setState((s) => ({ ...s, isPlaying: false }));
      callbacks?.onPause?.();
    };
    const onEnded = () => {
      setState((s) => ({ ...s, isPlaying: false }));
      callbacks?.onEnded?.();
    };
    const onTimeUpdate = () => {
      setState((s) => ({
        ...s,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
      callbacks?.onTimeUpdate?.(audio.currentTime, audio.duration || 0);
    };
    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: audio.duration || 0 }));
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [audioRef, callbacks]);

  return {
    state,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setPlaybackSpeed,
    toggleSpeedMenu,
  };
}
