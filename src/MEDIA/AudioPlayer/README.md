# AudioPlayer

Custom HTML5 audio player with progress bar, volume controls, and multiple visual variants. Supports cover art display, playback speed, and track metadata.

## Import

```tsx
import AudioPlayer from 'components/MEDIA/AudioPlayer/AudioPlayer';
```

## Usage

```tsx
<AudioPlayer
  src="/track.mp3"
  title="Song Title"
  artist="Artist Name"
/>
```

### Card variant with cover art

```tsx
<AudioPlayer
  src="/track.mp3"
  title="Song Title"
  artist="Artist Name"
  cover="/album-cover.jpg"
  variant="card"
  color="secondary"
/>
```

### Compact variant

```tsx
<AudioPlayer
  src="/track.mp3"
  title="Podcast Episode"
  variant="compact"
  showPlaybackSpeed
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | Audio source URL |
| `title` | `string` | `undefined` | Track title |
| `artist` | `string` | `undefined` | Artist name |
| `cover` | `string` | `undefined` | Cover art URL (used in card variant) |
| `autoPlay` | `boolean` | `false` | Auto-play on mount |
| `loop` | `boolean` | `false` | Loop playback |
| `variant` | `'default' \| 'compact' \| 'card' \| 'minimal'` | `'default'` | Visual variant |
| `color` | `'primary' \| 'secondary' \| 'danger' \| 'info'` | `'primary'` | Accent color |
| `showVolume` | `boolean` | `true` | Show volume control |
| `showPlaybackSpeed` | `boolean` | `false` | Show playback speed selector |
| `showProgress` | `boolean` | `true` | Show progress bar |
| `playbackSpeeds` | `number[]` | `[0.5, 1, 1.5, 2]` | Available playback speeds |
| `onPlay` | `() => void` | `undefined` | Called when playback starts |
| `onPause` | `() => void` | `undefined` | Called when playback pauses |
| `onEnded` | `() => void` | `undefined` | Called when playback ends |
| `onTimeUpdate` | `(currentTime, duration) => void` | `undefined` | Called on time update |
| `className` | `string` | `undefined` | Additional class names |

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--w3f-audio-accent` | `var(--w3f-primary)` | Accent color |
| `--w3f-audio-bg` | `var(--w3f-surface)` | Player background |
| `--w3f-audio-border` | `var(--w3f-border-color)` | Border color |
| `--w3f-audio-radius` | `8px` | Border radius |
| `--w3f-audio-padding` | `12px 16px` | Content padding |
| `--w3f-audio-btn-size` | `36px` | Button size |
| `--w3f-audio-btn-color` | `var(--w3f-text)` | Button color |
| `--w3f-audio-btn-hover-bg` | `rgba(0,0,0,0.06)` | Button hover background |
| `--w3f-audio-play-btn-bg` | `var(--w3f-audio-accent)` | Play button background |
| `--w3f-audio-play-btn-color` | `#fff` | Play button icon color |
| `--w3f-audio-play-btn-size` | `40px` | Play button size |
| `--w3f-audio-text-color` | `var(--w3f-text)` | Primary text color |
| `--w3f-audio-text-secondary` | `var(--w3f-text-secondary)` | Secondary text color |
| `--w3f-audio-progress-height` | `4px` | Progress bar height |
| `--w3f-audio-progress-bg` | `rgba(0,0,0,0.1)` | Progress track color |
| `--w3f-audio-progress-fill` | `var(--w3f-audio-accent)` | Progress fill color |
| `--w3f-audio-cover-size` | `64px` | Cover art size |
| `--w3f-audio-title-size` | `15px` | Title font size |
| `--w3f-audio-transition` | `0.2s ease` | Transition timing |

## Accessibility

- Keyboard: Space/Enter to play/pause, arrow keys for seek
- Focus-visible outline on the player
- ARIA labels on all control buttons
