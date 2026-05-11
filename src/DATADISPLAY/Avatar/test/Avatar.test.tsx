import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar, AvatarGroup } from '../Avatar';

describe('Avatar', () => {
  it('renders with default props', () => {
    const { container } = render(<Avatar />);
    const avatar = container.firstElementChild as HTMLElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('w3f-avatar');
    expect(avatar).toHaveClass('w3f-avatar-circle');
    expect(avatar).toHaveClass('w3f-avatar-medium');
  });

  it('has displayName set', () => {
    expect(Avatar.displayName).toBe('Avatar');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders size classes correctly', () => {
    const { container: small } = render(<Avatar size="small" />);
    expect(small.firstElementChild).toHaveClass('w3f-avatar-small');

    const { container: large } = render(<Avatar size="large" />);
    expect(large.firstElementChild).toHaveClass('w3f-avatar-large');

    const { container: xlarge } = render(<Avatar size="xlarge" />);
    expect(xlarge.firstElementChild).toHaveClass('w3f-avatar-xlarge');
  });

  it('renders color class when no src', () => {
    const { container } = render(<Avatar color="blue" />);
    expect(container.firstElementChild).toHaveClass('w3f-avatar-blue');
  });

  it('does not render color class when src is provided', () => {
    const { container } = render(<Avatar src="test.jpg" color="blue" />);
    expect(container.firstElementChild).not.toHaveClass('w3f-avatar-blue');
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="test.jpg" alt="Test" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test');
    expect(img).toHaveClass('w3f-avatar-img');
  });

  it('renders children text when no src', () => {
    const { container } = render(<Avatar>AB</Avatar>);
    const textEl = container.querySelector('.w3f-avatar-text');
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent('AB');
  });

  it('renders fallback "?" when no src and no children', () => {
    const { container } = render(<Avatar />);
    const textEl = container.querySelector('.w3f-avatar-text');
    expect(textEl).toHaveTextContent('?');
  });

  it('applies hoverable class', () => {
    const { container } = render(<Avatar hoverable />);
    expect(container.firstElementChild).toHaveClass('w3f-avatar-hoverable');
  });

  it('renders status indicator', () => {
    const { container } = render(<Avatar status="online" />);
    expect(container.querySelector('.w3f-avatar-wrapper')).toBeInTheDocument();
    expect(container.querySelector('.w3f-avatar-status-online')).toBeInTheDocument();
  });

  it('renders badge with capping at 99+', () => {
    const { container } = render(<Avatar badge={150} />);
    expect(container.querySelector('.w3f-avatar-badge')).toHaveTextContent('99+');
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar className="my-custom" />);
    expect(container.firstElementChild).toHaveClass('my-custom');
  });
});

describe('AvatarGroup', () => {
  it('has displayName set', () => {
    expect(AvatarGroup.displayName).toBe('AvatarGroup');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <AvatarGroup ref={ref}>
        <Avatar>A</Avatar>
      </AvatarGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with w3f-avatar-group class', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>,
    );
    expect(container.firstElementChild).toHaveClass('w3f-avatar-group');
  });

  it('limits visible avatars via max prop and shows overflow', () => {
    const { container } = render(
      <AvatarGroup max={2}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <Avatar>D</Avatar>
      </AvatarGroup>,
    );
    // 2 visible + 1 overflow avatar = 3 child divs
    const group = container.firstElementChild!;
    // The overflow avatar shows "+2"
    expect(group.textContent).toContain('+2');
  });
});
