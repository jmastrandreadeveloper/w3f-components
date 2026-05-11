import React, { useRef, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
} from 'lucide-react';
import type { AudioPlayerProps } from './AudioPlayer.types';
import { AUDIO_DEFAULTS } from './AudioPlayer.constants';
import { useAudioPlayer } from './AudioPlayer.hooks';
import { buildAudioPlayerClasses, formatTime, getProgressPercent } from './AudioPlayer.utils';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

export type {
  AudioPlayerProps,
  AudioVariant,
  AudioColor,
} from './AudioPlayer.types';

const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
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
      playbackSpeeds = AUDIO_DEFAULTS.playbackSpeeds as unknown as number[],
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      className = AUDIO_DEFAULTS.className,
      ...rest
    },
    ref,
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const callbacks = useMemo(
      () => ({ onPlay, onPause, onEnded, onTimeUpdate }),
      [onPlay, onPause, onEnded, onTimeUpdate],
    );

    const {
      state,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      setPlaybackSpeed,
      toggleSpeedMenu,
    } = useAudioPlayer(audioRef, callbacks);

    const rootClasses = useMemo(
      () => buildAudioPlayerClasses(variant, color, className),
      [variant, color, className],
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
        }
      },
      [togglePlay, toggleMute],
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

    const isCompact = variant === 'compact';
    const isCard = variant === 'card';
    const isMinimal = variant === 'minimal';

    return (
      <div
        ref={ref}
        className={rootClasses}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="application"
        aria-label={title ? `Audio player: ${title}` : 'Audio player'}
        {...rest}
      >
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={sanitizeUrl(src)}
          autoPlay={autoPlay}
          loop={loop}
          preload="metadata"
        />

        {/* Cover art (card variant) */}
        {isCard && cover && (
          <div className="w3f-audio-player__cover">
            <img
              src={sanitizeUrl(cover)}
              alt={title ? `${title} cover` : 'Album cover'}
              className="w3f-audio-player__cover-img"
            />
          </div>
        )}

        {/* Main content area */}
        <div className="w3f-audio-player__body">
          {/* Track info */}
          {(title || artist) && !isMinimal && (
            <div className="w3f-audio-player__info">
              {title && <span className="w3f-audio-player__title">{title}</span>}
              {artist && <span className="w3f-audio-player__artist">{artist}</span>}
            </div>
          )}

          {/* Progress bar */}
          {showProgress && (
            <div className="w3f-audio-player__progress-row">
              {!isCompact && (
                <span className="w3f-audio-player__time">
                  {formatTime(state.currentTime)}
                </span>
              )}
              <div
                ref={progressRef}
                className="w3f-audio-player__progress"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPercent)}
              >
                <div
                  className="w3f-audio-player__progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {!isCompact && (
                <span className="w3f-audio-player__time">
                  {formatTime(state.duration)}
                </span>
              )}
            </div>
          )}

          {/* Controls row */}
          <div className="w3f-audio-player__controls">
            {/* Play/Pause */}
            <button
              className="w3f-audio-player__btn w3f-audio-player__play-btn"
              onClick={togglePlay}
              aria-label={state.isPlaying ? 'Pause' : 'Play'}
              type="button"
            >
              {state.isPlaying ? <Pause size={isCompact ? 16 : 20} /> : <Play size={isCompact ? 16 : 20} />}
            </button>

            {/* Time (compact shows inline) */}
            {isCompact && (
              <span className="w3f-audio-player__time w3f-audio-player__time--inline">
                {formatTime(state.currentTime)} / {formatTime(state.duration)}
              </span>
            )}

            {/* Title inline for compact */}
            {isCompact && title && (
              <span className="w3f-audio-player__title w3f-audio-player__title--inline">
                {title}
              </span>
            )}

            {/* Spacer */}
            <span className="w3f-audio-player__spacer" />

            {/* Volume */}
            {showVolume && !isMinimal && (
              <div className="w3f-audio-player__volume">
                <button
                  className="w3f-audio-player__btn"
                  onClick={toggleMute}
                  aria-label={state.isMuted ? 'Unmute' : 'Mute'}
                  type="button"
                >
                  <VolumeIcon size={isCompact ? 14 : 18} />
                </button>
                {!isCompact && (
                  <input
                    className="w3f-audio-player__volume-slider"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={state.isMuted ? 0 : state.volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                  />
                )}
              </div>
            )}

            {/* Playback speed */}
            {showPlaybackSpeed && !isMinimal && !isCompact && (
              <div className="w3f-audio-player__speed">
                <button
                  className="w3f-audio-player__btn w3f-audio-player__speed-btn"
                  onClick={toggleSpeedMenu}
                  aria-label="Playback speed"
                  type="button"
                >
                  {state.playbackSpeed}x
                </button>
                {state.speedMenuOpen && (
                  <div className="w3f-audio-player__speed-menu">
                    {(playbackSpeeds as number[]).map((speed) => (
                      <button
                        key={speed}
                        className={[
                          'w3f-audio-player__speed-option',
                          state.playbackSpeed === speed
                            ? 'w3f-audio-player__speed-option--active'
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
          </div>
        </div>
      </div>
    );
  },
);

AudioPlayer.displayName = 'AudioPlayer';

export { AudioPlayer };
export default AudioPlayer;
