import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Image from '../Image';

describe('Image', () => {
  it('renders with base class', () => {
    render(<Image src="photo.jpg" alt="Photo" />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('w3f-image-base');
  });

  it('has displayName set', () => {
    expect(Image.displayName).toBe('Image');
  });

  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Image ref={ref} src="photo.jpg" alt="Photo" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('w3f-image-wrapper');
  });

  it('renders img with src and alt', () => {
    render(<Image src="photo.jpg" alt="A photo" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'photo.jpg');
    expect(img).toHaveAttribute('alt', 'A photo');
  });

  it('applies circle class', () => {
    render(<Image src="p.jpg" alt="P" circle />);
    expect(screen.getByRole('img')).toHaveClass('w3f-rounded-full');
  });

  it('applies rounded class', () => {
    render(<Image src="p.jpg" alt="P" rounded="lg" />);
    expect(screen.getByRole('img')).toHaveClass('w3f-rounded-lg');
  });

  it('applies border class', () => {
    render(<Image src="p.jpg" alt="P" border />);
    expect(screen.getByRole('img')).toHaveClass('w3f-image-border');
  });

  it('applies shadow class', () => {
    render(<Image src="p.jpg" alt="P" shadow="md" />);
    expect(screen.getByRole('img')).toHaveClass('w3f-shadow-md');
  });

  it('applies filter class', () => {
    render(<Image src="p.jpg" alt="P" filter="grayscale" />);
    expect(screen.getByRole('img')).toHaveClass('w3f-image-filter-grayscale');
  });

  it('applies hover effect class', () => {
    render(<Image src="p.jpg" alt="P" hoverEffect="zoom" />);
    expect(screen.getByRole('img')).toHaveClass('w3f-image-hover-zoom');
  });

  it('applies custom className to img', () => {
    render(<Image src="p.jpg" alt="P" className="my-img" />);
    expect(screen.getByRole('img')).toHaveClass('my-img');
  });

  it('applies wrapperClassName', () => {
    const { container } = render(<Image src="p.jpg" alt="P" wrapperClassName="my-wrap" />);
    expect(container.firstElementChild).toHaveClass('w3f-image-wrapper');
    expect(container.firstElementChild).toHaveClass('my-wrap');
  });
});
