import React, { useRef, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
} from 'lucide-react';
import type { VideoPlayerProps } from './VideoPlayer.types';
import { VIDEO_DEFAULTS } from './VideoPlayer.constants';
import { useVideoPlayer } from './VideoPlayer.hooks';
import { buildVideoPlayerClasses, formatTime, getProgressPercent } from './VideoPlayer.utils';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

export type {
  VideoPlayerProps,
  VideoAspectRatio,
  VideoVariant,
  VideoColor,
} from './VideoPlayer.types';

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
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
      playbackSpeeds = VIDEO_DEFAULTS.playbackSpeeds as unknown as number[],
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      className = VIDEO_DEFAULTS.className,
      style,
      ...rest
    },
    ref,
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Merge forwarded ref with internal container ref
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const callbacks = useMemo(
      () => ({ onPlay, onPause, onEnded, onTimeUpdate }),
      [onPlay, onPause, onEnded, onTimeUpdate],
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
      resetHideTimer,
    } = useVideoPlayer(videoRef, containerRef, callbacks);

    const rootClasses = useMemo(
      () => buildVideoPlayerClasses(aspectRatio, variant, color, state.isFullscreen, className),
      [aspectRatio, variant, color, state.isFullscreen, className],
    );

    const progressPercent = getProgressPercent(state.currentTime, state.duration);

    const handleProgressClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const bar = progressRef.current;
        if (!bar || !state.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        seek(ratio * state.duration);
      },
      [seek, state.duration],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case ' ':
            e.preventDefault();
            togglePlay();
            break;
          case 'm':
          case 'M':
            toggleMute();
            break;
          case 'f':
          case 'F':
            toggleFullscreen();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            seekRelative(-5);
            break;
          case 'ArrowRight':
            e.preventDefault();
            seekRelative(5);
            break;
        }
        resetHideTimer();
      },
      [togglePlay, toggleMute, toggleFullscreen, seekRelative, resetHideTimer],
    );

    const handleVolumeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
      },
      [setVolume],
    );

    const VolumeIcon = state.isMuted || state.volume === 0
      ? VolumeX
      : state.volume < 0.5
        ? Volume1
        : Volume2;

    const containerStyle: React.CSSProperties = {
      ...style,
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    };

    const isMinimal = variant === 'minimal';

    return (
      <div
        ref={setRefs}
        className={rootClasses}
        style={containerStyle}
        onMouseMove={resetHideTimer}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="application"
        aria-label="Video player"
        {...rest}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          className="w3f-video-player__video"
          src={sanitizeUrl(src)}
          poster={sanitizeUrl(poster)}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          onClick={togglePlay}
        />

        {/* Center play overlay (shown when paused) */}
        {controls && !state.isPlaying && (
          <button
            className="w3f-video-player__overlay-btn"
            onClick={togglePlay}
            aria-label="Play"
            type="button"
          >
            <Play size={48} />
          </button>
        )}

        {/* Bottom controls bar */}
        {controls && (
          <div
            className={[
              'w3f-video-player__controls',
              state.controlsVisible ? 'w3f-video-player__controls--visible' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {/* Progress bar */}
            {showProgress && (
              <div
                ref={progressRef}
                className="w3f-video-player__progress"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPercent)}
              >
                <div
                  className="w3f-video-player__progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            <div className="w3f-video-player__controls-row">
              {/* Play/Pause */}
              <button
                className="w3f-video-player__btn"
                onClick={togglePlay}
                aria-label={state.isPlaying ? 'Pause' : 'Play'}
                type="button"
              >
                {state.isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              {/* Time display */}
              {!isMinimal && (
                <span className="w3f-video-player__time">
                  {formatTime(state.currentTime)} / {formatTime(state.duration)}
                </span>
              )}

              {/* Spacer */}
              <span className="w3f-video-player__spacer" />

              {/* Volume */}
              {showVolume && !isMinimal && (
                <div className="w3f-video-player__volume">
                  <button
                    className="w3f-video-player__btn"
                    onClick={toggleMute}
                    aria-label={state.isMuted ? 'Unmute' : 'Mute'}
                    type="button"
                  >
                    <VolumeIcon size={18} />
                  </button>
                  <input
                    className="w3f-video-player__volume-slider"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={state.isMuted ? 0 : state.volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                  />
                </div>
              )}

              {/* Playback speed */}
              {showPlaybackSpeed && !isMinimal && (
                <div className="w3f-video-player__speed">
                  <button
                    className="w3f-video-player__btn w3f-video-player__speed-btn"
                    onClick={toggleSpeedMenu}
                    aria-label="Playback speed"
                    type="button"
                  >
                    {state.playbackSpeed}x
                  </button>
                  {state.speedMenuOpen && (
                    <div className="w3f-video-player__speed-menu">
                      {(playbackSpeeds as number[]).map((speed) => (
                        <button
                          key={speed}
                          className={[
                            'w3f-video-player__speed-option',
                            state.playbackSpeed === speed
                              ? 'w3f-video-player__speed-option--active'
                              : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => setPlaybackSpeed(speed)}
                          type="button"
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fullscreen */}
              {showFullscreen && (
                <button
                  className="w3f-video-player__btn"
                  onClick={toggleFullscreen}
                  aria-label={state.isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  type="button"
                >
                  {state.isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

VideoPlayer.displayName = 'VideoPlayer';

export { VideoPlayer };
export default VideoPlayer;
