# VideoPlayer

Custom HTML5 video player with controls overlay, aspect ratio presets, and visual variants. Supports progress bar, volume, fullscreen, and playback speed controls.

## Import

```tsx
import VideoPlayer from 'components/MEDIA/VideoPlayer/VideoPlayer';
```

## Usage

```tsx
<VideoPlayer
  src="/my-video.mp4"
  aspectRatio="16:9"
  variant="default"
  color="primary"
/>
```

### With poster and controls config

```tsx
<VideoPlayer
  src="/my-video.mp4"
  poster="/poster.jpg"
  aspectRatio="16:9"
  showVolume
  showFullscreen
  showPlaybackSpeed
  playbackSpeeds={[0.5, 1, 1.5, 2]}
  onPlay={() => console.log('Playing')}
  onEnded={() => console.log('Ended')}
/>
```

### Cinema variant

```tsx
<VideoPlayer
  src="/movie.mp4"
  variant="cinema"
  aspectRatio="21:9"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | Video source URL |
| `poster` | `string` | `undefined` | Poster image URL |
| `autoPlay` | `boolean` | `false` | Auto-play on mount |
| `muted` | `boolean` | `false` | Start muted |
| `loop` | `boolean` | `false` | Loop playback |
| `controls` | `boolean` | `true` | Show custom controls overlay |
| `width` | `string` | `undefined` | Container width |
| `height` | `string` | `undefined` | Container height |
| `aspectRatio` | `'16:9' \| '4:3' \| '21:9' \| '1:1'` | `undefined` | Aspect ratio preset |
| `variant` | `'default' \| 'minimal' \| 'cinema'` | `'default'` | Visual variant |
| `color` | `'primary' \| 'secondary' \| 'danger' \| 'info'` | `'primary'` | Accent color |
| `showProgress` | `boolean` | `true` | Show progress bar |
| `showVolume` | `boolean` | `true` | Show volume slider |
| `showFullscreen` | `boolean` | `true` | Show fullscreen button |
| `showPlaybackSpeed` | `boolean` | `false` | Show playback speed selector |
| `playbackSpeeds` | `number[]` | `[0.5, 1, 1.5, 2]` | Available playback speeds |
| `onPlay` | `() => void` | `undefined` | Called when playback starts |
| `onPause` | `() => void` | `undefined` | Called when playback pauses |
| `onEnded` | `() => void` | `undefined` | Called when playback ends |
| `onTimeUpdate` | `(currentTime, duration) => void` | `undefined` | Called on time update |
| `className` | `string` | `undefined` | Additional class names |

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--w3f-video-accent` | `var(--w3f-primary)` | Accent color for controls |
| `--w3f-video-bg` | `#000` | Player background |
| `--w3f-video-controls-bg` | `linear-gradient(...)` | Controls bar background gradient |
| `--w3f-video-controls-opacity` | `1` | Controls overlay opacity |
| `--w3f-video-progress-height` | `4px` | Progress bar height |
| `--w3f-video-progress-bg` | `rgba(255,255,255,0.25)` | Progress bar track color |
| `--w3f-video-progress-fill` | `var(--w3f-video-accent)` | Progress bar fill color |
| `--w3f-video-radius` | `8px` | Player border radius |
| `--w3f-video-btn-size` | `36px` | Control button size |
| `--w3f-video-btn-color` | `#fff` | Control button color |
| `--w3f-video-btn-hover-bg` | `rgba(255,255,255,0.15)` | Button hover background |
| `--w3f-video-text-color` | `#fff` | Time text color |
| `--w3f-video-overlay-bg` | `rgba(0,0,0,0.35)` | Center overlay background |
| `--w3f-video-overlay-btn-size` | `64px` | Center play button size |
| `--w3f-video-font-size` | `13px` | Controls font size |
| `--w3f-video-transition` | `0.3s ease` | Transition timing |

## Accessibility

- Keyboard: Space/Enter to play/pause, arrow keys for seek, M to mute
- Focus-visible outline on the player container
- ARIA labels on all control buttons
