import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import VideoPlayer from '../VideoPlayer';

// Mock HTMLMediaElement methods (jsdom doesn't support them)
beforeAll(() => {
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = vi.fn();
});

describe('VideoPlayer', () => {
  const defaultSrc = 'https://example.com/video.mp4';

  it('renders without crashing', () => {
    const { container } = render(<VideoPlayer src={defaultSrc} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('has displayName set', () => {
    expect(VideoPlayer.displayName).toBe('VideoPlayer');
  });

  it('forwards ref to the container div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<VideoPlayer src={defaultSrc} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies the base class', () => {
    const { container } = render(<VideoPlayer src={defaultSrc} />);
    expect(container.firstChild).toHaveClass('w3f-video-player');
  });

  it('applies variant classes', () => {
    const { container: c1 } = render(<VideoPlayer src={defaultSrc} variant="cinema" />);
    expect(c1.firstChild).toHaveClass('w3f-video-player--cinema');

    const { container: c2 } = render(<VideoPlayer src={defaultSrc} variant="minimal" />);
    expect(c2.firstChild).toHaveClass('w3f-video-player--minimal');
  });

  it('applies color classes', () => {
    const { container: c1 } = render(<VideoPlayer src={defaultSrc} color="secondary" />);
    expect(c1.firstChild).toHaveClass('w3f-video-player--secondary');

    const { container: c2 } = render(<VideoPlayer src={defaultSrc} color="danger" />);
    expect(c2.firstChild).toHaveClass('w3f-video-player--danger');
  });

  it('renders a video element with the given src', () => {
    render(<VideoPlayer src={defaultSrc} />);
    const video = document.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.getAttribute('src')).toBe(defaultSrc);
  });

  it('renders controls when controls=true (default)', () => {
    render(<VideoPlayer src={defaultSrc} controls />);
    // Controls bar should be present
    const controlsEl = document.querySelector('.w3f-video-player__controls');
    expect(controlsEl).toBeTruthy();
  });

  it('hides controls when controls=false', () => {
    render(<VideoPlayer src={defaultSrc} controls={false} />);
    const controlsEl = document.querySelector('.w3f-video-player__controls');
    expect(controlsEl).toBeNull();
  });

  it('applies aspect ratio class', () => {
    const { container: c1 } = render(<VideoPlayer src={defaultSrc} aspectRatio="4:3" />);
    expect(c1.firstChild).toHaveClass('w3f-video-player--4-3');

    const { container: c2 } = render(<VideoPlayer src={defaultSrc} aspectRatio="21:9" />);
    expect(c2.firstChild).toHaveClass('w3f-video-player--21-9');

    const { container: c3 } = render(<VideoPlayer src={defaultSrc} aspectRatio="1:1" />);
    expect(c3.firstChild).toHaveClass('w3f-video-player--1-1');
  });

  it('applies custom className', () => {
    const { container } = render(<VideoPlayer src={defaultSrc} className="my-custom" />);
    expect(container.firstChild).toHaveClass('my-custom');
  });

  it('has correct aria attributes', () => {
    render(<VideoPlayer src={defaultSrc} />);
    const root = screen.getByRole('application');
    expect(root).toHaveAttribute('aria-label', 'Video player');
  });

  it('renders poster on the video element', () => {
    render(<VideoPlayer src={defaultSrc} poster="https://example.com/poster.jpg" />);
    const video = document.querySelector('video');
    expect(video?.getAttribute('poster')).toBe('https://example.com/poster.jpg');
  });
});
