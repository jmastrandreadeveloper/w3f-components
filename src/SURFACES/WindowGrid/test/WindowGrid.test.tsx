import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WindowGrid } from '../WindowGrid';
import { createRef } from 'react';

// WindowGrid uses ResizeObserver which is not available in jsdom
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
});

describe('WindowGrid', () => {
    it('renders with base window class and grid class', () => {
        const { container } = render(
            <WindowGrid title="Grid Window"><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window-grid')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(WindowGrid.displayName).toBe('WindowGrid');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<WindowGrid ref={ref} title="Test"><p>Content</p></WindowGrid>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders title', () => {
        render(<WindowGrid title="Dashboard"><p>Content</p></WindowGrid>);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <WindowGrid title="Test">
                <div>Card 1</div>
                <div>Card 2</div>
            </WindowGrid>
        );
        expect(screen.getByText('Card 1')).toBeInTheDocument();
        expect(screen.getByText('Card 2')).toBeInTheDocument();
    });

    it('renders body with grid body class', () => {
        const { container } = render(
            <WindowGrid title="Test"><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window-grid-body')).toBeInTheDocument();
    });

    it('renders titlebar', () => {
        const { container } = render(
            <WindowGrid title="Test"><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window-titlebar')).toBeInTheDocument();
    });

    it('renders nothing when open=false', () => {
        const { container } = render(
            <WindowGrid title="Test" open={false}><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window')).not.toBeInTheDocument();
    });

    it('renders overlay when modal', () => {
        const { container } = render(
            <WindowGrid title="Test" modal><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window-overlay')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <WindowGrid title="Test" className="my-grid-win"><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window')).toHaveClass('my-grid-win');
    });

    it('renders control buttons', () => {
        const { container } = render(
            <WindowGrid title="Test"><p>Content</p></WindowGrid>
        );
        expect(container.querySelector('.w3f-window-control-btn--close')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window-control-btn--minimize')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window-control-btn--maximize')).toBeInTheDocument();
    });
});
