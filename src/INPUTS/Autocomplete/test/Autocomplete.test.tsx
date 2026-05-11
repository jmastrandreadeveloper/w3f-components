import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../Autocomplete';

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

describe('Autocomplete', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a combobox', () => {
    render(<Autocomplete data={items} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders an input', () => {
    render(<Autocomplete data={items} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies container class w3f-autocomplete-container', () => {
    const { container } = render(<Autocomplete data={items} />);
    expect(container.querySelector('.w3f-autocomplete-container')).toBeInTheDocument();
  });

  it('applies base class w3f-autocomplete', () => {
    const { container } = render(<Autocomplete data={items} />);
    expect(container.querySelector('.w3f-autocomplete')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Autocomplete data={items} className="my-ac" />);
    expect(container.firstElementChild).toHaveClass('my-ac');
  });

  it('renders label when provided', () => {
    render(<Autocomplete data={items} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('sets placeholder', () => {
    render(<Autocomplete data={items} placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('shows suggestions on typing', async () => {
    const user = userEvent.setup();
    render(<Autocomplete data={items} />);
    await user.type(screen.getByRole('textbox'), 'App');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('fires onSelect when an option is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Autocomplete data={items} onSelect={onSelect} />);
    await user.type(screen.getByRole('textbox'), 'Ban');
    const option = await screen.findByRole('option');
    await user.click(option);
    expect(onSelect).toHaveBeenCalledWith('Banana');
  });

  // ── Error ─────────────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<Autocomplete data={items} error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to container div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Autocomplete data={items} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(Autocomplete.displayName).toBe('Autocomplete');
  });
});
