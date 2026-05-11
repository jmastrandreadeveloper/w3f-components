import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';
import BadgeWrapper from '../BadgeWrapper';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>5</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('w3f-badge');
    expect(badge).toHaveClass('w3f-bg-primary');
    expect(badge).toHaveClass('w3f-badge-md');
  });

  it('has displayName set', () => {
    expect(Badge.displayName).toBe('Badge');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>1</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies color classes', () => {
    const { rerender } = render(<Badge color="success">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-bg-success');

    rerender(<Badge color="danger">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-bg-danger');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-sm');

    rerender(<Badge size="lg">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-lg');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Badge variant="outline">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-outline');

    rerender(<Badge variant="soft">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-soft');

    rerender(<Badge variant="dot" />);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-dot');
  });

  it('applies position class', () => {
    render(<Badge position="top-right">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('badge-top-right');
  });

  it('applies pulse class', () => {
    render(<Badge pulse>1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-pulse');
  });

  it('applies animate class', () => {
    render(<Badge animate>1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('w3f-badge-animate');
  });

  it('returns null when invisible', () => {
    const { container } = render(<Badge invisible>5</Badge>);
    expect(container.firstElementChild).toBeNull();
  });

  it('caps content at max', () => {
    render(<Badge max={99}>{150}</Badge>);
    expect(screen.getByRole('status')).toHaveTextContent('99+');
  });

  it('applies unstyled class', () => {
    render(<Badge unstyled>1</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toHaveClass('w3f-badge--unstyled');
    expect(badge).not.toHaveClass('w3f-bg-primary');
  });

  it('applies custom className', () => {
    render(<Badge className="my-badge">1</Badge>);
    expect(screen.getByRole('status')).toHaveClass('my-badge');
  });
});

describe('BadgeWrapper', () => {
  it('has displayName set', () => {
    expect(BadgeWrapper.displayName).toBe('BadgeWrapper');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <BadgeWrapper ref={ref} badgeContent={5}>
        <span>child</span>
      </BadgeWrapper>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with w3f-badge-wrapper class', () => {
    const { container } = render(
      <BadgeWrapper badgeContent={3}>
        <span>child</span>
      </BadgeWrapper>,
    );
    expect(container.firstElementChild).toHaveClass('w3f-badge-wrapper');
  });

  it('renders badge content', () => {
    render(
      <BadgeWrapper badgeContent={7}>
        <span>child</span>
      </BadgeWrapper>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('7');
  });

  it('hides badge when badgeContent is 0 without showZero', () => {
    const { container } = render(
      <BadgeWrapper badgeContent={0}>
        <span>child</span>
      </BadgeWrapper>,
    );
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it('shows badge when badgeContent is 0 with showZero', () => {
    render(
      <BadgeWrapper badgeContent={0} badgeProps={{ showZero: true }}>
        <span>child</span>
      </BadgeWrapper>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('0');
  });
});
