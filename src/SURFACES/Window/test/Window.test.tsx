import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Window } from '../Window';
import { createRef } from 'react';

describe('Window', () => {
    it('renders with base class', () => {
        const { container } = render(<Window title="Test Window"><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Window.displayName).toBe('Window');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<Window ref={ref} title="Test"><p>Content</p></Window>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders title', () => {
        render(<Window title="My Window"><p>Content</p></Window>);
        expect(screen.getByText('My Window')).toBeInTheDocument();
    });

    it('renders children in body', () => {
        render(<Window title="Test"><p>Body content</p></Window>);
        expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders titlebar with correct class', () => {
        const { container } = render(<Window title="Test"><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window-titlebar')).toBeInTheDocument();
    });

    it('renders body with correct class', () => {
        const { container } = render(<Window title="Test"><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window-body')).toBeInTheDocument();
    });

    it('renders control buttons by default', () => {
        const { container } = render(<Window title="Test"><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window-control-btn--close')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window-control-btn--minimize')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window-control-btn--maximize')).toBeInTheDocument();
    });

    it('hides close button when closable=false', () => {
        const { container } = render(<Window title="Test" closable={false}><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window-control-btn--close')).not.toBeInTheDocument();
    });

    it('hides minimize button when minimizable=false', () => {
        const { container } = render(<Window title="Test" minimizable={false}><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window-control-btn--minimize')).not.toBeInTheDocument();
    });

    it('renders nothing when open=false', () => {
        const { container } = render(<Window title="Test" open={false}><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        render(<Window title="Test" onClose={onClose}><p>Content</p></Window>);
        const closeBtn = screen.getByLabelText('Cerrar');
        await user.click(closeBtn);
        expect(onClose).toHaveBeenCalled();
    });

    it('renders overlay when modal=true', () => {
        const { container } = render(<Window title="Test" modal><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window-overlay')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window--modal')).toBeInTheDocument();
    });

    it('renders footer with buttons', () => {
        const { container } = render(
            <Window title="Test" footer={<div>Footer content</div>}>
                <p>Content</p>
            </Window>
        );
        expect(screen.getByText('Footer content')).toBeInTheDocument();
        expect(container.querySelector('.w3f-window-footer')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Window title="Test" className="my-win"><p>Content</p></Window>);
        expect(container.querySelector('.w3f-window')).toHaveClass('my-win');
    });

    it('renders resize handles when resizable', () => {
        const { container } = render(<Window title="Test" resizable><p>Content</p></Window>);
        const handles = container.querySelectorAll('[class*="w3f-window-resize-handle"]');
        expect(handles.length).toBe(8); // n, s, e, w, ne, nw, se, sw
    });
});
