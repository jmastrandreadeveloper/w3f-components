import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '../Drawer';

describe('Drawer', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('has displayName set', () => {
        expect(Drawer.displayName).toBe('Drawer');
    });

    it('does not render when open is false (temporary variant)', () => {
        const { container } = render(<Drawer open={false} />);
        expect(container.querySelector('.w3f-drawer')).not.toBeInTheDocument();
    });

    it('renders when open is true (temporary variant)', async () => {
        const { container } = render(<Drawer open={true} />);
        await act(async () => {
            vi.advanceTimersByTime(100);
        });
        expect(container.querySelector('.w3f-drawer')).toBeInTheDocument();
    });

    it('renders permanent variant always visible', () => {
        const { container } = render(<Drawer variant="permanent" />);
        expect(container.querySelector('.w3f-drawer')).toBeInTheDocument();
        expect(container.querySelector('.w3f-drawer--permanent')).toBeInTheDocument();
    });

    it('renders persistent variant', () => {
        const { container } = render(<Drawer variant="persistent" open />);
        expect(container.querySelector('.w3f-drawer--persistent')).toBeInTheDocument();
    });

    it('applies anchor class', () => {
        const { container } = render(<Drawer variant="permanent" anchor="right" />);
        expect(container.querySelector('.w3f-drawer--right')).toBeInTheDocument();
    });

    it('applies color class', () => {
        const { container } = render(<Drawer variant="permanent" color="primary" />);
        expect(container.querySelector('.w3f-drawer--primary')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Drawer variant="permanent" className="my-drawer" />);
        expect(container.querySelector('.w3f-drawer.my-drawer')).toBeInTheDocument();
    });

    it('renders backdrop for temporary variant when open', async () => {
        const { container } = render(<Drawer open={true} />);
        await act(async () => {
            vi.advanceTimersByTime(100);
        });
        expect(container.querySelector('.w3f-drawer__backdrop')).toBeInTheDocument();
    });

    it('fires onClose with "backdropClick" when backdrop is clicked', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const onClose = vi.fn();
        const { container } = render(<Drawer open={true} onClose={onClose} />);
        await act(async () => {
            vi.advanceTimersByTime(100);
        });
        const backdrop = container.querySelector('.w3f-drawer__backdrop')!;
        await user.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose.mock.calls[0][1]).toBe('backdropClick');
    });

    it('renders close button when showCloseButton is true', async () => {
        const { container } = render(
            <Drawer open={true} variant="persistent" showCloseButton />,
        );
        expect(container.querySelector('.w3f-drawer__close')).toBeInTheDocument();
    });

    it('fires onClose with "closeButton" when close button is clicked', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const onClose = vi.fn();
        const { container } = render(
            <Drawer open={true} variant="persistent" showCloseButton onClose={onClose} />,
        );
        const closeBtn = container.querySelector('.w3f-drawer__close')!;
        await user.click(closeBtn);
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose.mock.calls[0][1]).toBe('closeButton');
    });

    it('renders children inside content div', () => {
        const { container } = render(
            <Drawer variant="permanent">
                <p>Drawer content</p>
            </Drawer>,
        );
        const content = container.querySelector('.w3f-drawer__content');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent('Drawer content');
    });

    it('forwards ref for permanent variant', () => {
        const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
        render(<Drawer variant="permanent" ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });
});
