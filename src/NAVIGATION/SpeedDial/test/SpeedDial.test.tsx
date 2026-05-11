import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpeedDial, SpeedDialAction } from '../SpeedDial';

describe('SpeedDial', () => {
    it('renders with base CSS class', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" />);
        expect(container.querySelector('.w3f-speed-dial')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(SpeedDial.displayName).toBe('SpeedDial');
    });

    it('forwards ref to the container div', () => {
        const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
        render(<SpeedDial ariaLabel="actions" ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders FAB button with aria-label', () => {
        render(<SpeedDial ariaLabel="Speed dial" />);
        expect(screen.getByLabelText('Speed dial')).toBeInTheDocument();
    });

    it('applies position class', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" position="top-left" />);
        expect(container.querySelector('.w3f-speed-dial--top-left')).toBeInTheDocument();
    });

    it('applies hidden class when hidden is true', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" hidden />);
        expect(container.querySelector('.w3f-speed-dial--hidden')).toBeInTheDocument();
    });

    it('applies open class when open', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" open />);
        expect(container.querySelector('.w3f-speed-dial--open')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" className="my-dial" />);
        expect(container.querySelector('.w3f-speed-dial.my-dial')).toBeInTheDocument();
    });

    it('applies color class to FAB', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" color="danger" />);
        expect(container.querySelector('.w3f-speed-dial__fab--danger')).toBeInTheDocument();
    });

    it('applies size class to FAB', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" size="sm" />);
        expect(container.querySelector('.w3f-speed-dial__fab--sm')).toBeInTheDocument();
    });

    it('toggles open state on FAB click', async () => {
        const user = userEvent.setup();
        const { container } = render(<SpeedDial ariaLabel="actions" />);
        const fab = screen.getByLabelText('actions');
        expect(fab).toHaveAttribute('aria-expanded', 'false');
        await user.click(fab);
        expect(fab).toHaveAttribute('aria-expanded', 'true');
        expect(container.querySelector('.w3f-speed-dial--open')).toBeInTheDocument();
    });

    it('renders backdrop when backdrop prop is true and open', () => {
        const { container } = render(<SpeedDial ariaLabel="actions" open backdrop />);
        expect(container.querySelector('.w3f-speed-dial__backdrop')).toBeInTheDocument();
    });

    it('renders actions as children', () => {
        const { container } = render(
            <SpeedDial ariaLabel="actions" open>
                <SpeedDialAction tooltipTitle="Copy" />
                <SpeedDialAction tooltipTitle="Save" />
            </SpeedDial>,
        );
        const actions = container.querySelectorAll('.w3f-speed-dial-action');
        expect(actions).toHaveLength(2);
    });
});

describe('SpeedDialAction', () => {
    it('has displayName set', () => {
        expect(SpeedDialAction.displayName).toBe('SpeedDialAction');
    });

    it('renders tooltip when tooltipTitle is provided', () => {
        const { container } = render(
            <SpeedDial ariaLabel="actions" open>
                <SpeedDialAction tooltipTitle="Copy" />
            </SpeedDial>,
        );
        expect(container.querySelector('.w3f-speed-dial-action__tooltip')).toHaveTextContent('Copy');
    });

    it('fires onClick when action is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <SpeedDial ariaLabel="actions" open>
                <SpeedDialAction tooltipTitle="Copy" onClick={onClick} />
            </SpeedDial>,
        );
        const actionBtn = screen.getByLabelText('Copy');
        await user.click(actionBtn);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
