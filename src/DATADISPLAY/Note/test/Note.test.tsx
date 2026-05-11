import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from '../Note';

describe('Note', () => {
  it('renders with default classes', () => {
    const { container } = render(<Note>Message</Note>);
    const note = container.firstElementChild as HTMLElement;
    expect(note).toHaveClass('w3f-note');
    expect(note).toHaveClass('w3f-note-info');
    expect(note).toHaveClass('w3f-round-md');
    expect(note).toHaveClass('w3f-border-l-4');
  });

  it('has displayName set', () => {
    expect(Note.displayName).toBe('Note');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Note ref={ref}>Text</Note>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders children content', () => {
    render(<Note>Alert message</Note>);
    expect(screen.getByRole('alert')).toHaveTextContent('Alert message');
  });

  it('has role=alert', () => {
    render(<Note>Text</Note>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies type classes', () => {
    const { container: success } = render(<Note type="success">OK</Note>);
    expect(success.firstElementChild).toHaveClass('w3f-note-success');

    const { container: warning } = render(<Note type="warning">Warn</Note>);
    expect(warning.firstElementChild).toHaveClass('w3f-note-warning');

    const { container: danger } = render(<Note type="danger">Error</Note>);
    expect(danger.firstElementChild).toHaveClass('w3f-note-danger');
  });

  it('applies shadow class', () => {
    const { container } = render(<Note shadow="lg">S</Note>);
    expect(container.firstElementChild).toHaveClass('w3f-shadow-lg');
  });

  it('applies fullBorder class', () => {
    const { container } = render(<Note fullBorder>B</Note>);
    expect(container.firstElementChild).toHaveClass('w3f-border-full');
    // Should not have individual border class
    expect(container.firstElementChild).not.toHaveClass('w3f-border-l-4');
  });

  it('applies border side classes', () => {
    const { container } = render(<Note border="top">T</Note>);
    expect(container.firstElementChild).toHaveClass('w3f-border-t-4');
  });

  it('renders icon', () => {
    const { container } = render(
      <Note icon={<span data-testid="icon">!</span>}>With icon</Note>,
    );
    expect(container.querySelector('.w3f-note-icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders dismiss button and calls onDismiss', async () => {
    const onDismiss = vi.fn();
    render(<Note dismissible onDismiss={onDismiss}>Dismissible</Note>);
    const dismissBtn = screen.getByLabelText('Cerrar');
    expect(dismissBtn).toBeInTheDocument();
    await userEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Note className="my-note">N</Note>);
    expect(container.firstElementChild).toHaveClass('my-note');
  });
});
