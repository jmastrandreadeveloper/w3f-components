import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransferList from '../TransferList';

const sourceItems = [
  { id: 1, label: 'Item A' },
  { id: 2, label: 'Item B' },
  { id: 3, label: 'Item C' },
];

const targetItems = [
  { id: 4, label: 'Item D' },
];

describe('TransferList', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders without crashing', () => {
    const { container } = render(<TransferList />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('renders source and target panels', () => {
    const { container } = render(
      <TransferList sourceItems={sourceItems} targetItems={targetItems} />,
    );
    const panels = container.querySelectorAll('.w3f-transfer-panel');
    expect(panels).toHaveLength(2);
  });

  it('renders source items', () => {
    render(<TransferList sourceItems={sourceItems} />);
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies root class w3f-transfer', () => {
    const { container } = render(<TransferList />);
    expect(container.querySelector('.w3f-transfer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TransferList className="my-transfer" />);
    expect(container.firstElementChild).toHaveClass('my-transfer');
  });

  it('renders default panel titles', () => {
    render(<TransferList sourceItems={sourceItems} />);
    expect(screen.getByText('Disponibles')).toBeInTheDocument();
    expect(screen.getByText('Seleccionados')).toBeInTheDocument();
  });

  it('renders custom panel titles', () => {
    render(
      <TransferList
        sourceItems={sourceItems}
        sourceTitle="Available"
        targetTitle="Selected"
      />,
    );
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  it('renders search inputs when enableSearch is true', () => {
    render(<TransferList sourceItems={sourceItems} enableSearch />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar...');
    expect(searchInputs).toHaveLength(2);
  });

  // ── Disabled ────────────────────────────────────────────────
  it('applies disabled class w3f-transfer-disabled', () => {
    const { container } = render(<TransferList disabled />);
    expect(container.querySelector('.w3f-transfer-disabled')).toBeInTheDocument();
  });

  it('disables action buttons when disabled', () => {
    const { container } = render(
      <TransferList sourceItems={sourceItems} disabled />,
    );
    const buttons = container.querySelectorAll('.w3f-transfer-btn');
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  // ── Action buttons ────────────────────────────────────────
  it('renders 4 action buttons', () => {
    const { container } = render(<TransferList sourceItems={sourceItems} />);
    const buttons = container.querySelectorAll('.w3f-transfer-btn');
    expect(buttons).toHaveLength(4);
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TransferList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(TransferList.displayName).toBe('TransferList');
  });
});
